import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {QuestionService} from "../../_services/question.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService, AuthenticationService} from '../../_services';
import {BaseComponent} from "../../share/base/base.component";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent extends BaseComponent implements OnInit {

  public loginForm: any = FormGroup
  showCancelButton = false;
  incorrectLoginDetails: any;
  submitted = false;
  private loading: boolean = false;
  private error: any = false;
  private id: string = ''
  public username: string = ''
  showEmail: boolean = false;
  showEmailKeepMeLoggedInBtn: boolean = true;
  showSignInBtn: boolean = false;
  showConfirmBtn: boolean = false;
  otpRequired: boolean = false;
  otpRecoveryCode: boolean = false;
  public recoveryCodeValue: any = [];
  chk = ''

  constructor(public alertS: AlertService, private fb: FormBuilder, private qs: QuestionService, private route: ActivatedRoute,
              private router: Router, private authenticationService: AuthenticationService) {
    super(alertS)

  }

  ngOnInit() {
    this.otpRequired = false
    this.authenticationService.getTwoFactorRequired().subscribe((data) => {

      if (data) {
        this.otpRequired = true
      }
    })
    localStorage.removeItem('portId');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('severUrl');

    this.scrollToTop()
    this.loginForm = this.fb.group({
      email: ['admin@example.com', Validators.required],
      password: ['_Password123!', Validators.required],
      otp: [''],
      sword: [''],
      paymentLink: [''],
      recovery_code: ['', this.recoveryCodeValue]
    });
    this.route.queryParams.subscribe(params => {
      if (params['link_id']) {
        this.id = params['link_id']
        this.checkPaymentLink()
      } else {
        this.showSignInBtn = true;
        this.showEmail = true;
      }
      // (+) converts string 'id' to a number
      // console.log(this.id)

    });


  }

  checkPaymentLink() {
    this.authenticationService.checkPaymentLink(this.id).subscribe((data: any) => {
      if (data['data']['createPasswordLogin']) {
        this.f.email.setValue(data['data']['email'])
        this.showEmail = false
        this.showSignInBtn = false
        this.showConfirmBtn = true

        this.username = data['data']['email']
        this.f.paymentLink.setValue(this.id)
      }
    })
  }


  get f() {
    return this.loginForm.controls;
  }


  onCheckOTPStatus() {


    if (+this.f.otp.value.length < 6) {
      this.otpRequired = true;
      return false;
    } else {
      this.otpRequired = false
      return this.onSubmit()


    }
  }

  onCheckRecoveryStatus() {


    if (+this.f.recovery_code.value.length < 10) {
      this.otpRecoveryCode = true
      return false;
    } else {

      this.onSubmit()
      return true;
    }
  }

  onSubmit() {


    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.submitted = true;
      return;
    }
    this.loading = true;
    if (!this.id) {
      this.authenticationService.login(this.f.email.value, this.f.password.value, this.f.otp.value, this.f.recovery_code.value).subscribe((data: any) => {
        this.otpRequired = false
        const url_redirect = data; // e.g ../admin/data-analytics
        this.authenticationService.setTwoFactorRequired(false)
        this.router.navigate([url_redirect])

      });
    }

    if (this.id) {
      this.authenticationService.loginWithLink(this.id, this.f.password.value).subscribe((data: any) => {
        // const url_redirect = data; // e.g ../admin/data-analytics
        const url_redirect = data;
        this.router.navigate([url_redirect])
      });
    }
  }

  onSubmitWithLink() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.submitted = true;
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value, this.f.otp.value, this.f.otp.recovery_code.value).subscribe((data: any) => {
      const url_redirect = data; // e.g ../admin/data-analytics
      this.otpRequired = false
      this.router.navigate([url_redirect])
    });
    // error => {
    //   this.incorrectLoginDetails = true;
    //   this.error = error;
    //   this.loading = false;
    // });
  }

  scrollToTop() {
    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
  }

  userRecoveryCode() {
    this.otpRecoveryCode = true
  }
}
