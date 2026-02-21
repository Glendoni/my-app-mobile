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
  @Output() filterHistoryId = new EventEmitter<boolean>(); //event emitter
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

  show: boolean=false;
  public submitted: boolean= false;
  showDelete: boolean= true;

  constructor(private fb: FormBuilder, private qs: QuestionService, private rs: ReportsService) {

    this.rs.getQuestionComments().subscribe((data) =>{
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

  showQuestion(i: number,event: Event) {
    this.highlight(event)
    this.qs.setChartReportPagination(i + 1)
  }

  toggleLeftCardHistory() {
    this.getDateHistory()
    if (this.studyInfo['study']['type_of_survey'] == 2) {
      this.showHistoryIcon = true
    }
    this.showHide=0
    this.showHide = 2
  }

  toggleLeftCardQuestion() {
    this.showHide=0
    this.showHide = 1
  }

  toggleLeftCardComments() {
    this.showHide=0
    this.showHide = 3
  }






  getDateHistory() {
    if (!this.historyIsChecked) {
      this.rs.getQuestionReportDateHistory(this.studyInfo['study']['id']).subscribe((data) => {
        this.historyList = data
      })
      this.historyIsChecked = true
    }
  }

  filterHistoryByDatePreset(history: any, event: Event) {
    this.highlight(event)
    this.filterHistoryId.emit(history.id)
  }

  removeDate(h: any) {
    this.rs.removeChartHistory(h['id']).subscribe((data) => {
      this.historyIsChecked = false
      this.getDateHistory()
    })
  }

  ngOnDestroy() {
  }

  historyModalData(h: any) {
    console.log(h.history.titleHistory)
    this.m.titleDateHistoryTitle.patchValue(h.history.titleHistory)
    this.modalData = h
  }

  submit(modalData: any) {


    this.m.study_id.patchValue(this.studyInfo['study']['id'])
    this.rs.setChartHistoryName(modalData['id'], this.formModalFilter.value).subscribe((data) => {
      this.historyIsChecked = false
      this.getDateHistory()
      this.submitSuccess()
    })
  }

  removeAllHighlights() {
    const elements = document.querySelectorAll('.highlighter');
    elements.forEach(el => el.className = ''); // wipes all classes
  }
  highlight(event: Event) {
    this.removeAllHighlights();

    const element = event.target as HTMLElement;
    element.classList.toggle('highlighter',false);
    element.classList.toggle('highlighter');
  }

  private submitSuccess() {
    this.submitted = true;
    setTimeout(() => {
      this.submitted = false;
    }, 4000);
  }

  removeDateAlert() {
    this.showDelete = false
  }
}



