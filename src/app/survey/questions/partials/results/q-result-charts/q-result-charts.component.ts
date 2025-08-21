import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-q-result-charts',
  templateUrl: './q-result-charts.component.html',
  styleUrls: ['./q-result-charts.component.css']
})
export class QResultChartsComponent {
  @Input() studyInfo: any = [];
}
