import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-upgrade-notification',
  templateUrl: './upgrade-notification.component.html',
  styleUrls: ['./upgrade-notification.component.css']
})
export class UpgradeNotificationComponent {
  @Input() notification: any = ''
}
