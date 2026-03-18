import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../_services";
import {data} from "autoprefixer";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  @Output() dismiss = new EventEmitter;
  public resetForm: any = FormGroup
  public resetFormId: any = FormGroup
  passwordsMatching: boolean = false;
  submitted: boolean = false;
  isConfirmPasswordDirty: boolean = false;
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
  public loading: boolean = false;
  public resetPasswordShow: boolean = false;
  public codeIdInvalid: string = '';
  public forbidden: string = '';
  public disableResetButton: boolean = false;
  public disableResetCodeButton: boolean = false;
  constructor(private fb: FormBuilder, protected route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {



    this.resetForm = this.fb.group({
        email: ['', Validators.required],
      },
      {});

    this.resetFormId = this.fb.group({
        resetId: ['', Validators.required],
      },
      {});
  }

  get f() {
    return this.resetForm.controls;
  }

  get frid() {
    return this.resetFormId.controls;
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
        matchingControl.setErrors({confirmedValidator: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  submit(event: any) {
  }

  onSubmit() {


    if (this.resetForm.invalid) {
      this.submitted = true;
      return;
    }
this.disableResetButton = true

    this.authenticationService.forgottenPassword(this.resetForm.value).subscribe((data: any) => {
      //   this.resetPasswordShow = true
      this.loading = true;
      this.resetPasswordShow = true

    }, (error: any) => {
      if (error.error.data.error) {
        this.forbidden = error.error.data.error
      }

      if (error.error.data.email[0]) {
        this.forbidden = error.error.data.email
        this.disableResetButton = true
      }

      console.log(error.error.data.error)
    });
  }

  onResetPasswordCancel() {
    this.dismiss.emit(true)
  }

  onSubmitIdChecker() {
    this.submitted = true
    if (!this.resetFormId.valid) {
      return;
    }
    this.disableResetCodeButton = true
    this.authenticationService.resetPasswordTokenChecker(this.resetFormId.value['resetId']).subscribe((data) => {
       window.open("/../../reset-password-checker?id="+data.data.host, "_self");
    }, (error) => {
      this.disableResetCodeButton = false
      this.codeIdInvalid = error.error.data['error']
    })
  }
}
