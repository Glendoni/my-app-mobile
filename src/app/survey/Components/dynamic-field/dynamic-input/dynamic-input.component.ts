import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormGroupDirective } from "@angular/forms";

@Component({
  selector: "app-dynamic-input",
  templateUrl: "./dynamic-input.component.html",
  styleUrls: ["./dynamic-input.component.css"],
})
export class DynamicInputComponent {
  @Input() field: any;
  formName: FormGroup;
  classCtrl = "form-control"
  constructor(private formgroupDirective: FormGroupDirective) {
    this.formName = formgroupDirective.control;
  }
}
