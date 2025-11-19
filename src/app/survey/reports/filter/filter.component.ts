import {Component, EventEmitter, Input, OnInit, AfterContentInit, Output, AfterViewInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ReportsService} from "../../../_services/reports.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, AfterContentInit, AfterViewInit {

  @Output() filterCat = new EventEmitter<string>();
  @Output() storeFilterSelection = new EventEmitter<string>();
  @Output() filterData = new EventEmitter<string>();
  @Output() showComments = new EventEmitter<boolean>();
  @Input() studyInfo: any
  @Input() filterInfo: any
  @Input() filterId: any
  // @HostBinding('hostProperty') chk: string = '';
  hostProperty: boolean = true
  formFilter: any = FormGroup;
  formModalFilter: any = FormGroup;
  items: any = [];
  missingSelectionNotice: boolean = false
  showHideComments: boolean = false
  filterByDate: boolean = false;
  public showDateRangeBool: boolean = false;
  public disableFilterByDate: boolean = false;
  static callFilterCounter = 0;

  public noQuestionsMsg: boolean = false;
  public result: any = []
  public resultOriginal: any = []
  public categories: any = []
  public storeFilterSelectionArr: any = []
  public categoryList: any = []
  public resultList: any = []
  // public filterInfo: any = []
  public resultCnt: number = 0
  chartShow: boolean = false
  barChart: boolean = false
  showEdit: boolean = false;
  categoryFilter: any
  filterChartToggleIcon: boolean = false
  public filteredDates: object = []
  public setShowHistoryModal: boolean =false;

  constructor(private fb: FormBuilder, private rs: ReportsService) {
  }

  ngOnInit() {
    if (this.studyInfo.study.type_of_survey != 2) {
      this.disableFilterByDate = true
    }

    this.showDateRangeBool = true
    this.rs.getCategoryList().subscribe((data) => {
      this.items = data
    })

    this.formModalFilter = this.fb.group({
      titleHistory: ['hit man'],
    })

      this.formFilter = this.fb.group({
        checkboxes: new FormArray(this.items.map((item: any) => new FormControl(item.checked)
        )),
        startDateRange: [this.filterInfo['startDateRange']],
        endDateRange: [this.filterInfo['endDateRange']],
        showDateRange: [this.showDateRangeBool],
        storeHistory: [false],
        resetHistory: [false],

        dateToFilterId: [this.filterId],
      })

    this.rs.getShowComment().subscribe((data) => {
      this.showHideComments = data
    })
  }

  getFilterHistory(data: any) {
  }

  onDateRangeReset() {
    this.f['startDateRange'].patchValue(this.studyInfo['settings']['start_date']);
    this.f['endDateRange'].patchValue(this.studyInfo['settings']['end_date']);
    this.f['dateToFilterId'].patchValue(null);
    this.f['resetHistory'].patchValue(true);
  }

  ngAfterContentInit() {
    this.rs.getStoreFilterSelection().subscribe((data) => {
      this.f['checkboxes'].patchValue(data)
      this.showDateRangeBool = this.filterInfo['showDateRange']
      this.f['showDateRange'].patchValue(this.filterInfo['showDateRange']);
    })
  }

  get f() {
    return this.formFilter.controls;
  }

  submit() {
    this.rs.setFilterHistory([])
    this.filteredDates = this.formFilter.value
    const selectedItems = this.formFilter.value.checkboxes
      .map((checked: any, index: number) => (checked ? this.items[index] : false))
      .filter((value: any) => value !== false);

    if (!selectedItems.length) {
      this.missingSelectionNotice = true
      return
    }

    this.rs.setStoreFilterSelectionArrSelection(this.formFilter.value.checkboxes);
    this.rs.setStoreFilterSelection(this.formFilter.value.checkboxes);
    this.categoryFilter = selectedItems

    this.filterResults()
  }

  onShowHideComments() {
    this.showHideComments = this.showHideComments ? false : true
    this.rs.setShowComment(this.showHideComments)
  }

  showDateRange() {
    this.showDateRangeBool = this.showDateRangeBool ? false : true
    this.f['showDateRange'].setValue(this.showDateRangeBool);
    if(!this.showDateRangeBool){
      this.f['dateToFilterId'].patchValue(null);
    }
  }

  filterResults() {
    this.noQuestionsMsg = false;
    this.rs.getQuestionReportFilter(this.studyInfo.settings.study_id, this.categoryFilter, this.filteredDates).subscribe((data: any) => {
      this.filterData.emit(data)
    })
  }

  onReturnToChart() {
    this.filterCat.emit();
  }

  onStoreHistory(){
     this.formFilter.value.storeHistory?this.f['storeHistory'].patchValue(false):this.f['storeHistory'].patchValue(true)
  }

  ngAfterViewInit() {
    if (this.filterId) {
      this.filterId = null
    }
  }
}
