import {Component, Input, OnInit, Inject, ElementRef, ViewChild} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import * as htmlToImage from "html-to-image";

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {
  @ViewChild("downloadEl") downloadEl!: ElementRef<HTMLBodyElement>
  @Input() studyInfo: any = [];

  constructor(@Inject(DOCUMENT) private coreDoc: Document) {
  }


  public qrCodeImg: any;
  url: string = 'http://google.com'
  copyShareLink: boolean =false;

  ngOnInit() {
    this.setQrUrl(this.studyInfo['qrPublicLink'])
  }

  onSaveChartClicked(): void {
    const theElement = this.downloadEl.nativeElement;
    // svg.saveSvgAsPng(theChart, "the-file.png", { scale: 4.0 });
    var filePrefix = this.studyInfo['study']['name'].replace(" ", "_").toLowerCase()
    htmlToImage.toPng(theElement).then(dataUrl => {
      this.downloadDataUrl(dataUrl, filePrefix + "_qr_code_image_file.png");
    });
  }

  downloadDataUrl(dataUrl: string, filename: string): void {
    // if (typeof this?.coreDoc === 'undefined') {
    //   throw new Error(
    //     'A document must be specified. Are you avoiding namespace conflicts using fat arrow functions?'
    //   );
    // }
    var a = this.coreDoc.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    this.coreDoc.body.appendChild(a); //Firefox requires link to be in body
    a.click();
    this.coreDoc.body.removeChild(a);
  }

  setQrUrl(url: string) {
    this.url = url
  }
  copyText(value: string) {
    navigator.clipboard.writeText(value).then(() => {
     this.copyShareLink = true;
      setTimeout(() => {
        this.copyShareLink = false;
      }, 4000);

      //copyShareLink
     // console.log('Text copied to clipboard');
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }
}
