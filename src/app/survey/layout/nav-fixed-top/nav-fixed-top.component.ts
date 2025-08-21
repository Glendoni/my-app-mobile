import { Component,OnInit } from '@angular/core';
import {QuestionService} from "../../../_services/question.service";
import {AuthenticationService, StudyService} from "../../../_services";
import {data} from "autoprefixer";

@Component({
  selector: 'app-nav-fixed-top',
  templateUrl: './nav-fixed-top.component.html',
  styleUrls: ['./nav-fixed-top.component.css']
})
export class NavFixedTopComponent implements OnInit{
  userDetails:any = []
  public setActiveMode: number =1;
  public setActiveGlobalMode: boolean = false;
  constructor(public questionService: QuestionService, private auth:AuthenticationService, private studyService:StudyService) {
   // this.userDetails = localStorage.getItem('currentUser')
  }

ngOnInit() {
    // this.auth.getUserDetails().subscribe((data) =>{
    //   this.userDetails = data
    //   console.log(data)
    // })


this.studyService.getGlobalActiveMode().subscribe((data:boolean) =>{

  this.setActiveGlobalMode = data
})
  this.studyService.getActiveMode().subscribe((data:number) =>{
  this.setActiveMode = data
})

  this.userDetails = localStorage.getItem('username')??null


}
onStudyListing(){
  this.questionService.setRedirectToDashboard()
}
}
