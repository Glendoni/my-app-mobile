import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FiledTypeMenu} from "../../../options/fieldTypeMenu";
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {QuestionService} from "../../../_services/question.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-create-question-options',
  templateUrl: './create-question-options.component.html',
  styleUrls: ['./create-question-options.component.css']
})
export class CreateQuestionOptionsComponent implements OnInit {
  cdkDropListConnectedTo: any
  showDetails: boolean = false;
  field =FiledTypeMenu
  fieldPreFillOptions:any =[]
  @Input() optionListItems:any;
  @Output() toggleList = new EventEmitter<string>();
  @Output() dismiss = new EventEmitter<string>();

  title = 'Survey';
  optionList: any = [];
  boxOption: boolean = false;
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  lister:any
  items!: FormArray<any>
  orderForm = this.fb.group({
    name: ['', Validators.required]
  });
  private opt: any;

  constructor(private fb: FormBuilder, private qs: QuestionService) {

    this.qs.getBoxAutoFillOptions().subscribe((data)=>{
      this.fieldPreFillOptions = data
    })
  }

  ngOnInit() {



   // this.optionList = this.optionListItems.options
    //this.qs.setOptions('Test')
    //this.optionList.push('Test');
    //this.qs.setOptions(this.optionList);
    this.showDetails = true;
    this.showsubmitButton()
    this.qs.getOptions().subscribe((data) => {
      // console.log('Get option list')
      // console.log(data)
      //   this.optionList = data
      // return this.optionList = data
    })
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
    // this.qs.setOptions(this.optionList);
//     console.log(event.container.data)
    let i =1;
    const lister =this.optionList.map(function (item:any){
      item.sort  = i++
      return item
    })

    this.lister = lister
    //
  }

  toggle(item: string): void {
    // this.toggleEdit.emit(item);
  }
  addToArr(): any {

    this.qs.setOptionBtnSubmitVisibility(true);
    const name = this.orderForm.value.name;
    console.log(name)
   // this.optionList.push(name);

    // console.log(this.optionList.includes(name))
    console.log(this.optionList)
    if (name != null &&
     !this.optionList.includes({"label": name}) &&
      name.length >= 1) {
      this.optionList.push({"label": name});
      //  this.qs.setOptions(this.optionList);
      this.showDetails = true;
      this.showsubmitButton()
    }
    console.log(this.optionList)
    console.log(this.orderForm.value.name)
  }

  showsubmitButton() {
    this.qs.buttonVisibility = true;
  }

  onUpdate() {


    // var index = this.todo.indexOf(this.orderForm.value.oldName);
    //
    // if (~index) {

    //   this.todo[index] = this.orderForm.value.name;
    // }
    this.qs.setOptions(this.optionList);

    // this.toggleEdit.emit(this.lister);
//console.log(this.lister??this.optionList)
 //  this.toggleList.emit();
 this.toggleList.emit(this.lister??this.optionList);
    // console.log(this.lister??this.optionList)
    // console.log(this.orderForm.value.name)
  }

  onDismiss(){
    this.dismiss.emit();
  }

  onDelete(msg: string): void {
    this.removeIndexFromArray(msg)
    this.addQuestionComponentSubmissionButtonVisibility()
    this.qs.setOptions(this.optionList);
  }

  removeIndexFromArray(msg: string) {
    const index: number = this.optionList.indexOf(msg);
    if (index !== -1) {
      this.optionList.splice(index, 1);
    }

  }

  addQuestionComponentSubmissionButtonVisibility(visibility: boolean = false) {

    if (this.optionList.length < 1) {
      this.qs.setOptionBtnSubmitVisibility(visibility);
    }
  }

  optionBox() {
    console.log('Glen')
    this.boxOption = this.boxOption ? false : true;
    this.qs.setBoxOptions(this.boxOption)
    // console.log(this.boxOption)
  }

  get f() {
    return this.orderForm.controls;
  }
  ondDaysOfTheWeek(){
    this.onClearOptions()
   // this.qs.setOptionBtnSubmitVisibility(true);
    var daysOfTheWeek = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ];
    for (var val of daysOfTheWeek) {
      var matchFound = false
      for (let value of this.optionList.values()) {
        if (value.label.toLowerCase() === val?.toLowerCase()) {
          matchFound = true
          break;
        }                 //37 35 40
      }

      if (val != null && !this.optionList.includes(val) && val.length >= 1 && !matchFound) {
        this.optionList.push({"label": val});
        //  this.qs.setOptions(this.optionList);
        this.showDetails = true;
        this.showsubmitButton()
      }
    }

  }

  onAddCalendarMonths(){
    this.onClearOptions()
    this.qs.setOptionBtnSubmitVisibility(true);
    var calendar = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'];

    // let arr = [10, 20, 30, 40];

    for (var val of calendar) {
      // console.log(val); // prints values: 10, 20, 30, 40

      //
      var matchFound = false
      for (let value of this.optionList.values()) {
        if (value.label.toLowerCase() === val?.toLowerCase()) {
          matchFound = true
          break;
        }                 //37 35 40
      }

      if (val != null && !this.optionList.includes(val) && val.length >= 1 && !matchFound) {
        this.optionList.push({"label": val});
        //  this.qs.setOptions(this.optionList);
        this.showDetails = true;
        this.showsubmitButton()
      }
    }
  }


  onYesNo(){
    this.onClearOptions()
    this.qs.setOptionBtnSubmitVisibility(true);
    var yesno = [
      'Yes',
      'No'
    ];

    // let arr = [10, 20, 30, 40];

    for (var val of yesno) {
      // console.log(val); // prints values: 10, 20, 30, 40

      //
      var matchFound = false
      for (let value of this.optionList.values()) {
        if (value.label.toLowerCase() === val?.toLowerCase()) {
          matchFound = true
          break;
        }                 //37 35 40
      }

      if (val != null && !this.optionList.includes(val) && val.length >= 1 && !matchFound) {
        this.optionList.push({"label": val});
        //  this.qs.setOptions(this.optionList);
        this.showDetails = true;
        this.showsubmitButton()
      }
    }

  }

  /**
   * get autofill for select and radio type question fields
   * @param $id
   */
  onOptions($id: string) {
    this.onClearOptions()
    this.qs.setOptionBtnSubmitVisibility(true);
    this.qs.getAutoFillOptions($id).subscribe((data) => {
      var returned_options = data;
      for (var val of returned_options) {
        var matchFound = false
        for (let value of this.optionList.values()) {
          if (value.label.toLowerCase() === val?.toLowerCase()) {
            matchFound = true
            break;
          }
        }
        if (val != null && !this.optionList.includes(val) && val.length >= 1 && !matchFound) {
          this.optionList.push({"label": val});
          //  this.qs.setOptions(this.optionList);
          this.showDetails = true;
          this.showsubmitButton()
        }
      }
    })
  }

  onClearOptions(){
    //this.optionListItems.options.setValue([])
    this.optionList =  [];
   // this.f.inputOptionBox.setValue(false)
  }



}
