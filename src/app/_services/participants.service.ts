import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Subject, Observable} from "rxjs";
import { map } from 'rxjs/operators';
import {AlertService} from "./alert.service";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {

  public userCategories: BehaviorSubject<[]>;
  public resetCategories: BehaviorSubject<boolean>;
  public inviteLimitStatus: BehaviorSubject<boolean>;
  public inviteLimitReached: BehaviorSubject<any>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public url
  constructor(private http: HttpClient, private alertService: AlertService, private authenticationService: AuthenticationService) {

    this.url =this.authenticationService.url
    this.userCategories = new BehaviorSubject<[]>([]);
    this.resetCategories = new BehaviorSubject<boolean>(false);
    this.inviteLimitStatus = new BehaviorSubject<boolean>(false);
    this.inviteLimitReached = new BehaviorSubject<any>(true);
  }

  getStudyParticipants(studyId:string){
    return this.http.get(this.url + '/api/participants/'+ studyId)
      .pipe(map((result: any) => {
     //   this.inviteLimitStatus.next(result['allowAddInvite']);
      return result
    }));;
  }

  studyUserSearch(search:string, studyId:string){
    return this.http.get(this.url + '/api/studyUserSearch/'+ search+'/'+studyId)
      .pipe(map((result: any) => {
     //   this.inviteLimitStatus.next(result['allowAddInvite']);
      return result
    }));;
  }

  inviteParticipants(participant:any){
    return this.http.post(this.url + '/api/invite', participant)
      .pipe(map((result: any) => {
      this.alertService.setAlert(result);
      return result
    }));;
  }

  inviteParticipantsReminder(reminderLinkId:string){
    return this.http.get(this.url + '/api/inviteResend/'+ reminderLinkId)
      .pipe(map((result: any) => {
       // console.log(result)
      this.alertService.setAlert(result);
      return result
    }));;
  }

  getParticipantsFormArray(studyId:string) {
    return this.http.get(this.url + '/api/participantsFormArray/'+studyId);
  }

  inviteUsageCheck(studyId:string) {
    return this.http.get(this.url + '/api/inviteUsageCheck/'+studyId);
  }

  searchParticipants(studyId:string,filter:string){
  return this.http.post(this.url + '/api/searchParticipant/'+studyId, filter);
}
removeInvite(inviteId:string){
  return this.http.get(this.url + '/api/removeInvite/'+inviteId);
}

  setUserEditCategories(newValue: any): void {
    this.userCategories.next(newValue);
  }

  getUserEditCategories(): Observable<any> {
    return this.userCategories.asObservable();
  }

  setResetCategories(newValue: any): void {
    this.resetCategories.next(newValue);
  }

  getResetCategories(): Observable<any> {
    return this.resetCategories.asObservable();
  }

  setInviteLimitStatus(newValue: boolean): void {
    this.inviteLimitStatus.next(newValue);
  }

  getInviteLimitStatus(): Observable<boolean> {
    return this.inviteLimitStatus.asObservable();
  }

  setConfirmInviteLimitStatus(newValue: any): void {
    this.inviteLimitReached.next(newValue);
  }

  getConfirmInviteLimitStatus(): Observable<any> {

    return this.inviteLimitReached.asObservable();
  }

  participantSearch(studyId:string,filter:string){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'client': 'administration'
      })
    };
    return this.http.post(this.url + '/api/participantSearch/'+studyId, JSON.stringify({"name": filter}), httpOptions);
  }
}
