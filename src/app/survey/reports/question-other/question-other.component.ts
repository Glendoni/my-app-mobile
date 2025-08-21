import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-question-other',
  templateUrl: './question-other.component.html',
  styleUrls: ['./question-other.component.css']
})
export class QuestionOtherComponent {
@Input() otherInfo:any = []
@Input() studyType:number = 1
p:any = 1
}
