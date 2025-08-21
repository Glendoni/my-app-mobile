import {Component, OnInit} from '@angular/core';
import {PricingService} from "../../_services/pricing.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-pricing-comparison',
  templateUrl: './pricing-comparison.component.html',
  styleUrls: ['./pricing-comparison.component.css']
})
export class PricingComparisonComponent implements OnInit{
packages:any = []
  showDetail=false
  showSubscriptionDetail:boolean=false
  public pkg: any;
public packageItem:any
  constructor(private pricing: PricingService) {

  }
  ngOnInit() {


   // console.log(this.route.snapshot.paramMap.get('pricing'))
    this.pricing.getPricing().subscribe((data:any) =>{
      this.packages  = data
    })
  }

  showDetails(packageElement: any) {
this.scrollToTop()
    this.pricing.getPricingDetails(packageElement).subscribe((data) =>{
      console.log(data)
      this.packageItem = data
      this.showDetail = true
    })
  }

  showSubscriptionDetails(packageElement: any) {
this.scrollToTop()
    this.pricing.getSubscriptionDetails(packageElement).subscribe((data) =>{
      console.log(data)
      this.packageItem = data
      this.showSubscriptionDetail = true
    })
  }

  backToList() {
    this.scrollToTop()
   this.showSubscriptionDetail = false
   this.showDetail = false
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

}
