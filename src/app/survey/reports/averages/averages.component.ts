import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-averages',
  templateUrl: './averages.component.html',
  styleUrls: ['./averages.component.css']
})
export class AveragesComponent {
  @Input() result:any =[]
}
