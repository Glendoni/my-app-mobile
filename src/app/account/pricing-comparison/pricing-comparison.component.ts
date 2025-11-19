import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PricingService} from "../../_services/pricing.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-pricing-comparison',
  templateUrl: './pricing-comparison.component.html',
  styleUrls: ['./pricing-comparison.component.css']
})
export class PricingComparisonComponent implements OnInit, AfterViewInit {
  packages: any = []
  showDetail = false
  showSubscriptionDetail: boolean = false
  public pkg: any;
  public packageItem: any
  private downgradeMsg: any = [];

  constructor(private pricing: PricingService) {

  }

  ngOnInit() {
    // console.log(this.route.snapshot.paramMap.get('pricing'))
    this.pricing.getUserWebLink().subscribe((data: any) => {
      console.log(data)
    })
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

  ngAfterViewInit() {

    var header = document.getElementById("myHeader");
    var sticky = 790;

    function myFunction() {
      if (window.scrollY > sticky) {
        if (header != null) {
          header.classList.add('sticky');
        }
      } else {
        if (header != null) {
          header.classList.remove("sticky");
        }
      }
    }

    window.onscroll = function () {
      myFunction()
    };
  }
}

