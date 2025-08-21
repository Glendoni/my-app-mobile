import {Component, Input, OnInit} from '@angular/core';
import {ReportsService} from "../../../../_services/reports.service";

@Component({
  selector: 'app-q-right-app-menu',
  templateUrl: './q-right-app-menu.component.html',
  styleUrls: ['./q-right-app-menu.component.css']
})
export class QRightAppMenuComponent implements OnInit{
@Input() studyInfo: any =[]
  public showMatrix:boolean = false
  public matrix:any = []

  constructor(private rs: ReportsService) {
  }
  ngOnInit() {
    this.rs.getStudyMatrix(this.studyInfo.study.id).subscribe((data:any)=>{
      this.matrix = data;
      this.showMatrix= true;
    })
  }
}
