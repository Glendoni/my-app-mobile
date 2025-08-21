import {Component} from '@angular/core';
import {AlertService} from "../../_services";

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent {
  public isVisible: boolean = false;
  status: string = 'alert';
  public notificationMessage: any = ''

  constructor(public alert: AlertService) {
    this.isVisible = false;
    // this.showAlert()
    this.alert.getAlert().subscribe((data: any) => {
      if (data['error']) {
        this.status = 'alert-danger'
      }

      // this.notificationMessage =  data['message']??data
      this.notificationMessage = data['message'] ?? data
      this.showAlert()
    })
  }

  showAlert(): void {
    // if (this.isVisible) {
    //
    //   return;
    // }

    this.isVisible = true;
    setTimeout(() => this.isVisible = false, 3500)

  }

  showStaticAlert(): void {


    this.isVisible = true;
    setTimeout(() => this.isVisible = false, 3500)

  }


}
