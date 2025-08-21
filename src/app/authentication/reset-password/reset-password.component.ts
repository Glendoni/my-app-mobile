import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../_services";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{


  public resetForm: any = FormGroup
  passwordsMatching:boolean = false;
  submitted:boolean = false;
  isConfirmPasswordDirty:boolean  = false;
  confirmPasswordClass = 'form-control';
  password = new FormControl('_Password123!', [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);
  confirmPassword = new FormControl('_Password123!', [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);

  model = {
    password: {
      type: "text",
      value: "",
      label: "Reset Password",
      rules: {
        required: true,
      }
    },
    c_password: {
      type: "text",
      value: "",
      label: "Confirm Password",
      rules: {
        required: true,
      }
    }
  }

  constructor(private fb: FormBuilder,protected route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    this.resetForm = this.fb.group({
        password: this.password,
        confirmPassword: this.confirmPassword,
      },
      {
        validator: this.ConfirmedValidator('password', 'confirmPassword'),
      });
  }

  get f() {
    return this.resetForm.controls;
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      // if (
      //   matchingControl.errors &&
      //   !matchingControl.errors['confirmedValidator']
      // ) {
      //   return;
      // }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  submit(event:any){
    console.log(event)
  }

  onSubmit(){
    if (this.resetForm.invalid) {
      this.submitted = true;
      return;
    }
    console.log(this.resetForm.value)
    }
}
