import {Component, Input, OnInit} from '@angular/core';
import {ChartConfiguration} from "chart.js";

@Component({
  selector: 'app-pie-chart-processor',
  templateUrl: './pie-chart-processor.component.html',
  styleUrls: ['./pie-chart-processor.component.css']
})
export class PieChartProcessorComponent  implements OnInit{
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
  public barChartOptions: ChartConfiguration<'pie'>['options'] = {
    aspectRatio:2,
    responsive: true,
  };

  ngOnInit() {
    this.barChartData = this.result[0]
  }

}
