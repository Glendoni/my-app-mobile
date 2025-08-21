import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ParticipantsService, StudyService} from "../../../_services";
import {data} from "autoprefixer";
import {BehaviorSubject, debounceTime, distinctUntilChanged, Subject} from "rxjs";

@Component({
  selector: 'app-participant-invite',
  templateUrl: './participant-invite.component.html',
  styleUrls: ['./participant-invite.component.css']
})
export class ParticipantInviteComponent implements OnInit {
  @Input() studyInfo: any = []

  public inviteForm: any = FormGroup
  submitted: boolean = false
  alreadyInvitedValidation: boolean = false;
  showUpgradeNotification: boolean = false;
  upgradeNotification: string = '';
  dataLink: any;
  public study_categories: any =[];
  public filterSet: any;
  public searchText: any;
  public isVisible: boolean =  false;
  public isCursorOverFilterSet: boolean = false;
  public userQuestion: string = '';
  public userQuestionUpdate = new Subject<string>();


  constructor(private fb: FormBuilder, private participantsService: ParticipantsService, private studyService:StudyService) {

   // this.userQuestionUpdate = new BehaviorSubject<string>('');

    if(true){
      this.userQuestionUpdate.pipe(
        debounceTime(400),
        distinctUntilChanged())
        .subscribe((value:string) => {
          this.searchText = value
          if(value.length >=3) {
            this.searchUsers(value)
          }
          //  this.consoleMessages.push(value);
        });
    }else{
      this.hideList()
    }
  }

  ngOnInit() {
//if(!this.studyInfo['study_categories'].length){
  this.studyService.getparticipantCategories(this.studyInfo['study']['id']).subscribe((data)=>{
    this.study_categories = data
  })
//}
//else{
  //this.study_categories = this.studyInfo['study_categories'];
//}
    this.inviteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      categories: [''],
      study_id: [this.studyInfo.study.id],
    });
  }

  get f() {
    return this.inviteForm.controls;
  }

  onUpdate() {
    this.sendInvite()
  }

  sendInvite() {

    this.submitted = true;
    if(!this.inviteForm.valid){
      return;
    }
    this.participantsService.inviteParticipants(this.inviteForm.value).subscribe((data) => {
      this.dataLink = data.data.link

      if (data.data.link) {
        if (data.data.link.length > 10) {
          this.inviteForm.controls['email'].disable();
          this.alreadyInvitedValidation = true
        }
      } else {
        if (data['success']) {
          this.submitted = false;
          this.f.name.setValue([])
          this.f.email.setValue([])
          this.f.categories.setValue([])
          this.participantsService.setResetCategories(true)
        }
        this.onSendReminderNo()
      }
    },
      (error) => {
      console.log(error.error.data)
        this.showUpgradeNotification = true
        this.upgradeNotification = error.error.data;
      }

    )
  }

  sendInviteReminder(inviteLink: string) {
    this.submitted = true;
    this.participantsService.inviteParticipantsReminder(inviteLink).subscribe((data) => {
      this.onSendReminderNo()
      this.participantsService.setResetCategories(true)
    })
  }

  removeIndividualCheckedList(event: any) {
  }

  addToSurvey(event: any) {

   // this.participantsService.setResetCategories(true)
  }

  shareCheckedList(event: any) {

    this.f.categories.setValue(event)
  }

  shareIndividualCheckedList(event: any) {

  }

  onSendReminder(linkId: string) {
    this.sendInviteReminder(linkId)
  }

  onSendReminderNo() {
    this.inviteForm.controls['email'].enable();
    this.f.name.setValue([])
    this.f.categories.setValue([])
    this.f.email.setValue('')
    this.submitted = false;
    this.alreadyInvitedValidation = false
  }
  showList() {
    if(this.searchText.length > 0){
      console.log(this.searchText)
      this.isVisible = true;
    }
  }
  hideList() {
    if(this.isCursorOverFilterSet != true) {
      this.isVisible = false;
    }
  }

  cursorOverSet() {
    this.showList();
    this.isCursorOverFilterSet = true;
  }
  searchUsers(value:string){
   if(!this.isCursorOverFilterSet) {
     this.participantsService.studyUserSearch(value,this.studyInfo['study']['id']).subscribe((data: any) => {
       if(data.length ==1){
         this.isCursorOverFilterSet=true;
       }
       this.filterSet = data
       this.showList();
     })
   }
  }

  getTypeahead(event: any) {
    this.f.name.setValue(event.name)
    this.f.email.setValue(event.email)
    this.isVisible = false;
    this.filterSet = [];
   // this.hideList();
  }
  setValue(value: any) {
    this.searchText = value;
    this.filterSet = [];
    this.filterSet.push(value);
     this.isCursorOverFilterSet = true;

   this.getTypeahead(value);
   // this.hideList();
   // this.isCursorOverFilterSet = true
  }

  showListReset() {
    this.isCursorOverFilterSet = false
    this.isVisible = true;
    this.filterSet = [];
    // this.isCursorOverFilterSet = false
  }
}
