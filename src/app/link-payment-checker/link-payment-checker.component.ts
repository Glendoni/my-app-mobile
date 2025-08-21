import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../_services";

@Component({
  selector: 'app-link-payment-checker',
  templateUrl: './link-payment-checker.component.html',
  styleUrls: ['./link-payment-checker.component.scss']
})
export class LinkPaymentCheckerComponent implements OnInit{
  paramsSubscription:any = Subscription;
  id: string ='';
  showForm:boolean = false
  submitted:boolean =false
  showFormSuccess:boolean =false
  public paymentLoginForm: any = FormGroup
  constructor(private fb: FormBuilder,protected route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  confirmPasswordClass = 'form-control';
  password = new FormControl('', [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);
  confirmPassword = new FormControl('', [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['link_id']; // (+) converts string 'id' to a number

      this.paymentLoginForm = this.fb.group({
        password: this.password,
        confirmPassword: this.confirmPassword,
        paymentLink: [this.id, Validators.required]
      },
        {
          validator: this.ConfirmedValidator('password', 'confirmPassword'),
        });

    });
     this.checkLink(this.id)

  }
  get f() {
    return this.paymentLoginForm.controls;
  }
  checkLink(id:string){

    this.authenticationService.linkChecker(id).subscribe((data:any) => {

      if(data['success']){
        this.showForm =true
      } else{
        this.showForm =false
          this.router.navigate(['/auth'])
            .then(() => {
              window.location.reload();
            });
      }
      console.log(data['success'])
      // if(data['data']['message'] == 'redirect'){
      //   this.router.navigate(['/auth'])
      //     .then(() => {
      //       window.location.reload();
      //     });
      // }else{
      // }
    })
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


  onSubmit(){
    if (this.paymentLoginForm.invalid) {
      this.submitted = true;
      return;
    }
    this.authenticationService.linkCheckerConfirm(this.paymentLoginForm.value).subscribe((data) =>{
this.showFormSuccess = true
this.showForm = false

  this.onNavToAuth()
    })
  }

  onNavToAuth(){
    this.router.navigate(['/auth'])
      .then(() => {
        window.location.reload();
      });
  }
}
