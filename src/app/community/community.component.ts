import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Subscription} from "rxjs";
import {CommunityService} from "../_services/community.service";
import {BaseCommunity} from "../interfaces/BaseCommunity";


@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit{
  Params: number = 0
  id: number =0;
  private sub: any;

  allJoinRequests:any = []
  categories:any =[]
  paramsSubscription:any = Subscription;
study:any = []
  constructor(private route: ActivatedRoute, private communityService:CommunityService) {}
  ngOnInit():void {
    this.communityService.getJoinRequests().subscribe((data:BaseCommunity[]) =>{
      this.allJoinRequests = data;
     // this.study = data.meta.studyDetails[0]
     // console.log(data)
    })
    this.communityService.getStudyCategories().subscribe((data:any) =>{
      this.categories = data;
      console.log(data)
    })




   // this.route.params.subscribe((params: Params) => this.Params = params['caller'])

    // this.paramsSubscription = this.route.params.subscribe(params => {
    //   this.id = +params['id']; // (+) converts string 'id' to a number
    //   console.log(this.id )
    // });



  }
}
