import {Component, Input} from '@angular/core';
import {ChartConfiguration} from "chart.js/dist/types";

@Component({
  selector: 'app-doughnut-chart-processor',
  templateUrl: './doughnut-chart-processor.component.html',
  styleUrls: ['./doughnut-chart-processor.component.css']
})
export class DoughnutChartProcessorComponent {
  @Input() result:any =[]
  public barChartLegend = true;
  public barChartPlugins = [];
  res:any;
  details:any ={}
  resultr:boolean =true
  labels:any= []
  datasets:any= []
  title = 'Footfall on Main High Streets Per Minute';

  public barChartData:any = []
  public barChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    aspectRatio:2,
    responsive: true,
  };

  ngOnInit() {
    this.barChartData = this.result[0]
  }
}
