import { Component } from '@angular/core';
import {QuestionService} from "../../../../_services/question.service";
import {StudyService} from "../../../../_services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-q-header',
  templateUrl: './q-header.component.html',
  styleUrls: ['./q-header.component.css']
})
export class QHeaderComponent {

  constructor(private qs: QuestionService,private  studyService: StudyService, private router: Router) {

  }

  onBackTDashboard():void
  {
    this.qs.setRedirectToDashboard()
  }

}
