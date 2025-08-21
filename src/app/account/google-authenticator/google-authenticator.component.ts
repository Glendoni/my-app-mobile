import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService, UserService} from "../../_services";

@Component({
  selector: 'app-google-authenticator',
  templateUrl: './google-authenticator.component.html',
  styleUrls: ['./google-authenticator.component.css']
})
export class GoogleAuthenticatorComponent {

  public google2Fa: any = FormGroup
public otpValue = false;
public recoveryCodes:any[] =  [];
public recoveryCodeValue:string = ''
public qrCodeSvg:string = ''
public showRecoveryCodePrompt:boolean = false
  constructor(private fb: FormBuilder, private us: UserService, private authenticationService: AuthenticationService) {

    this.google2Fa = this.fb.group({
      otp:['', this.otpValue]
    })

    // this.authenticationService.getTwoFactorRequired().subscribe((data)=>{
    //
    //  // this.otpValue =data??false
    // })

    this.us.getUserQrCodeSvg().subscribe((data:any)=>{
      this.qrCodeSvg = data['qrCodeSvg']??null
      this.otpValue = data['required_two_factor']??false
this.recoveryCodes = data['recoveryCodes'][0]
      console.log( data['recoveryCodes'][0])
    })
  }

  onUpdateOtp() {

    this.otpValue = this.otpValue?false:true

    if(this.otpValue) {
      this.us.getRecoveryCodes().subscribe((data: any) => {

      // this.recoveryCodes = data
        console.log(data)
      })
    }else {
      this.us.disableTwoFactor().subscribe((data: any) => {

        console.log(data)

      })

    }

    console.log(this.otpValue )


  }

  onDeactivate() {

  this.us.deactivateQrCodeRequirement().subscribe((data) =>{
   this.authenticationService.setTwoFactorRequired(false)
    this.otpValue =  false;
  })
  }

  onActivate() {
    this.us.activateQrCodeRequirement().subscribe((data) =>{
      this.authenticationService.setTwoFactorRequired(true)
      this.otpValue =  true;
      this.showRecoveryCodePrompt = true
    })

  }

  onSave() {

  }

  regenerateRecoveryCodes() {

    if(this.otpValue) {
      this.us.getNewRecoveryCodes().subscribe((data: any) => {
        this.recoveryCodes = data
        console.log(data)
      })
    }
  }
}
