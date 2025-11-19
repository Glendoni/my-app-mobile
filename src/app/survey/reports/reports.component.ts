import {
  Component,
  Input,
  HostListener,
  Inject,
  ViewChild,
  ElementRef,
  ViewContainerRef,
  OnInit,
  Output, EventEmitter
} from '@angular/core';
import {QuestionService} from "../../_services/question.service";
import {ReportsService} from "../../_services/reports.service";
import {DeviceDetectorService} from "ngx-device-detector";
import * as htmlToImage from "html-to-image";
import {DOCUMENT} from "@angular/common";
import {FilterComponent} from "./filter/filter.component";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit{
  @ViewChild("downloadEl") downloadEl!: ElementRef<HTMLBodyElement>
  @ViewChild('dynamicFilterContainer', {read: ViewContainerRef}) containerFilter!: ViewContainerRef;
  @Input() studyInfo: any = [];
  @Input() filterId: any
  @Input() filterCat: any
  @Input() newPageNumber: number = 1
   @Output() pageNumber  = new EventEmitter<number>();
   @Output()   filterCatReportFilter = new EventEmitter<boolean>(false);
  p: number = 1;
  pageItems: number = 1;
  showEdit: boolean = false;
  addQuestion: boolean = false;
  showDetails: boolean = false;
  showDashboard: any;
  question: any;
  static callCounter: number = 0
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
    return !((charCode > 31 && (charCode < 48 || charCode > 57) && charCode < 96) ||
      charCode > 105);

  }

  constructor(private qs: QuestionService, private rs: ReportsService, private deviceService: DeviceDetectorService, @Inject(DOCUMENT) private coreDoc: Document) {}

  ngOnInit() {
    this.filterChartToggle = this.deviceService.isTablet() ?? false;
    if (localStorage.getItem(this.studyInfo.settings.study_id + 'InfoIcons')) {
      this.showInfoIcons = true;
    }

    this.filterResults(this.filterId)
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
      this.pageNumber.emit(data)
    });

    this.rs.getShowComment().subscribe((data) => {
      this.showHideComments = data
      this.showHideCommentsDefault = data
    })

    this.rs.getFilterDates().subscribe((data) => {
      this.filteredDates = data
    })

    if(this.newPageNumber){ //default page number
      this.p = this.newPageNumber??1
    }
  }

  loadComponent() {
       this.containerFilter.clear(); // optional: clears previous components
      const componentRef = this.containerFilter.createComponent(FilterComponent);
      componentRef.instance.studyInfo = this.studyInfo;
      componentRef.instance.filterInfo = this.filterInfo;
      componentRef.instance.filterId = this.filterId;
      this.filterId =null
      componentRef.instance.filterCat.subscribe((value) => {
        this.toggleFilterReport() //return to chart
      });
      componentRef.instance.filterData.subscribe((value) => {
        this.filterArr(value)
        this.filterCatReportFilter.emit()
      });
  }

  onToggle(item: any): any {
    this.showEdit = true
    this.title = item.name
    this.question = item.name
    this.showAddQuestion = false
  }

  filterResults(filterId: any) {
    this.noQuestionsMsg = false;
    this.rs.getQuestionReportFilter(this.studyInfo.settings.study_id, this.categoryFilter, this.filteredDates, filterId).subscribe((data: any) => {
      this.filterArr(data)
    })
  }

  filterArr(data: any) {
      this.rs.setCategoryList(data['allCategories'])
    if (!data['report'].length) {
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
    this.toggleFilter();
  }


  changed(value: any) {
    this.pageItems = value;
  }

  // storeFilterSelection($event: any) {
  //   this.rs.getStoreFilterSelection().subscribe((data) => {
  //     this.storeFilterSelectionArr = data
  //   })
  // }

  categoryFilterChart(category: any) {
    this.categoryFilter = []
    this.categoryFilter.push(category)
  }


  toggleFilter() {
    if (this.studyInfo['study']['type_of_survey'] == 2) {
      this.rs.setFilterHistory([])
    }
    this.showAverages = false;

    this.filterChartToggle = true
    // if (this.studyInfo['study']['type_of_survey'] == 2) {
    //   //   this.rs.setToggleHistoryCard(this.filterChartToggle)
    // }
  }

  toggleFilterReport() {

    if (this.studyInfo['study']['type_of_survey'] == 2) {
      this.rs.setFilterHistory([])
    }
    this.showAverages = false;
    this.filterChartToggle = !this.filterChartToggle
    this.loadComponent()
    if (this.studyInfo['study']['type_of_survey'] == 2) {
      this.rs.setToggleHistoryCard(this.filterChartToggle)
    }
  }

  public openOrangeFullscreen() {
    this.isFullScreen = !this.isFullScreen
    this.hideShowInfoIcons()
    this.closeFullscreen()
    let elem: any = document.getElementById("orange");

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
    if (this.isFullScreen) {
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
  downloading: any;

  // enterHandler() {
  //   alert('Enter pressed!');
  // }
  //
  // escHandler() {
  //   alert('ESC pressed!');
  // }
  //
  // shiftFHandler() {
  //   alert('Shift+F pressed!');
  // }

  showQuestionRp(i: number) {
    if (this.resultCnt != this.p) {
      this.qs.setChartReportPagination(this.p + i)
    }
  }

  showQuestionRpMinus(i: number) {
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

  // onShowHidecoments($event: boolean) {
  //   //console.log(this.showHideComments?'I wont show':'I will show')
  //   //this.showHideComments = this.showHideComments??false
  // }

  downloadDataUrl(dataUrl: string, filename: string): void {
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

  onAverage() {
    this.filterChartToggleIcon = false


    if (this.showAverages) {
      this.showAverages = false;
      this.filterChartToggle = true
      this.showAverages = false;
    } else {
      this.showAverages = true;
    }
  }

  /**
   * @todo try to centralize the reading of the current page number
   * @param currentPageNumber
   */
  onPageNumberChange(currentPageNumber: any){
   if(currentPageNumber){
     this.qs.setChartReportPagination(currentPageNumber)
    this.p =  currentPageNumber;
   this.pageNumber.emit(this.p)
   }
  }
}
