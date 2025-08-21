import { AfterViewInit, Component, Input } from "@angular/core";
import { FormGroup, FormGroupDirective } from "@angular/forms";
import { tap, filter, iif, takeWhile } from "rxjs";
import { MessageService } from "./../../../../_services/message.service";


@Component({
  selector: "app-dynamic-select",
  templateUrl: "./dynamic-select.component.html",
  styleUrls: ["./dynamic-select.component.css"],
})
export class DynamicSelectComponent implements AfterViewInit {
  @Input() field: any;
  formName: FormGroup;
  alive = true;
  classCtrl = "form-select"
  constructor(
    private messageService: MessageService,
    private formGroupDirective: FormGroupDirective) {
    this.formName = formGroupDirective.control;
  }


  ngAfterViewInit(): void {
    this.listenForLinkData();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  listenForLinkData() {
    if (!this.field?.link) {
      return;
    }
    this.messageService.message$.pipe(
      filter(v => v.link === this.field.link),
      takeWhile(() => this.alive)
    ).subscribe((v) => {
      this.field.options = v.data
    })
  }

  changedValue(value: string) {
    // console.log('Changed value')
    // console.log(value)
    // console.log('All values in form')
    // console.log(this.formName.value) //send to service

    if (!this.field.provideData) {
      return;
    }
    this.messageService.messageSubject.next({
      link: this.field.fieldName,
      data: this.field.provideData.filter((v:any) => v.sourceValue === value)
    })
  }
}
