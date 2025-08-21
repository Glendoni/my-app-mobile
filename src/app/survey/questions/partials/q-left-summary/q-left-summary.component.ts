import {Component, Input, OnInit} from '@angular/core';
import {QuestionService} from "../../../../_services/question.service";

@Component({
  selector: 'app-q-left-summary',
  templateUrl: './q-left-summary.component.html',
  styleUrls: ['./q-left-summary.component.css']
})
export class QLeftSummaryComponent implements OnInit {
  @Input() studyInfo: any = [];
  categories: any = [];

  constructor(private qs: QuestionService) {
  }

  ngOnInit() {
    this.qs.getCategories(this.studyInfo['study']['id']).subscribe((data) => {
      this.categories = data
    })
  }
}
