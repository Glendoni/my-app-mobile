import {Component, Input, OnInit} from '@angular/core';
import {ChartConfiguration} from "chart.js";

@Component({
  selector: 'app-bar-chart-horizontal-processor',
  templateUrl: './bar-chart-horizontal-processor.component.html',
  styleUrls: ['./bar-chart-horizontal-processor.component.css']
})
export class BarChartHorizontalProcessorComponent implements OnInit{
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
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    aspectRatio:2,
    responsive: true,
    indexAxis: 'y',
  };

  ngOnInit() {
    this.barChartData = this.result[0]
  }
}
