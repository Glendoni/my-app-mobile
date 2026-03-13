import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {QuestionService} from "../../_services/question.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../_services";
import {Subscription} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-reset-password-link-checker',
  templateUrl: './reset-password-link-checker.component.html',
  styleUrls: ['./reset-password-link-checker.component.scss']
})
export class ResetPasswordLinkCheckerComponent {

  public loginForm: any = FormGroup
showCancelButton = false;
incorrectLoginDetails: any;

private loading: boolean = false;
public resetPasswordShow: boolean = false;
private error: any = false;
paramsSubscription:any = Subscription;
id: string ='';
submitted:boolean =false
  resetPasswordShowSuccess:boolean =false;
   resetPasswordShowLinkExpiredMsg: string = '';
constructor(private fb: FormBuilder, private qs: QuestionService, private route: ActivatedRoute,
  private router: Router, private authenticationService: AuthenticationService,  private trasnslate : TranslateService) {
  trasnslate.setDefaultLang('en')
}
  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  confirmPasswordClass = 'form-control';
  passwords = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);
  confirmPasswords = new FormControl(null, [
    (b: AbstractControl) => Validators.required(b),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);
ngOnInit() {
  this.paramsSubscription = this.route.queryParams.subscribe(params => {
    this.id = params['id']; // (+) converts string 'id' to a number

    this.checkLink(params['id'])
  });

  this.loginForm = this.fb.group({
      token: ['', Validators.required],
      password: this.passwords,
      confirmPassword:this.confirmPasswords,

    },
    {
      validator: this.ConfirmedValidator('password', 'confirmPassword'),
    });
}

get f() {
  return this.loginForm.controls;
}

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

onSubmit() {

  //console.log('On submit entry')
  // stop here if form is invalid
  this.submitted = true;
  if (!this.loginForm.valid&& this.loginForm.invalid) {

    return;
  }

  this.loading = true;
  this.authenticationService.resetPassword(this.loginForm.value).subscribe((data: any) => {
  console.log(data)
    this.resetPasswordShow =false
    this.resetPasswordShowSuccess =true
    //  this.router.navigate(['/auth'])
  },
    (error: any) => {
    this.incorrectLoginDetails = true;
    this.error = error;
    this.loading = false;
  });
}

checkLink(id:string){

  console.log(id)
  this.authenticationService.resetPasswordTokenChecker(id).subscribe((data:any) => {
console.log(data['data']['token'])
    if(!data){
    console.log('i am legend')

      this.resetPasswordShowLinkExpiredMsg =''
      this.resetPasswordShow =false
      this.resetPasswordShowSuccess =false

    }else{
      this.resetPasswordShowLinkExpiredMsg =''
      this.resetPasswordShow =true
      this.resetPasswordShowSuccess =false
    }
    this.f.token.setValue(data['data']['token'])
    // if(  !data[0].user_is_registered){
    //   this.router.navigate(['/auth'])
    // }else{
      // console.log(data)
    // }
  }, (error: any) => {
    console.log(error['error']['data'])
    this.resetPasswordShowLinkExpiredMsg =error['error']['data']['error']
    //  this.alertS.setAlert(error)
  });
}

  backToLogin() {
    this.router.navigate(['/auth'])
      .then(() => {
      //  window.location.reload();
      });

  }
}

