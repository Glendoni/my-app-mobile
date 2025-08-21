import {Component, Input, OnInit} from '@angular/core';
import {QuestionService} from "../../_services/question.service";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  @Input() studyInfo: any = [];
  showEdit: boolean = false;
  addQuestion: boolean = false;
  showDetails: boolean = false;
  title: string = '';
  showDashboard: any;
  question: any;
  showAddQuestion: boolean = true
  showAddQuestionBtn: boolean = true

  public editText = 'Edit:'
  public addQuestionText = 'Add Element:'
  public study: object = []
  public showReport: boolean = false;

  constructor(private qs: QuestionService) {
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
        this.onAddQuestion()
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
    this.qs.setAddQuestionBtnVisibility($event)
  }
}
