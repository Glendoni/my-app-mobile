import {Component, Input, OnInit} from '@angular/core';
import {ReportsService} from "../../_services/reports.service";

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnInit{
  @Input() studyInfo: any = [];
  matrix:any =[];

  constructor(private reportService:ReportsService ) {


  }
  ngOnInit() {

    this.reportService.getStudyMatrix(this.studyInfo.id).subscribe((data)=>{

      this.matrix = data;
    })
  }
}
