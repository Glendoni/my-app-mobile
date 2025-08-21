import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {FormBuilder, FormGroup} from "@angular/forms";
import {QuestionService} from "../../../_services/question.service";

@Component({
  selector: 'app-questions-drag-and-drop',
  templateUrl: './questions-drag-and-drop.component.html',
  styleUrls: ['./questions-drag-and-drop.component.css']
})
export class QuestionsDragAndDropComponent implements OnInit {

  cdkDropListConnectedTo: any
  showDetails: boolean = true;
  p: number = 1
  pageItems: number = 10
  public orderForm: any = FormGroup
  @Input() createQuestion: boolean = false;
  @Input() studyInfo: any = [];
  @Output() toggleEdit = new EventEmitter<string>();

  title = 'Survey';
  todo: any = [];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  togglemove: boolean = true
  public paginationPages: any;


  constructor(private qs: QuestionService, private fb: FormBuilder) {
this.p=1
  }

  ngOnInit() {
    this.orderForm = this.fb.group({
      dropOrder: [''],
      studyId: [this.studyInfo.id]
    });
    if (!this.createQuestion) {
      this.qs.getQuestionRefresh().subscribe((data: any) => {
        this.p = 1
        this.todo = []
        this.getStudyQuestions(this.studyInfo.id)
      })
    }
    this.qs.getAppendQuestion().subscribe((value) => {
      if (value !== '' && !this.todo.includes(value) && value.length > 5) {
        this.todo.push(value)
      }
    });

    this.qs.getQuestionToBeRemoved().subscribe((data) => {
      if (data.length >= 1) {
        this.qs.setShowDashboard(true)
        this.removeIndexFromArray(data)
      }
    })
  }

  getStudyQuestions(studyId: string) {
    this.qs.getStudyQuestions(studyId).subscribe((data: any) => {
      //pageItems
      this.paginationPages  =Math.ceil(this.p/data['meta']['total'])
      this.qs.setBoxAutoFillOptions(data.select_dropdown)
      this.qs.setStudyCategories(data.chart_select_dropdown)
      this.qs.setChartFillOptions(data.chart_select_dropdown)

     this.qs.setShowHideResultsTab(data.data.length?true:false)
      if (data.data.length) {
        this.createQuestion = false
      } else {
        this.createQuestion = true
      }
      for (let value of data.data.values()) {
        this.todo.push(value);                 //37 35 40
      }
    })
  }

  get f() {
    return this.orderForm.controls;
  }

  removeIndexFromArray(msg: string) {
    const index: number = this.todo.indexOf(msg);
    if (index !== -1) {
      this.todo.splice(index, 1);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      // Reorder items within the same list
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Move items between lists
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.f.dropOrder.setValue(event.container.data)
    this.qs.dropOrder(this.orderForm.value).subscribe((data: any) => {
    })
  }

  onToggle(item: string): void {
    this.toggleEdit.emit(item);
  }

  /**
   * toggle question drag + drop movement
   * @param $event
   */
  onToggleMove($event = false) {
    this.togglemove = $event
  }
}
