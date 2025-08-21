import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FiledTypeMenu} from "../../../options/fieldTypeMenu";
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {QuestionService} from "../../../_services/question.service";
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-editor-field',
  templateUrl: './editor-field.component.html',
  styleUrls: ['./editor-field.component.css']
})
export class EditorFieldComponent {
  cdkDropListConnectedTo: any
  showDetails: boolean = false;
  field = FiledTypeMenu
  @Input() action: boolean =false;
  @Input() studyInfo: any;
  @Input() optionListItems: any;
  @Output() toggleEdit = new EventEmitter<object>();
  @Output() dismiss = new EventEmitter<string>();

  name = 'Angular ';
  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

//Validators.required, Validators.maxLength(100000),

  title = 'Survey';
  optionList: any = ['one'];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  lister: any
  items!: FormArray<any>
  orderForm = this.fb.group({
    name: [''],
    editor: ['',[Validators.required, Validators.minLength(5),Validators.maxLength(100000)]]
  });
  private opt: any;

  constructor(private fb: FormBuilder, private qs: QuestionService) {
  }

  ngOnInit() {
    console.log(this.f.editor)
    if(this.action) {
      // console.log(this.studyInfo)
      // console.log(this.optionListItems['options']['editor'])
      this.f.editor.patchValue(this.optionListItems['options']['editor'] )
      // this.f.maxNumber.patchValue(this.optionListItems.options.maxNumber )
    }
//console.log(this.optionListItems.options.minNumber??null)
    this.optionList = this.optionListItems.options

    this.showDetails = true;
    // this.showsubmitButton()
    // this.qs.getOptions().subscribe((data) => {
    // })
  }

  get f() {
    return this.orderForm.controls;
  }
//   drop(event: CdkDragDrop<string[]>) {
//     if (event.previousContainer === event.container) {
//       // Reorder items within the same list
//       moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
//     } else {
//       // Move items between lists
//       transferArrayItem(
//         event.previousContainer.data,
//         event.container.data,
//         event.previousIndex,
//         event.currentIndex
//       );
//     }
//     // this.qs.setOptions(this.optionList);
// //     console.log(event.container.data)
//     let i = 1;
//     const lister = this.optionList.map(function (item: any) {
//       item.sort = i++
//       return item
//     })
//
//     this.lister = lister
//   }

  // toggle(item: string): void {
  //   // this.toggleEdit.emit(item);
  // }

  // addToArr(): any {
  //
  //   this.qs.setOptionBtnSubmitVisibility(true);
  //   var name = this.orderForm.value.name;
  //
  //   var matchFound = false
  //   for (let value of this.optionList.values()) {
  //     if (value.label.toLowerCase() === name?.toLowerCase()) {
  //       matchFound = true
  //       break;
  //     }                 //37 35 40
  //   }
  //
  //   if (name != null && !this.optionList.includes(name) && name.length >= 1 && !matchFound) {
  //     this.optionList.push({"label": name});
  //     //  this.qs.setOptions(this.optionList);
  //     this.showDetails = true;
  //     this.showsubmitButton()
  //   }
  //   console.log(this.orderForm.value.name)
  // }

  showsubmitButton() {
    this.qs.buttonVisibility = true;
  }

  onUpdate() {
    console.log('I was clicked')
    console.log(this.orderForm.value)
    this.toggleEdit.emit(this.orderForm.value);
  }

  onDelete() {
    console.log('I was clicked')
    this.f.editor.setValue(null)
    console.log(this.orderForm.value)
    this.toggleEdit.emit(this.orderForm.value);
  }
  onDismiss(){
    this.dismiss.emit();
  }
}
