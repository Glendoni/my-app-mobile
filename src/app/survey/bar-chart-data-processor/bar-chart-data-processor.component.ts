import { Component, Input, OnInit,AfterViewInit } from '@angular/core';
import {ChartConfiguration} from "chart.js";

@Component({
  selector: 'app-bar-chart-data-processor',
  templateUrl: './bar-chart-data-proceessor.component.html',
  styleUrls: ['./bar-chart-data-processor.component.css']
})
export class BarChartDataProcessorComponent implements OnInit{
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
    indexAxis: 'x',
  };

  ngOnInit() {
    this.barChartData = this.result[0]
  }



}
