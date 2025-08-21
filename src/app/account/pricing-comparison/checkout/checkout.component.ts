import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {PaymentServiceService} from "../../../_services/payment-service.service";

import {Data, IPreparePyamentRequest} from '../../../data';
import {AuthenticationService} from "../../../_services";
import {color} from "chart.js/helpers";


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {
  @Input() pkgProductPricingId: any;
  private stripe: any;
  private clientSecret: any;
  private elements: any;
  payment: any = {openStripe: false};
  intentBtn: boolean = true;
  public url: any = ''
  toggleNotices: boolean = false;
  private amount: any;
  private registeredAccountEmail: any;
  public adminUrl: any;

  constructor(
    private cd: ChangeDetectorRef,
    private paymentService: PaymentServiceService,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {

    const user = localStorage.getItem('currentUser')
    let obj = JSON.parse(JSON.stringify(user)) ?? {};
    var details = JSON.parse(obj).adminUrl
    this.paymentService.getProductPrice(this.pkgProductPricingId).subscribe((data: any) => {
      this.amount = data
      this.invokeStripe();
    })

    this.url = details.adminUrl
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://js.stripe.com/v3/';
      script.onload = () => {
        this.stripe = (<any>window).Stripe("pk_test_c7IemBJyLvATvAbbuIGAw3u500XisTBSlv");
      };
      window.document.body.appendChild(script);
    }
    this.preparePayment('querty')
  }

  preparePayment(id: any) {
    const data: IPreparePyamentRequest = {amount: this.amount};

    this.payment = {openStripe: true, amount: this.amount}
    this.paymentService.preparePayment(data, this.pkgProductPricingId).subscribe((res: any) => {
      console.log(res)
      this.intentBtn = false
      this.clientSecret = res.clientSecret;
      this.amount = res.amount;
      this.adminUrl = res.adminUrl;
      this.registeredAccountEmail = res.registeredAccountEmail
      this.initialize();
    });
  }

  async initialize() {

    this.payment = {openStripe: true, amount: this.amount}
    let emailAddress = 'admin@example.com';
    const clientSecret = this.clientSecret;
    const appearance = {
      theme: 'flat',
      rules: {
        '.Tab': {
          backgroundColor: '#b6b6b6',
          border: '1px solid #E0E6EB',
          boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)',
        },
        '.Tab:hover': {
          backgroundColor: '#216490',
          color: '#ffffff',
        },

        '.Tab--selected': {
          backgroundColor: '#216490',
          borderColor: '#E0E6EB',
          boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02), 0 0 0 2px var(--colorPrimary)',
        }
      },
      variables: {
        colorPrimary: '#0570de',
        colorBackground: '#ffffff',
        colorText: '#30313d',
        colorDanger: '#df1b41',
        fontFamily: 'Ideal Sans, system-ui, sans-serif',
        spacingUnit: '2px',
        borderRadius: '4px',
        tab: '#30313d'
        // See all possible variables below
      }
    };
    this.elements = this.stripe.elements({appearance, clientSecret});
    const linkAuthenticationElement =
      this.elements.create('linkAuthentication');
    linkAuthenticationElement.mount('#link-authentication-element');
    linkAuthenticationElement.on('change', (event: any) => {
      emailAddress = event.value.email;
    });
    const paymentElementOptions = {
      layout: 'tabs',
    };
    const paymentElement = this.elements.create(
      'payment', {
        fields: {
          customer: 'customer@example.com',
          billingDetails: {

            // No address field will be collected in any of the payment method forms
            // address: 'never',
          }
        },
        paymentElementOptions,

      });


    paymentElement.mount('#payment-element');
  }

  async makePayment() {
    let elements = this.elements;
    const res = await this.stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: this.adminUrl + '/stripe-success',
        receipt_email: this.registeredAccountEmail,
      },
    });
    // this.notificationHandlerService.showNotification(
    //   'error',
    //   'Error',
    //   res.error.message
    // );
  }

  onToggleNotices(value: boolean) {

    this.toggleNotices = value
  }
}
