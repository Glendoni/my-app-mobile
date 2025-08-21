import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormGroupDirective } from "@angular/forms";

@Component({
  selector: "app-dynamic-checkboxs",
  templateUrl: "./dynamic-checkboxs.component.html",
  styleUrls: ["./dynamic-checkboxs.component.css"],
})
export class DynamicCheckboxsComponent {
  @Input() field: any;
  formName: FormGroup;
  classCtrl =  "form-check-input"
  constructor(private formgroupDirective: FormGroupDirective) {
    this.formName = formgroupDirective.control;
  }
}
