import {Component, EventEmitter, Input, OnInit, AfterContentInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ReportsService} from "../../../_services/reports.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, AfterContentInit {

  @Output() filtercat = new EventEmitter<string>();
  @Output() storeFilterSelection = new EventEmitter<string>();
  @Output() showComments = new EventEmitter<boolean>();
  @Input() studyInfo:any
  @Input() filterInfo:any
 // @HostBinding('hostProperty') chk: string = '';
  hostProperty:boolean = true
  formFilter:any = FormGroup;
  items: any = [];
  missingSelectionNotice: boolean = false
  showHideComments:boolean= false
  filterByDate:boolean= false;
  public showDateRangeBool: boolean = false;
  constructor(private fb: FormBuilder, private rs: ReportsService) {

    // this.form = this.fb.group({
    //   checkboxes: new FormArray(this.items.map(() => new FormControl(true))),
    //   startDateRange:[],
    //   endDateRange:[],
    //   showDateRange:[this.showDateRangeBool]
    // });
  }

  ngOnInit() {
  //  this.f['showDateRange'].patchValue(this.filterInfo['endDateRange']) ;
   // this.rs.setShowComment(true)
this.showDateRangeBool = true

    this.rs.getCategoryList().subscribe((data) => {
      this.items = data
    })

    this.formFilter = this.fb.group({
      checkboxes: new FormArray(this.items.map((item: any) => new FormControl(item.checked)
      )),
      startDateRange:[this.filterInfo['startDateRange']],
      endDateRange:[this.filterInfo['endDateRange']],
      showDateRange:[this.showDateRangeBool]
    });
  //  this.showDateRangeBool =this.filterInfo['startDateRange']?true:false ;
    //this.f['showDateRange'].patchValue(this.showDateRangeBool) ;
    this.rs.getShowComment().subscribe((data) =>{

      this.showHideComments = data
    })
  }

  onDateRangeReset(){
 // this.showDateRangeBool = false

    this.f['startDateRange'].patchValue(this.studyInfo['settings']['start_date']) ;
    this.f['endDateRange'].patchValue(this.studyInfo['settings']['end_date']) ;
  }

  ngAfterContentInit() {
    this.rs.getStoreFilterSelection().subscribe((data) => {
      this.f['checkboxes'].patchValue(data)
      this.showDateRangeBool = this.filterInfo['showDateRange']
      this.f['showDateRange'].patchValue(this.filterInfo['showDateRange']) ;

    })
  }

  get f() {
    return this.formFilter.controls;
  }

  submit() {
    this.rs.setFilterDates(this.formFilter.value);
    const selectedItems = this.formFilter.value.checkboxes
      .map((checked: any, index: number) => (checked ? this.items[index] : false))
      .filter((value: any) => value !== false);

    if (!selectedItems.length) {
      this.missingSelectionNotice = true
      return
    }

    this.rs.setStoreFilterSelectionArrSelection(this.formFilter.value.checkboxes);
    this.rs.setStoreFilterSelection(this.formFilter.value.checkboxes);
    // this.storeFilterSelection.emit(this.formFilter.value.checkboxes);
    this.rs.setFiltercat(selectedItems);

    this.filtercat.emit();

  }
  onShowHideComments(){
    this.showHideComments = this.showHideComments?false:true
    this.rs.setShowComment(this.showHideComments)
   // this.showComments.emit(this.showHideComments);
  }

  showDateRange() {
    this.showDateRangeBool = this.showDateRangeBool?false:true
  this.f['showDateRange'].setValue(this.showDateRangeBool) ;
    // if(!this.showDateRangeBool){
    //   this.OnDateRangeReset()
    // }

  // console.log(this.form.value)

  }

  onReturnToChart(){
    this.filtercat.emit();
  }
}
