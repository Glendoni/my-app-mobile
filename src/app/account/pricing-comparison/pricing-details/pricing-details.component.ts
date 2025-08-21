import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pricing-details',
  templateUrl: './pricing-details.component.html',
  styleUrls: ['./pricing-details.component.css']
})
export class PricingDetailsComponent implements OnInit{

  @Input() pkg: any;
  @Output() backToList = new EventEmitter<any>()
  public userEmail: string ='';
  showPayment: boolean = false;
  toggleNotices: boolean = false;
  public pkgProductPricingId: any;
  ngOnInit() {
    console.log(this.pkg)
  this.pkgProductPricingId = this.pkg['pricing']['productPriceId']
    const user = localStorage.getItem('currentUser')
    let obj = JSON.parse(JSON.stringify(user))??{};

    var email =JSON.parse(obj).email
    console.log(encodeURIComponent(email))
  //  this.userEmail =  email
    this.userEmail = encodeURIComponent(email)
  }


onBackToListing(){

  this.backToList.emit();
}

  onGoToPayment(){
    this.showPayment = true;
}
onToggleNotices(value:boolean){

    this.toggleNotices = value
}
}
