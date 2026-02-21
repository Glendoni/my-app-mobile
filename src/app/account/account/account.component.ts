import {Component} from '@angular/core';
import {QuestionService} from "../../_services/question.service";
import {AlertService, AuthenticationService, StudyService} from "../../_services";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  userDetails: any = []
  public surveyForm: any = FormGroup
  edit: boolean = false;
  showCancelButton = false;
  disabled: boolean = true;
  state = false;
  url: string = ''
  //url:any = 'http://localhost:4200';
  public qrCodeImg: any;
  public submitted: boolean = false;
  public isVisible: boolean = false;
  public globalShow: boolean = true;
  public profileShow: boolean = false;
  public pricing: boolean = false;
  status: string = 'alert';
  public notificationMessage: any = ''
  public twoFa: boolean = false;
  create: boolean = true;
  invoice: boolean = false;
  public showNewUserWelcomeMgs: boolean = false;
  public userFirstName: string = '';
  private userEmail: any;
  public userPhone: number = 123;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private qs: QuestionService,
              private studyService: StudyService,
              public alert: AlertService,
              private deviceService: DeviceDetectorService) {
    this.isVisible = false;
    this.alert.getAlert().subscribe((data: any) => {
      if (data['error']) {
        this.status = 'alert-danger'
      }
      if (!data['error']) {
        this.notificationMessage = data['message'] ?? data
        data['message'] ? this.showAlert() : 'no'
        // this.router.navigate(['study'])
      }
    })

  }

  ngOnInit() {

    const locals = localStorage.getItem('currentUser') ?? ''
    const usr = JSON.parse(locals);
    this.userEmail = usr['email']
    this.userPhone = usr['phone']

    this.activatedRoute.queryParams.subscribe(params => {
      const id = this.route.snapshot.paramMap.get('mobileLogin');
      if (id == '9875-39287-3y75885993-488432774567-234') {
        this.onPricing()
        return
      }

      let date = params['pricing'];
      if (date == 'table') {
        this.onPricing()
      } else {

      }// Print the parameter to the console.
    });
    this.userDetails = localStorage.getItem('username') ?? null
    this.userFirstName = this.userDetails.split(' ')[0]
    this.surveyForm = this.fb.group({
      userName: [this.userDetails, [Validators.required, Validators.minLength(4)]],
      appName: ['', [Validators.required, Validators.minLength(6)]],
      contactNumber: [+this.userPhone, [Validators.required]],
      active: [true],
      part_joined: [false],
      study_created: [false],
      study_updated: [false],
      to: [this.userEmail, [Validators.required, Validators.email]],
      cc: ['', Validators.email],
      pause: [false],
    });

    if (this.deviceService.isMobile()) {

      this.profileShower()
    } else {
      this.getGlobalSettings()
    }


    // this.onInvoice()

  }


  onGlobalShow(event: Event) {
    this.profileShow = false
    this.globalShow = true
    this.pricing = false
    this.twoFa = false
    this.invoice = false
    this.highlight(event)
  }

  profileShower() {
    this.profileShow = true
    this.globalShow = false
    this.pricing = false
    this.twoFa = false
    this.invoice = false
  }

  onProfileShow(event: Event) {
    this.profileShow = true
    this.globalShow = false
    this.pricing = false
    this.twoFa = false
    this.invoice = false
    this.highlight(event)
  }


  getGlobalSettings() {
    console.log('add study')
    this.studyService.getGlobalSettings().subscribe((data: any) => {

      if (!data.length) {
        this.showNewUserWelcomeMgs = true;

      } else {
        this.showNewUserWelcomeMgs = false;
      }


      if (!this.showNewUserWelcomeMgs) {
        this.edit = true;
        const globe = data[0]
        this.f.userName.setValue(globe['userName'])
        this.f.appName.setValue(globe.appName)
        this.f.contactNumber.setValue(globe.contactNumber)

        this.f.active.setValue(globe.active)
        this.f.part_joined.setValue(globe.part_joined)
        this.f.study_created.setValue(globe.study_created)
        this.f.study_updated.setValue(globe.study_updated)
        this.f.to.setValue(globe.to)
        this.f.cc.setValue(globe.cc)
        this.f.pause.setValue(globe.pause)
        this.create = false
      } else {
        this.create = true
      }
    })

  }

  get f() {
    return this.surveyForm.controls;
  }

  onUpdate() {

    //console.log(this.surveyForm.value.active)
    //this.studyService.setGlobalActiveMode(this.surveyForm.value.active)

    this.submitted = true
    if (!this.surveyForm.valid) {
      return;
    } else {
      if (!this.edit) {
        this.studyService.globalSettings(this.surveyForm.value).subscribe((data: any) => {
          this.navigateToDashboard()
        })
      } else {
        this.studyService.globalSettingsUpdate(this.surveyForm.value).subscribe((data: any) => {
          this.navigateToDashboard()
        })
      }
    }
  }

  private navigateToDashboard() {
    this.router.navigate(['survey'])
  }

  private showAlert(): void {
    if (this.isVisible) {
      return;
    }

    this.isVisible = true;
    setTimeout(() => this.isVisible = false, 3500)
  }

  on2Fa(event: Event) {
    this.profileShow = false
    this.globalShow = false
    this.pricing = false
    this.create = false
    this.twoFa = true
    this.invoice = false
    this.highlight(event)
  }

  onInvoice(event: Event) {
    this.profileShow = false
    this.globalShow = false
    this.pricing = false
    this.create = false
    this.twoFa = false
    this.invoice = true
    this.highlight(event)
  }

  onPricing() {
    this.scrollToTop()
    this.profileShow = false
    this.globalShow = false
    this.twoFa = false
    this.pricing = true
    this.create = false
    this.invoice = false

  }


  upgrades(event: Event) {
    this.scrollToTop()
    this.profileShow = false
    this.globalShow = false
    this.twoFa = false
    this.pricing = true
    this.create = false
    this.invoice = false
    this.highlight(event)
  }


  scrollToTop() {
    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 1.02));
      }
    })();
  }

  removeAllHighlights() {
    const elements = document.querySelectorAll('.highlightGreen');
    elements.forEach(el => el.className = ''); // wipes all classes
  }

  highlight(event: Event) {
    this.removeAllHighlights();

    const element = event.target as HTMLElement;
    element.classList.toggle('highlightGreen', false);
    element.classList.toggle('highlightGreen');
  }
}
