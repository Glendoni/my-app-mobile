import {Component, Input, OnInit} from '@angular/core';
import { DomSanitizer,SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-svg-img',
 templateUrl: './svg-img.component.html',
  styleUrls: ['./svg-img.component.css']
})
export class SvgImgComponent implements OnInit{

  @Input() svgimg: string = "";
  htmlVar: SafeHtml ='';
  imgsvg:string = ''
  constructor(private _sanitizer: DomSanitizer) {

  }



   ngOnInit() {
     this.htmlVar = this._sanitizer.bypassSecurityTrustHtml(this.svgimg)
this.imgsvg =this.svgimg
     console.log(this.imgsvg)
   }
}
