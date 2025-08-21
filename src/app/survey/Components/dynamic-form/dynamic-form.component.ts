import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: "app-dynamic-form",
  templateUrl: "./dynamic-form.component.html",
  styleUrls: ["./dynamic-form.component.css"],
})
export class DynamicFormComponent implements OnInit {
  @Input() model: any;
  public dynamicFormGroup: any = FormGroup;
  public fields: any = [];
  @Output() profile = new EventEmitter<any>();
  @Output() resetFilter = new EventEmitter<any>();

  ngOnInit() {
  // console.log(this.model)
    this.buildForm();
  }

  private buildForm() {
    const formGroupFields = this.getFormControlsFields();
   // console.log(formGroupFields)
    this.dynamicFormGroup = new FormGroup(formGroupFields);
  }

  private getFormControlsFields() {
    const formGroupFields: any | null = []
   // console.log(this.model)
    for (const field of Object.keys(this.model)) {
      const fieldProps = this.model[field];

      const validators = this.addValidator(fieldProps.rules);

      formGroupFields[field] = new FormControl(fieldProps.value, validators);
      this.fields.push({...fieldProps, fieldName: field});
    }
    return formGroupFields;
  }

  private addValidator(rules: any) {

    if (!rules.required) {

      return [];
    }

    const validators = Object.keys(rules).map((rule) => {
      switch (rule) {
        case "required":
          return Validators.required;
        default:
          return Validators.max(200000); //hack
        //add more case for future.
      }
    });
    return validators;
  }

  onSubmit() {
    this.profile.emit(this.dynamicFormGroup.value);
  }

  onResetFilter(){
    this.dynamicFormGroup.reset();
    this.resetFilter.emit();
  }


}
