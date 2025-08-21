import { Component } from '@angular/core';
import {AlertService} from "../../_services";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent {

  public isVisible: boolean = false;
  status: string = 'alert';
  public notificationMessage: any = ''

  constructor(public alertService: AlertService) {
    this.isVisible = false;

    // this.showAlert()
    this.alertService.getAlert().subscribe((data: any) => {
      this.status = ''
      console.log(data)
      if (data) {
        this.status = 'alert-danger'
        // this.notificationMessage =  data['message']??data
        this.notificationMessage = data ?? data
        this.showAlert()
      }


    })
  }

  showAlert(): void {
    // if (this.isVisible) {
    //
    //   return;
    // }

    this.isVisible = true;
    setTimeout(() => this.isVisible = false, 4500)

  }

  showStaticAlert(): void {


    this.isVisible = true;
    setTimeout(() => this.isVisible = false, 3500)

  }
}
