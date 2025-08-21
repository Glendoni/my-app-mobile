import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PricingService} from "../../_services/pricing.service";
import {TranslateService} from '@ngx-translate/core';

@Component({
  standalone: false,
  selector: 'app-subscription-details',
  templateUrl: './subscription-details.component.html',

  styleUrls: ['./subscription-details.component.css']
})
export class SubscriptionDetailsComponent implements OnInit{

  @Input() pkg: any;
  @Output() backToList = new EventEmitter<any>()

  cancellationForm:any= FormGroup ;
  public userEmail: string ='';
  showPayment: boolean = false;
  unsubscribeSuccessMsg: boolean=false
  toggleNotices: boolean = false;
  submitted: boolean = false;
  showCancellationModal: boolean = false;
  showResumeModal: boolean = false;
public subTitleAction:string =''
  status:string=''

  public pkgProductPricingId: any;
  public showBtn: any = '';
  public showCancelPendingModal: boolean = false;

  constructor(private fb: FormBuilder,private pricing: PricingService, translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {

    this.cancellationForm = this.fb.group({
      reason: ['',[Validators.required]],
    });

    this.pkgProductPricingId = this.pkg['pricing']['productPriceId']
    const user = localStorage.getItem('currentUser')
    let obj = JSON.parse(JSON.stringify(user))??{};

    var email =JSON.parse(obj).email
    console.log(encodeURIComponent(email))
    //  this.userEmail =  email
    this.userEmail = encodeURIComponent(email)
  }

  get f() {
    return this.cancellationForm.controls;
  }

  onBackToListing(){

    this.backToList.emit();
  }

  onGoToPayment(){
    this.showPayment = true;
  }
  onShowCancellationModal(){
    this.subTitleAction = 'Cancel Subscription'
    this.unsubscribeSuccessMsg = false
    this.showCancellationModal  = true;
    this.showResumeModal = false;
    this.showCancelPendingModal  = false;

    //  cancel  resume
   // this.toggleNotices = value
  }

  onShowCancelPendingModal(){
    this.subTitleAction = 'Cancel Pending Subscription'
    this.unsubscribeSuccessMsg = false
    this.showCancellationModal  = false;
    this.showCancelPendingModal  = true;
    this.showResumeModal = false;

    //  cancel  resume
   // this.toggleNotices = value
  }

  onShowResumeModal(){
    this.subTitleAction = 'Resume Subscription'
    this.unsubscribeSuccessMsg = false
    this.showCancellationModal  = false;
    this.showCancelPendingModal  = false;
    this.showResumeModal = true;

    //  cancel  resume
   // this.toggleNotices = value
  }



  onCancelSubscription() {

    console.log('cancelling Subscription')
    console.log(this.cancellationForm.value)
    this.submitted =true
    if(this.cancellationForm.valid){
    console.log('cancelling Subscription')
    this.pricing.cancelSubscription(this.cancellationForm.value).subscribe((data:any)=>{
    this.unsubscribeSuccessMsg = true
      console.log(data)
    })
    }
  }

  onResumeSubscription() {

    this.pricing.resumeSubscription().subscribe((data:any)=>{
      console.log(data)
    })

  }

  onCancelPendingSubscription(product:string) {

    this.pricing.cancelPendingSubscription(product).subscribe((data:any)=>{
      console.log(data)
    })

  }

  onToggleNotices(value: boolean) {
    this.toggleNotices = value
  }
}

