import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fieldtype',
  templateUrl: './fieldtype.component.html',
  styleUrls: ['./fieldtype.component.css']
})
export class FieldtypeComponent implements OnInit

{

  @Input() field : any;

  ngOnInit(): void {

  }

}
