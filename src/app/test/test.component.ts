import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
 styleUrls: ['./test.component.css']

})
export class TestComponent implements OnInit, OnDestroy{
  id: number =0;
  private sub: any;
  paramsSubscription:any = Subscription;

  constructor(protected route: ActivatedRoute) {}

  ngOnInit() {

    this.paramsSubscription = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
console.log(params['id'])
    });
console.log(this.id)
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
