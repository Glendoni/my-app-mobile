import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FiledTypeMenu} from "../../../options/fieldTypeMenu";
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {QuestionService} from "../../../_services/question.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-option-number-field',
  templateUrl: './option-number-field.component.html',
  styleUrls: ['./option-number-field.component.css']
})
export class OptionNumberFieldComponent implements OnInit {
  cdkDropListConnectedTo: any
  showDetails: boolean = false;
  field = FiledTypeMenu
  @Input() action: boolean = false;
  @Input() studyInfo: any;
  @Input() optionListItems: any;
  @Output() toggleEdit = new EventEmitter<object>();
  @Output() dismiss = new EventEmitter<string>();
  title = 'Survey';
  optionList: any = ['one'];
  chartFillOptions:any =[]
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  lister: any
  items!: FormArray<any>
  orderForm = this.fb.group({
    name: [''],
    fieldType: ['number'],
    chartType: ['1'],
    minNumber: [''],
    maxNumber: ['']
  });
  private opt: any;

  constructor(private fb: FormBuilder, private qs: QuestionService) {
  }

  ngOnInit() {
    if (this.action) {
      this.f.minNumber.patchValue(this.optionListItems.options.minNumber)
      this.f.maxNumber.patchValue(this.optionListItems.options.maxNumber)
    }
    this.f.chartType.setValue(this.optionListItems.chartType)
    this.optionList = this.optionListItems.options
    this.showDetails = true;

    this.qs.getChartFillOptions().subscribe((data) => {
      // console.log('Glen')
      this.chartFillOptions =data
    })
  }

  get f() {
    return this.orderForm.controls;
  }

  showsubmitButton() {
    this.qs.buttonVisibility = true;
  }

  onUpdate() {
    this.toggleEdit.emit(this.orderForm.value);
  }

  onDismiss() {
    this.dismiss.emit();
  }

  setChartType() {
    console.log(this.orderForm.controls.chartType.value)
    this.qs.setChartType(this.orderForm.controls.chartType.value)


  }
}

