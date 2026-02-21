import {Component, Input, OnInit} from '@angular/core';
import {ReportsService} from "../../../_services/reports.service";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent  implements OnInit{
  @Input() otherInfo:any = []
  constructor(private rs: ReportsService) {

  }

  ngOnInit() {
    this.rs.setQuestionComments(this.otherInfo[0].other)

}
}
