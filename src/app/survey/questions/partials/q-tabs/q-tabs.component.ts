import {Component, EventEmitter, Output, Input} from '@angular/core';
import {QuestionService} from "../../../../_services/question.service";

@Component({
  selector: 'app-q-tabs',
  templateUrl: './q-tabs.component.html',
  styleUrls: ['./q-tabs.component.css']
})
export class QTabsComponent {
 // @Input() showResultTab:any= [];
  @Output() loadReports = new EventEmitter<boolean>();
  public showResultTab:boolean = true
  constructor(private qs:QuestionService) {

    this.qs.getShowHideResultsTab().subscribe((data:boolean) =>{
      this.showResultTab = data ?true:false
    })
  }
  getReports(tab:boolean = true) {
    this.loadReports.emit(tab);
  }
}
