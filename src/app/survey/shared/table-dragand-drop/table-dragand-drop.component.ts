import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {QuestionService} from "../../../_services/question.service";

@Component({
  selector: 'app-table-dragand-drop',
  templateUrl: './table-dragand-drop.component.html',
  styleUrls: ['./table-dragand-drop.component.css']
})
export class TableDragandDropComponent implements OnInit{
  cdkDropListConnectedTo: any
  showDetails: boolean = true;
  public orderForm: any = FormGroup
  @Input() studyInfo: any = [];

  @Output() toggleEdit = new EventEmitter<string>();
  title = 'Survey';
  todo:any = [];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  constructor(private qs: QuestionService, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.orderForm = this.fb.group({
      dropOrder: [''],
      studyId: [this.studyInfo.id]

   // read subscription and trigger menu refresh

    });

    this.qs.getQuestionRefresh().subscribe((data: any) => {
      this.todo = []
      this.getStudyQuestions(this.studyInfo.id)
    })

//this.getStudyQuestions(this.studyInfo.id)

    this.qs.getOptions().subscribe((data) => {

     // return this.todo.push(data)
    })

    this.qs.getAppendQuestion().subscribe((value) => {
     // console.log('Append Question')
      if (value !== '' && !this.todo.includes(value) && value.length > 5) {

        this.todo.push(value)
      }
    });

    this.qs.getQuestionToBeRemoved().subscribe((data) => {

      if (data.length >=1 ) {
        this.qs.setShowDashboard(true)
         this.removeIndexFromArray(data)
      }
    })
    //subscribe to questions and insert into array
  }

  getStudyQuestions(studyId:string){

    this.qs.getStudyQuestions(studyId).subscribe((data:any) =>{
      for (let value of data.data.values()) {
        this.todo.push(value);                 //37 35 40
      }
      // this.todo = {}
      this.todo.forEach((value:object) => {
      })
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

// merge array1 and array2
  //console.log({"studyId": this.studyInfo.id},{"dd": event.container.data});
   const detail = [["studyId",this.studyInfo.id,"dropOrder" , event.container.data]]
  //  console.log(detail)
   // console.log(event.container.data)

    // this.qs.saveQuestionOrder(''){
    //
    // }
  }

  toggle(item: string): void {

  //  console.log('Item to be emitted')
   // console.log(item)
    this.toggleEdit.emit(item);
  }
}
