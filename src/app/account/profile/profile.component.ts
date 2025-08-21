import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService, AuthenticationService} from "../../_services";

import {BaseComponent} from "../../share/base/base.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends BaseComponent implements OnInit {
  public submitted: boolean = false;
  public profileForm: any = FormGroup

  constructor(private fb: FormBuilder, public alertS: AlertService, private authService: AuthenticationService) {
   super(alertS)

  }

  password = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);
  confirmPassword = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);


  ngOnInit() {


    this.profileForm = this.fb.group({
        old_password: ['',Validators.required],
        password: [''],//this.password,
        confirmPassword: [''] //this.confirmPassword,
      },
      {
        validator: this.confirmedValidator('password', 'confirmPassword'),
      });
  }

  get f() {
    return this.profileForm.controls;
  }

  onUpdate() {

  }

  confirmedValidator(controlName: string, matchingControlName: string) {
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

  onResetPassword(){

    if (!this.profileForm.valid) {
      this.submitted = true
      console.log(this.profileForm.value)
    } else {
      this.submitted = true


      this.authService.changePassword(this.profileForm.value).subscribe((data) => {
        console.log(data)

      }),
        (error:any) => {

          // This block will only execute if catchError is used
          console.error('Error handler:', error);
        }

      //console.log(this.profileForm.value)
    }

  }
}


