import {Component, OnInit} from '@angular/core';
import {StripeService} from "../../_services/stripe.service";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit{

  invoice:any =[]
  showSpinner:string= 'show-spinner';
  constructor(private stripeService:StripeService) {
  }

  /**
   * show message if invoice is unavailable
   */
  ngOnInit() {
    this.stripeService.getLatestInvoice().subscribe((data:any)=>{
      this.showSpinner =  ''
      this.invoice = data
    })
  }
}
