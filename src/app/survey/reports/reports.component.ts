import {Component, Input, HostListener, Inject, ViewChild, ElementRef} from '@angular/core';
import {QuestionService} from "../../_services/question.service";
import {ReportsService} from "../../_services/reports.service";
import {toArray} from "rxjs";
import {DeviceDetectorService} from "ngx-device-detector";
import {consolidateMessages} from "@angular/localize/tools/src/extract/translation_files/utils";
import * as htmlToImage from "html-to-image";
import {DOCUMENT} from "@angular/common";


interface BigObject<T> {
  [data: string]: T
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  @ViewChild("downloadEl") downloadEl!: ElementRef<HTMLBodyElement>
  @Input() studyInfo: any = [];
  p: number = 1;
  pageItems: number = 1;
  showEdit: boolean = false;
  addQuestion: boolean = false;
  showDetails: boolean = false;
  showDashboard: any;
  question: any;
  showAddQuestion: boolean = false
  filterChartToggle: boolean = true
  filterChartToggleIcon: boolean = false
  fullScreenPadding: string = ''
  barChart: boolean = false
  isFullScreen: boolean = true
  chartShow: boolean = false
  public result: any = []
  public resultOriginal: any = []
  public categories: any = []
  public storeFilterSelectionArr: any = []
  public categoryList: any = []
  public resultList: any = []
  public filterInfo: any = []
  public resultCnt: number = 0
  title: string = '';
  public study: object = []
  public filteredDates: object = []
  categoryFilter: any
  showInfoIcons: boolean = false
  showHideComments: boolean = true
  showHideCommentsDefault: boolean = true

  public which: any = '';
  public keyCode: any = '';
  public hideFilterIcon: boolean = false;
  public noQuestionsMsg: boolean = false;
  public showAverages: boolean = false;

  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: any) {
    if (event.keyCode == 27) {
      this.isFullScreen = true;
      this.fullScreenPadding = ''
    }

    if (event.keyCode == 39 || event.keyCode == 40) {
      this.showQuestionRp(1);
    }
    if (event.keyCode == 37 || event.keyCode == 38) {
      this.showQuestionRpMinus(-1);
    }
    event.stopPropagation();

    this.which = event.which;
    this.keyCode = event.keyCode;
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: any) {
    const e = <KeyboardEvent>event;
    const charCode = e.which ? e.which : e.keyCode;
    if (
      (charCode > 31 && (charCode < 48 || charCode > 57) && charCode < 96) ||
      charCode > 105
    ) {
      return false;
    }
    return true;
  }

  constructor(private qs: QuestionService, private rs: ReportsService, private deviceService: DeviceDetectorService, @Inject(DOCUMENT) private coreDoc: Document) {

  }

  ngOnInit() {


    this.p =1
    this.filterChartToggle = this.deviceService.isTablet() ?? false;
    if (localStorage.getItem(this.studyInfo.settings.study_id + 'InfoIcons')) {
      this.showInfoIcons = true;
    }

    this.filterResults()
    this.study = this.studyInfo.study;
    this.qs.getShowDashboard().subscribe((value) => {
      if (value) {
        this.addQuestion = false
        this.showEdit = false
        this.title = ''
      }
    })

    this.qs.getChartReportPagination().subscribe((data) => {
      this.showAverages = false
      this.filterChartToggle = true
      this.p = data
    });

    this.rs.getFiltercat().subscribe((data) => {
     this.showAverages = false
      if (!this.categoryList.length) {
        this.filterChartToggleIcon = false
      } else if (data.length < this.categoryList.length) {
        this.filterChartToggleIcon = true
      } else {
        this.filterChartToggleIcon = false
      }

      if (data.length) {
        this.categoryFilterChart(data)
      }
    })

    this.rs.getShowComment().subscribe((data) => {
      this.showHideComments = data
      this.showHideCommentsDefault = data
    })

    this.rs.getFilterDates().subscribe((data) => {
      this.filteredDates = data
    })
  }

  onToggle(item: any): any {
    this.showEdit = true
    this.title = item.name
    this.question = item.name
    this.showAddQuestion = false
  }

  filterResults() {
    this.noQuestionsMsg = false;
    this.rs.getQuestionReportFilter(this.studyInfo.settings.study_id, this.categoryFilter, this.filteredDates).subscribe((data: any) => {
      this.rs.setCategoryList(data['allCategories'])

      if(!data['report'].length){

        this.noQuestionsMsg = true;
      }


      this.result = data['report']
      this.resultCnt = data['reportCnt']
      this.resultOriginal = data['report']
      this.chartShow = true
      this.barChart = true
      this.showEdit = true
      this.resultList = data['report']
      const originalCategories = data['categories']
      this.categories = originalCategories
      this.categoryList = originalCategories
      this.filterChartToggleIcon = data['filterIsSet']
      this.filterInfo = data;
    })
  }




  changed(value: any) {
    this.pageItems = value;
  }

  storeFilterSelection($event: any) {
    this.rs.getStoreFilterSelection().subscribe((data) => {
      this.storeFilterSelectionArr = data
    })
  }

  categoryFilterChart(category: any) {
    this.categoryFilter = []
    this.categoryFilter.push(category)
    this.filterResults();
  }

  filterSelection() {
    if (this.categoryFilter.length) {
    }
  }

  filterSelectionReset() {
    this.categoryFilter = [];
    if (!this.categoryFilter.length) {
      this.categoryFilter = [];
      this.result = this.resultList
      this.categories = this.categoryList
    }
  }

  uniqueArray3(a: any) {
    function onlyUnique(value: any, index: any, self: any) {
      return self.indexOf(value) === index;
    }

    var unique = a.filter(onlyUnique); // returns ['a', 1, 2, '1']
    return unique;
  }

  toggleFilter() {
    this.showAverages = false;
    this.filterChartToggle = this.filterChartToggle ? false : true
  }

  public openOrangeFullscreen() {
    this.isFullScreen = this.isFullScreen ? false : true

    this.hideShowInfoIcons()
    this.closeFullscreen()
    var elem: any = document.getElementById("orange");

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }

  }

  public closeFullscreen() {

    this.fullScreenPadding = ''


    if (this.isFullScreen == true) {
      // this.showHideComments =this.showHideCommentsDefault
      this.fullScreenPadding = ''
      if (document.exitFullscreen) {

        document.exitFullscreen();
      }
    } else {
      this.showHideComments = false
      this.fullScreenPadding = 'fullScreenPaddingToggle'

      this.isFullScreen = false
    }
  }

  // const code = event.keyCode || event.which;
  // if(code === 51 || Number(code) === 55) {
  // if (!e.shiftKey) {
  //   return false;
  // }
  // } else {
  //   return true;
  // }
  // e.preventDefault();
  // e.stopPropagation();
  downloading: any;

  enterHandler() {
    alert('Enter pressed!');
  }

  escHandler() {
    alert('ESC pressed!');
  }

  shiftFHandler() {
    alert('Shift+F pressed!');
  }

  showQuestionRp(i: number) {
    // this.pageQuestion.emit(i);
    if (this.resultCnt != this.p) {
      this.qs.setChartReportPagination(this.p + i)
    }
  }

  showQuestionRpMinus(i: number) {
    // this.pageQuestion.emit(i);
    if (this.p != 0) {
      this.qs.setChartReportPagination(this.p + i)
    }
  }

  hideShowInfoIcons() {
    this.showInfoIcons = true;
  }

  neverShowInfoIcons() {
    localStorage.setItem(this.studyInfo.settings.study_id + 'InfoIcons', 'true')
    this.showInfoIcons = true;
  }

  onShowHidecoments($event: boolean) {
    //console.log(this.showHideComments?'I wont show':'I will show')
    //this.showHideComments = this.showHideComments??false
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

  onSaveChartClicked(): void {

    this.hideFilterIcon = true;
    this.downloading = 'copying...'
    setTimeout(() => this.downloadChart(), 3500)

  }

  downloadChart() {

    const theElement = this.downloadEl.nativeElement;
    // svg.saveSvgAsPng(theChart, "the-file.png", { scale: 4.0 });

    htmlToImage.toPng(theElement).then(chart => {
      this.downloadDataUrl(chart, "peeker-pro-chart.png");
    });
    this.downloading = ''
    this.hideFilterIcon = false;
  }

  dismiss() {

  }

  onAverage() {
    this.filterChartToggleIcon = false
    this.filterChartToggle = false

    if(this.showAverages){
      this.showAverages =false;
      this.toggleFilter()

    }else{
      this.showAverages =true;
    }



  }
}
