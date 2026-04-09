import { Component, OnInit, Input } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService, AuthenticationService, StudyService} from "../../_services";


@Component({
  selector: 'app-social-follow',
  templateUrl: './social-follow.component.html',
  styleUrls: ['./social-follow.component.css']
})
export class SocialFollowComponent implements OnInit{
//@Input() studyDetails:any
  public socialForm: any = FormGroup
  showSocialForm:boolean =true
  public studyDetails:any
  submitted:boolean= false;
  spinner:boolean= true;
  constructor(private fb: FormBuilder,
              public alertS: AlertService,
              private authService: AuthenticationService,
              private studyService: StudyService) {
  }

  ngOnInit() {
    this.getSocials()
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    const regWhatsApp = '^\\+?[1-9]\\d{7,14}$';
    this.socialForm = this.fb.group({
      weblink: ['',  [Validators.pattern(reg)]],
      facebook: ['',  [Validators.pattern(reg)]],
      instagram: ['',  [Validators.pattern(reg)]],
      linkedin: ['',  [Validators.pattern(reg)]],
      pinterest: ['',  [Validators.pattern(reg)]],
      youtube: ['',  [Validators.pattern(reg)]],
      whatsapp: ['',  [Validators.pattern(regWhatsApp)]],
      });
  }

 private setSocials(studyDetails:any):void {

    this.sf.get('facebook').setValue(studyDetails['socials']['facebook']);
    this.sf.get('instagram').setValue(studyDetails['socials']['instagram']);
    this.sf.get('linkedin').setValue(studyDetails['socials']['linkedin']);
    this.sf.get('pinterest').setValue(studyDetails['socials']['pinterest']);
    this.sf.get('youtube').setValue(studyDetails['socials']['youtube']);
    this.sf.get('weblink').setValue(studyDetails['socials']['weblink']);
    this.sf.get('whatsapp').setValue(studyDetails['socials']['whatsapp']);

  }

  get sf() {
    return this.socialForm;
  }

  get f() {
    return this.socialForm.controls;
  }

  onUpdate() {
    this.submitted = true
    if(!this.socialForm.valid){
      return;
    }

    this.authService.socials(this.socialForm.value).subscribe((data) =>{
      this.showSocialForm = false
      setTimeout(() => this.showSocialForm = true, 3500)
    })
  }

  getSocials(){
   this.studyService.getStudySocials().subscribe((data:any) =>{
    if(data[0]['socials'] !==null){
      this.studyDetails =data[0]['socials']??[]
       this.setSocials(data[0])
    }
     this.spinner = false
   })
  }
}
