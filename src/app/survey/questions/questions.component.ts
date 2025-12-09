import {Component, Input, OnInit, AfterViewInit, ViewChild, ViewContainerRef, OnDestroy} from '@angular/core';
import {QuestionService} from "../../_services/question.service";
import {ReportsComponent} from "../reports/reports.component";
import {QResultQuotaComponent} from "./partials/results/q-result-quota/q-result-quota.component";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit , AfterViewInit, OnDestroy{
  @Input() studyInfo: any = [];
  @ViewChild('dynamicContainer', { read: ViewContainerRef })container!: ViewContainerRef;
  @ViewChild('dynamicQuotaContainer', { read: ViewContainerRef })containerQuota!: ViewContainerRef;
  showEdit: boolean = false;
  addQuestion: boolean = false;
  showDetails: boolean = false;
  title: string = '';
  showDashboard: any;
  question: any;
  showAddQuestion: boolean = true
  showAddQuestionBtn: boolean = true
  originalDynamicPageNumber:any

  public editText = 'Edit:'
  public addQuestionText = 'Add Element:'
  public study: object = []
  public showReport: boolean = false;

  constructor(private qs: QuestionService) {
console.log('I am loaded')
    qs.setAddQuestion(false)
    this.addQuestion = false
    this.showAddQuestionBtn = true
    this.showEdit = false
    this.title = ''
  }

  ngOnInit() {

    this.study = this.studyInfo.study;

    this.qs.getShowDashboard().subscribe((value) => {

      if (this.studyInfo.study_categories.length) {
        if (value) {
          this.addQuestion = false
          this.showAddQuestionBtn = true
          this.showEdit = false
          this.title = ''
        }
      } else {
        // get autofil
       // this.onAddQuestion()
      }
    })

    this.qs.getAddQuestion().subscribe((data) => {
      if (data) {
        this.onAddQuestion()
      }
    })
  }

  onToggle(item: any): any {
    this.addQuestion = false
    this.showAddQuestionBtn = true
    this.showEdit = true
    this.title = item.name
    this.question = item.name
    this.showAddQuestion = false
    this.qs.setQuestion(item)
  }

  onAddQuestion() {
    this.title = ''
    this.showEdit = false
    this.addQuestion = true
    this.showAddQuestion = false
    this.showAddQuestionBtn = false
  }

  addQuestionToArr($event: any) {
  }

  showButtonVisibility($event: boolean): void {
    this.qs.buttonVisibility.subscribe((buttonVisibility: any) => {
    })
  }

  deleteQuestion(param: any) {
    this.qs.setQuestionToBeRemoved(param.title)
  }

  closeEdit() {
    this.showEdit = false
    this.addQuestion = false
    this.showAddQuestion = true
  }

  refreshMenu($event: string) {
  }

  getReports($event: boolean): void {
    this.showReport = $event
    // this.containerQuota.remove();
    // this.containerQuota.remove();
    this.loadComponent(null)
    this.loadQuotaComponent()
  //  this.qs.setAddQuestionBtnVisibility($event)

  }
  loadComponent(history:any) {

    this.container.clear(); // optional: clears previous components
    const componentRef =  this.container.createComponent(ReportsComponent);
    componentRef.instance.studyInfo = this.studyInfo;
    componentRef.instance.filterId = history;
    componentRef.instance.newPageNumber = this.originalDynamicPageNumber??1;
    componentRef.instance.pageNumber.subscribe((dynamicPageNumber:any) => {
    this.originalDynamicPageNumber = dynamicPageNumber
    });
    componentRef.instance.pageNumber.subscribe((dynamicPageNumber:any) => {
    this.originalDynamicPageNumber = dynamicPageNumber
    });

    componentRef.instance.filterCatReportFilter.subscribe(() => {
      this.loadQuotaComponent()
    });

  }
  loadQuotaComponent() {
    this.containerQuota.clear(); // optional: clears previous components
    const componentRef =  this.containerQuota.createComponent(QResultQuotaComponent);
    componentRef.instance.studyInfo = this.studyInfo;
    componentRef.instance.filterHistoryId.subscribe((historyIdValue) => {
      this.loadComponent(historyIdValue)
    });

    componentRef.instance.titleHistoryReq.subscribe((value) => {
     console.log(value)
     // this.loadComponent(historyIdValue)
    });
  }

  ngAfterViewInit() {
  //  this.loadQuotaComponent()
  }
  ngOnDestroy() {
    this.containerQuota.remove();
    this.container.remove();
  }
}
