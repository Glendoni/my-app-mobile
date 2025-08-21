import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {FiledTypeMenu} from '../../options/fieldTypeMenu';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {QuestionService} from "../../_services/question.service";

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  @Input() question: any;
  @Input() idx: number=1;
  @Input() studyInfo: any = [];
  @Output() addQuestion = new EventEmitter<any>();
  @Output() triggerMenuRefresh = new EventEmitter<any>();

  filedTypeMenus;
  selectedFieldType: any
  submissionBtn = false
  //optionData: any = []
  submitted = false;
  public orderForm: any = FormGroup
  @Output() toggleList = new EventEmitter<string>();

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


    // console.log('Questions')
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
      questionJson: ['', []],
      minNumber: [''],
      maxNumber: [''],
      required: [''],
      pagebreak: [''],
      study_id: [this.studyInfo.id],
      otherOption: [''],
      chartType: ['1'],
    });

    this.qs.getOptions().subscribe((selectOptions) => {
      // console.log('get options')
     // console.log(selectOptions)
      this.f.options.setValue(selectOptions)
//this.onUpdate()

      // console.log('get options length')
      // console.log(selectOptions.length)
      if(selectOptions.length >=1){
        this.qs.setOptionBtnSubmitVisibility(true)
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
    // this.f.question.setValue('')
    // this.f.questionId.setValue('')
    // this.f.originalQuestion.setValue('')
    // this.f.options.setValue('')
     this.f.required.setValue(true)
    // this.f.type.setValue('')
    // this.qs.setOptions(question.type)
    //this.selectedFieldType = question.type
    this.f.pagebreak.setValue(false)
    // console.log(' Question Options')
    // console.log(question.options)
    this.qs.setOptions([])


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

    this.qs.getBoxOptions().subscribe((data) => {
     // console.log('Glen')
     // console.log(data)
      this.f.otherOption.setValue(data)
    })

    this.submitted = true
    this.qs.buttonVisibility = false;
    const typ = this.orderForm.value.type.split(":")
    // console.log(typ[1])
     //console.log(this.orderForm.value)
    this.qs.create(this.orderForm.value,typ[1]).subscribe((data) =>{
      this.submitted = true
      this.qs.buttonVisibility = false;
      this.qs.setAddQuestion(false)
      this.qs.setAddQuestionBtnVisibility(false)
     this.triggerMenuRefresh.emit(this.studyInfo.id);
      this.toggleList.emit();
    })

  }

  dismiss() {
    this.toggleList.emit();
  }
  onDismiss() {
    this.qs.setAddQuestion(false)
    this.qs.setAddQuestionBtnVisibility(false)


    this.toggleList.emit();
  }

  onUpdateTest(value: any):void
  {
   // console.log(value)
     if(value.fieldType){
       this.f.questionJson.patchValue(value)
     }else{
       this.f.options.patchValue(value)
     }
   this.onUpdate();
  }

  onUpdateEditor(value: any):void
  {
    this.f.optionEditor.patchValue(value)
    // console.log(value)
    this.onUpdate();
  }
}
