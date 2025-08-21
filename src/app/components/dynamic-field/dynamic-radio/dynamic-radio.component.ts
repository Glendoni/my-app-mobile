import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormGroupDirective } from "@angular/forms";

@Component({
  selector: "app-dynamic-radio",
  templateUrl: "./dynamic-radio.component.html",
  styleUrls: ["./dynamic-radio.component.css"],
})
export class DynamicRadioComponent {
  @Input() field: any;
  formName: FormGroup;
  classCtrl = "form-check-input"
  constructor(private formgroupDirective: FormGroupDirective) {
    this.formName = formgroupDirective.control;
  }
}
