import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {FiledTypeMenu} from '../../options/fieldTypeMenu';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {QuestionService} from "../../_services/question.service";

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {
  @Input() question: any;
  @Input() idx: number=1;
  @Input() studyInfo: any = [];
  @Output() addQuestion = new EventEmitter<any>();
  @Output() triggerMenuRefresh = new EventEmitter<any>();
  @Output() toggleDragMove = new EventEmitter<any>();

  filedTypeMenus;
  selectedFieldType: any
  submissionBtn = false
  //optionData: any = []
  submitted = false;
  public orderForm: any = FormGroup
  @Output() toggleEdit = new EventEmitter<string>();

  constructor(private fb: FormBuilder, private qs: QuestionService) {
    this.filedTypeMenus = FiledTypeMenu; // holds an array of field types
    this.btnSubmitVisibility()
  }

  private btnSubmitVisibility() {
    return this.qs.getOptionBtnSubmitVisibility().subscribe((value) => {
      this.submissionBtn = value;
    });
  }

  ngOnInit() {


    // console.log(this.question)
    // console.log(this.question.options)
    // console.log('Study Info')
    // console.log(this.studyInfo)
  //  this.qs.setOptions(['One', 'Two', 'Three']); // set select options from server
  //  this.selectedFieldType = 'select'  // set select options from server

    this.orderForm = this.fb.group({
      question: ['', [Validators.required, Validators.minLength(6)]],
      originalQuestion: [''],
      type: [''],
      questionId: [''],
      options: [''],
      optionEditor: [''],
      required: [''],
      pagebreak: [''],
      study_id: [this.studyInfo.id],
      otherOption: [false],
      chartType: ["1"],
    });

    this.qs.getBoxOptions().subscribe((data) => {
      // console.log('Glen')
      // console.log(data)
      this.f.otherOption.setValue(data)
    })


    this.qs.getChartType().subscribe((data) => {
      // console.log('Glen')
     // console.log(data)
      this.f.chartType.setValue(data)
    })

    this.qs.getOptions().subscribe((selectOptions) => {
      // console.log('get options')
      // console.log(selectOptions)
     this.f.options.setValue(selectOptions)
//this.onUpdate()

      // console.log('get options length')
      // console.log(selectOptions.length)
      if(selectOptions){
      if(selectOptions.length >=1){
        this.qs.setOptionBtnSubmitVisibility(true)
      }
      }
    })
//    this.qs.getQuestion().subscribe((question) => {

    const question = this.question
      // console.log(' map Question')
      // console.log(question)



   //    interface IKeys { id: string; }
   //
   // const quest =  question.map(function (val:any) {
   //   console.log(val)
   // })


//console.log(quest)

// console.log('checkbox status')
// console.log(question.pagebreak)
//
//       console.log(' subscribe getQuestion')
//       console.log(question)
     // this.f.type.setValue(question.fieldType)
      this.f.question.setValue(question.label)
      this.f.questionId.setValue(question.id)
      this.f.originalQuestion.setValue(question.label)
      this.f.options.setValue(question.options)
      this.f.required.setValue(question.required)
      this.f.type.setValue(question.type)
      this.f.otherOption.setValue(question.otherField)
   // this.qs.setOptions(question.type)
this.selectedFieldType = question.type
     this.f.pagebreak.setValue(question.pagebreak)
      // console.log(' Question Options')
      // console.log(question.options)
   this.qs.setOptions(question.options)


   //   this.qs.setOptions(['One', 'Two', 'Three']);
   // })
  }


  get f() {
    return this.orderForm.controls;
  }

  onSelect(value: any) {
    // console.log(value)
    this.f.type.setValue(value)
    //this.selectedFieldType = value
  }

  onUpdate(): void {

    this.submitted = true
    this.qs.buttonVisibility = false;
   // console.log(this.orderForm.value)
    this.qs.update(this.orderForm.value,this.orderForm.value.questionId ).subscribe((data) =>{

      this.submitted = true
      //this.qs.addQuestionArr(this.orderForm.value.question)
      this.qs.buttonVisibility = false;
      //this.qs.setAppendQuestion(this.orderForm.value.question)
      this.triggerMenuRefresh.emit(this.studyInfo.id);
      // console.log('Order form send to server')
      // console.log(this.orderForm.value) //send to service
      this.toggleDragMove.emit(true);
    })

  }

  dismiss() {
    this.toggleEdit.emit();
  }

  onUpdateTest(value: any):void
  {
    this.f.options.patchValue(value)
    // console.log(value)
    this.onUpdate();
  }
  onUpdateEditor(value: any):void
  {
    this.f.optionEditor.patchValue(value)
    this.onUpdate();
  }

  onToggleMoveCh() {
    this.toggleDragMove.emit(false);
  }

  onToggleStopCh() {
    this.toggleDragMove.emit(true);
  }
}
