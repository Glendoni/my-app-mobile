import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base/base.component';


@NgModule({
  declarations: [
    BaseComponent
  ],
  exports: [
    BaseComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ShareModule { }
