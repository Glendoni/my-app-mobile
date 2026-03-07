import {Component, EventEmitter, HostListener, Input, OnDestroy, Output} from '@angular/core';
import {QuestionService} from "../../../../../_services/question.service";
import {ReportsService} from "../../../../../_services/reports.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-q-result-quota',
  templateUrl: './q-result-quota.component.html',
  styleUrls: ['./q-result-quota.component.css']
})
export class QResultQuotaComponent implements OnDestroy {
  @Input() studyInfo: any = [];
  @Output() filterHistoryId = new EventEmitter<string>(); //event emitter
  @Output() titleHistoryReq = new EventEmitter<string>(); //event emitter
  formModalFilter: any = FormGroup;
  questions: any = []
  showFilter: boolean = false;
  showHide: number = 1;
  studyType: number = 1;
  static callCounter: number = 0
  public historyList: any = [];
  public showHistoryIcon: boolean = false;
  private historyIsChecked: Boolean = false;
  public modalData: any = [];
  public questionComments: any = [];

  show: boolean = false;
  public submitted: boolean = false;
  showDelete: boolean = true;

  constructor(private fb: FormBuilder, private qs: QuestionService, private rs: ReportsService) {

    this.rs.getQuestionComments().subscribe((data) => {
      this.questionComments = data
    })

    this.qs.getQuestion().subscribe((data) => {
      const fin: any = []
      if (!data.length) {

        const newArray = data.data.map((element: any, index: any, array: any) => {
          if (array[index]['type'] != 'textarea') {
            fin.push(array[index])
          }
        });
        this.showHistoryIcon = false
        this.questions = fin
      }
      this.rs.getStoreFilterSelectionArrSelection().subscribe((data) => {
        this.showFilter = true
      })
      this.qs.setQuestion(false)
    })

    this.rs.getToggleHistoryCard().subscribe((data) => {
      if (!data) {
        this.toggleLeftCardHistory()
      } else {
        this.toggleLeftCardQuestion()
      }
    })

    this.formModalFilter = this.fb.group({
      study_id: [''],
      titleDateHistoryTitle: ['', Validators.required]
    })
  }

  get m() {
    return this.formModalFilter.controls;
  }

  showQuestion(i: number, event: Event):void {
    this.highlight(event)
    this.qs.setChartReportPagination(i + 1)
  }

  toggleLeftCardHistory():void {
    this.getDateHistory()
    if (this.studyInfo['study']['type_of_survey'] == 2) {
      this.showHistoryIcon = true
    }
    this.showHide = 0
    this.showHide = 2
  }

  toggleLeftCardQuestion():void {
    this.showHide = 0
    this.showHide = 1
  }

  toggleLeftCardComments():void {
    this.showHide = 0
    this.showHide = 3
  }


  getDateHistory():void {
    if (!this.historyIsChecked) {
      this.rs.getQuestionReportDateHistory(this.studyInfo['study']['id']).subscribe((data) => {
        this.historyList = data
      })
      this.historyIsChecked = true
    }
  }

  filterHistoryByDatePreset(history: any, event: Event):void {
    this.highlight(event)
    this.filterHistoryId.emit(history.id)
  }

  removeDate(h: any):void {
    this.rs.removeChartHistory(h['id']).subscribe((data) => {
      this.historyIsChecked = false
      this.getDateHistory()
    })
  }

  ngOnDestroy() {
  }

  historyModalData(h: any):void {
    console.log(h.history.titleHistory)
    this.m.titleDateHistoryTitle.patchValue(h.history.titleHistory)
    this.modalData = h
  }

  submit(modalData: any):void {
    this.m.study_id.patchValue(this.studyInfo['study']['id'])
    this.rs.setChartHistoryName(modalData['id'], this.formModalFilter.value).subscribe((data) => {
      this.historyIsChecked = false
      this.getDateHistory()
      this.submitSuccess()
    })
  }

  removeAllHighlights():void {
    const elements = document.querySelectorAll('.highlighter');
    elements.forEach(el => el.className = ''); // wipes all classes
  }

  highlight(event: Event):void {
    this.removeAllHighlights();

    const element = event.target as HTMLElement;
    element.classList.toggle('highlighter', false);
    element.classList.toggle('highlighter');
  }

  private submitSuccess():void {
    this.submitted = true;
    setTimeout(() => {
      this.submitted = false;
    }, 4000);
  }

  removeDateAlert():void {
    this.showDelete = false
  }

  onResetChartDates():void {
    this.removeAllHighlights()
    this.filterHistoryId.emit('a07968d9-3c16-48af-a5b7-9cdffe80acp4')
  }
}
