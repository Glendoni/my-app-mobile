import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseCommunity} from "../interfaces/BaseCommunity";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {Subject} from 'rxjs';
import {AlertService} from "./alert.service";
import {AuthenticationService} from "./authentication.service";

@Injectable({providedIn: 'root'})
export class CommunityService {
  public url
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  pages = new Subject();
public  studyId: string = "9aad164a-d12d-4100-ac31-d38d3e5461da"
  public search = new Subject<string>();
 // public  currentUser = JSON.parse(localStorage.getItem('currentUser'))


  constructor(private http: HttpClient, private alertService: AlertService, private authenticationService: AuthenticationService) {
    this.url = authenticationService.url
  }

  acceptJoinRequest(email:string) {
    return this.http.post(this.url + '/api/studyJoinRequest',email);
  }


  getProfile() {
    return this.http.get(this.url + '/api/profile');
  }

  getJoinRequests(): Observable<BaseCommunity[]>{
    return this.http.get<BaseCommunity[]>(this.url + '/api/joinRequests/'+ this.studyId);
}

getStudyCategories(){
    return this.http.get(this.url + '/api/categories/'+ this.studyId);
}

getStudy(){
    return this.http.get(this.url + '/api/categories/'+ this.studyId);
}


  attachUserToCategory(attachUserToCategory: any) {
    return this.http.post(this.url + '/api/allocate',attachUserToCategory)
      .pipe(map((result: any) => {
       // console.log(result)
        this.alertService.setAlert(result);
        return result
      }));
  }

  rejectUserFromStudy(value:any) {
    return this.http.patch(this.url + '/api/reject',value);

  }
}
