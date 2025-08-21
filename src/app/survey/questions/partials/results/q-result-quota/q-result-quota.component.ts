import {Component, Input} from '@angular/core';
import {QuestionService} from "../../../../../_services/question.service";
import {ReportsService} from "../../../../../_services/reports.service";

@Component({
  selector: 'app-q-result-quota',
  templateUrl: './q-result-quota.component.html',
  styleUrls: ['./q-result-quota.component.css']
})
export class QResultQuotaComponent{
  @Input() studyInfo: any = [];
  questions: any = []
  showFilter: boolean = false;
  constructor(private qs: QuestionService, private rs: ReportsService) {
    this.qs.getQuestion().subscribe((data) => {

      const fin: any = []
      if(!data.length) {
        const newArray = data.data.map((element: any, index: any, array: any) => {
          if (array[index]['type'] != 'textarea') {
            fin.push(array[index])
          }
        });

        this.questions = fin
      }
      this.rs.getStoreFilterSelectionArrSelection().subscribe((data) =>{
        this.showFilter = true
      })
    })
  }

  showQuestion(i: number) {
    // this.pageQuestion.emit(i);
    this.qs.setChartReportPagination(i + 1)
  }
}
