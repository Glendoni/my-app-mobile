import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-private-policy',
  templateUrl: './private-policy.component.html',
  styleUrls: ['./private-policy.component.scss']
})
export class PrivatePolicyComponent {constructor(private translate : TranslateService) {
  translate.setDefaultLang('en')
}
}
