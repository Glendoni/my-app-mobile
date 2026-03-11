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
  pageItems: number = 5
  public orderForm: any = FormGroup
  public pageItem: any = FormGroup
  @Input() createQuestion: boolean = false;
  @Input() studyInfo: any = [];
  @Output() toggleEdit = new EventEmitter<string>();

  title = 'Survey';
  todo: any = [];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  togglemove: boolean = true
  public paginationPages: any;
  private metaTotal: any;
  public datalength: number = 5;
  public listView: boolean = false;
  public spinner: boolean = false;
  public toggleDragAndDrop: boolean = false;
  constructor(private qs: QuestionService, private fb: FormBuilder) {
    this.p = 1
  }

  ngOnInit() {
    this.orderForm = this.fb.group({
      dropOrder: [''],
      studyId: [this.studyInfo.id],
    });

    if (localStorage.getItem("pageQuestionItems")) {
      var paginationPages = JSON.parse(localStorage.getItem("pageQuestionItems") ?? '')
      this.paginationPages = paginationPages
      this.pageItems = paginationPages
    }
    this.pageItem = this.fb.group({
      pageItems: this.paginationPages
    });
    if (!this.createQuestion) {
      this.qs.getQuestionRefresh().subscribe((data: any) => {
        if (localStorage.getItem('pgquest' + this.studyInfo.id) && localStorage.getItem('pgquestrtn' + this.studyInfo.id)) {
          var ppagenum = JSON.parse(localStorage.getItem('pgquest' + this.studyInfo.id) ?? '')
          this.p = ppagenum ?? 1
          localStorage.removeItem('pgquest' + this.studyInfo.id)
          localStorage.removeItem('pgquestrtn' + this.studyInfo.id)
        } else {
          this.p = 1
        }
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
    this.showList()
  }

  getStudyQuestions(studyId: string) {

    this.spinner = true;

    this.qs.getStudyQuestions(studyId).subscribe((data: any) => {
      this.spinner = false;

      //pageItems
      this.datalength = data.data.length
      this.metaTotal = data['meta']['total']
      this.paginationPages = Math.ceil(data['meta']['total'] / this.pageItems)

      if (this.createQuestion) {
        localStorage.setItem('pgquest' + this.studyInfo.id, String(this.paginationPages))
      }

      if (data.data.length <= 5) {
        this.pageItems = 45
      }
      this.qs.setBoxAutoFillOptions(data.select_dropdown)
      this.qs.setStudyCategories(data.chart_select_dropdown)
      this.qs.setChartFillOptions(data.chart_select_dropdown)

      this.qs.setShowHideResultsTab(data.data.length ? true : false)

      if (data.data.length) {
        this.createQuestion = false
      } else {
        localStorage.removeItem('pgquest' + this.studyInfo.id)
        localStorage.removeItem('pgquestrtn' + this.studyInfo.id)
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

  get pi() {
    return this.pageItem.controls;
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
     this.toggleDragAndDrop = !this.toggleDragAndDrop??false;
    this.togglemove = $event
  }
  onToggleMovex(e:any) {
    this.toggleDragAndDrop = e?false:true;
     this.togglemove = e?true:false
  }

  /**
   * toggle question drag + drop movement
   * @param $event
   */
  onToggleClickMove($event = false) {
    this.pi.pageItems.setValue(100)
    this.pageItems = 100
    this.p = 1
    this.togglemove = $event
    this.itemNumber()
  }

  showList() {
    if (this.pageItem.value.pageItems == 200) {
      this.toggleDragAndDrop = this.toggleDragAndDrop
      this.togglemove = true
      this.listView = true;
    } else {
      this.toggleDragAndDrop = false;
        this.listView = false;
    }
  }
  itemNumber() {
    this.showList()
    localStorage.setItem("pageQuestionItems", this.pageItem.value.pageItems);
    this.paginationPages = Math.ceil(this.metaTotal / this.pageItem.value.pageItems)
    this.p = this.paginationPages
    this.pageItems = this.pageItem.value.pageItems ?? 10
  }
}
