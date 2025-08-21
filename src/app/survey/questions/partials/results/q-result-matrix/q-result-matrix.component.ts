import {Component, Input, OnInit} from '@angular/core';
import {QuestionService} from "../../../../../_services/question.service";
import {ReportsService} from "../../../../../_services/reports.service";

@Component({
  selector: 'app-q-result-matrix',
  templateUrl: './q-result-matrix.component.html',
  styleUrls: ['./q-result-matrix.component.css']
})
export class QResultMatrixComponent implements OnInit{
  @Input() studyInfo: any = [];
  public matrix:any = []
  constructor(private qs: QuestionService, private rs: ReportsService) {
  }

  ngOnInit() {
    this.rs.getStudyMatrix(this.studyInfo.study.id).subscribe((data:any)=>{
      this.matrix = data;
    })
  }
}
