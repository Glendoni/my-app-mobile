import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-q-center',
  templateUrl: './q-center.component.html',
  styleUrls: ['./q-center.component.css']
})
export class QCenterComponent {
  @Input() studyInfo: any = [];


}
