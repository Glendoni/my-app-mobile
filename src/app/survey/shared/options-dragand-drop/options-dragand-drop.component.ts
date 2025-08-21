import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {QuestionService} from "../../../_services/question.service";
import {FiledTypeMenu} from '../../../options/fieldTypeMenu';

@Component({
  selector: 'app-options-dragand-drop',
  templateUrl: './options-dragand-drop.component.html',
  styleUrls: ['./options-dragand-drop.component.css']
})
export class OptionsDragandDropComponent implements OnInit {
  cdkDropListConnectedTo: any
  showDetails: boolean = false;
  boxOption: boolean = false;
  field = FiledTypeMenu

  @Input() optionListItems: any;
  @Output() toggleEdit = new EventEmitter<string>();

  title = 'Survey';
  optionList: any = ['one'];
  fieldPreFillOptions:any =[]
  chartFillOptions:any =[]
  chartOptions:any =[]
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  lister: any
  items!: FormArray<any>
  orderForm = this.fb.group({
    name: ['', Validators.required],
    inputOptionBox: [false],
    chartType: ["1"],
  });
  private opt: any;
  disabled: boolean = true;

  constructor(private fb: FormBuilder, private qs: QuestionService) {
  }

  ngOnInit() {
    this.orderForm.controls.chartType.setValue(this.optionListItems['chartType'])
    this.orderForm.controls.inputOptionBox.setValue(this.optionListItems['otherField'] ? true : false)
    this.qs.setChartType(this.orderForm.value.chartType)
    this.optionList = this.optionListItems.options
    this.showDetails = true;
    this.showsubmitButton()
    this.qs.getOptions().subscribe((data) => {
    })

    this.qs.getBoxAutoFillOptions().subscribe((data)=>{
      this.fieldPreFillOptions = data
    })

    this.qs.getChartFillOptions().subscribe((data) => {
      // console.log('Glen')
      this.chartFillOptions =data
    })
  }

  get f() {
    return this.orderForm.controls;
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
    let i = 1;
    const lister = this.optionList.map(function (item: any) {
      item.sort = i++
      return item
    })

    this.lister = lister
  }

  toggle(item: string): void {
    // this.toggleEdit.emit(item);
  }

  addToArr(): any {

    this.qs.setOptionBtnSubmitVisibility(true);
    var name = this.orderForm.value.name;

    var matchFound = false
    for (let value of this.optionList.values()) {
      if (value.label.toLowerCase() === name?.toLowerCase()) {
        matchFound = true
        break;
      }                 //37 35 40
    }

    if (name != null && !this.optionList.includes(name) && name.length >= 1 && !matchFound) {
      this.optionList.push({"label": name});
      //  this.qs.setOptions(this.optionList);
      this.showDetails = true;
      this.showsubmitButton()
    }
    //  console.log(this.orderForm.value.name)
  }

  showsubmitButton() {
    this.qs.buttonVisibility = true;
  }

  onUpdate() {
    this.toggleEdit.emit(this.lister ?? this.optionList);
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
    this.boxOption = this.orderForm.value.inputOptionBox ? false : true;
    this.qs.setBoxOptions(this.boxOption)
  }

  setChartType() {
    this.qs.setChartType(this.f.chartType.value)
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

  onClearOptions() {
    //this.optionListItems.options.setValue([])
    this.optionList = [];
    this.f.inputOptionBox.setValue(false)
  }
}
