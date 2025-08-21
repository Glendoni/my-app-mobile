import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuestionService} from "../../../_services/question.service";
import {ParticipantsService, StudyService} from "../../../_services";
import {Router} from "@angular/router";
import {Observable, of, interval, Subject, distinctUntilChanged, debounceTime} from 'rxjs'
import {switchMap} from 'rxjs/operators'
import {FormControl} from "@angular/forms";


@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.css']
})
export class StudiesComponent implements OnInit, OnDestroy {
  search_word = new FormControl();
  p: number = 1

  showDetails: boolean = false;
  activeLinkStyle = '50%';
  private nav: any;
  public showCategory = false;
  public showCreateCategoryToggle = false;
  public showSettings = false;
  public showParticipants = false;
  public showReports = false;
  public showInvite = false;
  public showllastration = true;
  public type_of_survey: boolean = false;
  private blockEntry: boolean = false
  public showQrCodeMenu: boolean = false
  category = false;
  settings = false;
  dashboard = true;
  participants = true;
  reports = true;
  updatedStudyName: string = ''

  public title = 'Survey Builder'
  public navi = [
    'Config',
    'Categories',
    'Questions',
    'Community',
    'Participants',
    'Reporting'
  ]
  public listHeader: string = 'Click on list item to show details'
  public addStudyButtonValue: string = 'Add Study'
  public listItems = [
    'Study On Various Types Of Cheese',
    'Study On Climate Change'
  ]

  surveyCommunity = false;
  showQuestions = false;
  showAddStudyButton = true
  showAddQuestionButton: boolean = true
  public createStudy = false;
  showstudytitle = false;
  showAddStudyMenu = false;
  public selected_study_title: string = '';
  study: any;
  showStudyTitle: boolean = false
  showUpgradeMessage: boolean = false
  studies: any = []
  subMenu: boolean = false;
  private isLoading: boolean = false;
  withRefresh = false;
  private searchText$ = new Subject<string>();
  packages$!: Observable<object[]>;
  status: number = 99
  upgradeNotification: any = false;
  public noMatchFound: any = null;
  public showQrCode: boolean = false;
  public statusValue: any = '';
  public showSettingsBtn: boolean = true;
  private listingFilter: boolean = false;
  private getAddQuestionStatusCheck: boolean = false;

  constructor(private qs: QuestionService, private studyService: StudyService, private router: Router, private participantsService: ParticipantsService) {
    this.qs.redirectToDashboard().subscribe((data) => {
      this.showDashboard();

      if (data) {
        this.createStudy = false
        this.showSettings = false
        this.getPortalStudiesListing()

      }
    })

    this.studyService.redirectToInvite().subscribe((data) => {
      if (data) {
        this.onInvite()
      }
    })
  }

  search(packageName: string) {
    this.status = 99
    this.studies = []
    if (!packageName) {
      packageName = '--All--'
    }
    this.searchText$.next(packageName)
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  ngOnInit() {

    this.showAddQuestionBtnEval()
    this.studyService.getCreateCategoryToggleClose().subscribe((data) => {
      if (data) {
        // this.onAddCategory()
        this.showCategoryAddMenu()
      }
    })

    this.packages$ = this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(packageName =>
        this.studyService.search(packageName))
    );

    this.packages$.subscribe((data: any) => {
      this.studies = data.data
    })
    this.studyService.getStudyRefresher().subscribe((data) => {
      if (data.length) {
        this.getPortalStudiesListing()
        this.showCreateCategoryToggle = false
      }
    })
    this.getPortalStudiesListing()
  }

  showAddQuestionBtnEval() {
    this.qs.getAddQuestionBtnVisibility().subscribe((data) => {
      this.getAddQuestionStatus()

      if (!this.getAddQuestionStatusCheck && !data) {
        this.showAddQuestionButton = true
      } else if (data) {
        this.showAddQuestionButton = false
      }
    })
  }

  getAddQuestionStatus(): void {
    this.qs.getAddQuestion().subscribe((data) => {
      this.getAddQuestionStatusCheck = data
    })
  }

  getPortalStudiesListing() {
    this.studyService.getPortalStudies().subscribe((data) => {
        this.studyService.setGlobalActiveMode(data[0]['global_account'] ? false : true)

        this.studies = data
        this.noMatchFound = false
        this.status = data[0]['study']['filterId']
        this.showCreateCategoryToggle = false
      },
      (error) => {

        if (!this.listingFilter) {
          this.onAddStudy()
        }
        this.listingFilter = false;

        this.status = error['error']['data']['filterId'] ?? 99
        this.studies = []
        this.noMatchFound = error['error']['message']
      })
  }

  /**
   * todo check if required
   * @param study
   */
  onToggleStudyUpdate(study: any) {
    this.updatedStudyName = study['name']

    this.onNav(study['data'])

  }

  onToggle(item: string = '') {
    this.participantsService.setConfirmInviteLimitStatus(false)
    this.studyService.setCreateCategoryToggle(false)
    this.studyService.setRedirectToInvite(false)
    this.showllastration = true;
    this.showInvite = false;
    this.subMenu = false
    this.showDetails = true
    this.dashboard = false
    this.createStudy = false
    this.category = true;
    this.settings = true;
    this.showSettings = false;
    this.showCategory = false;
    this.showQuestions = false;
    this.showstudytitle = true;
    this.showAddStudyMenu = false;
    this.showAddStudyButton = false;
    this.showReports = false;
    this.selected_study_title = item;
    this.participants = false;
    this.showParticipants = false
    this.reports = true;
    this.showCreateCategoryToggle = false
    this.showQrCode = false
    this.showSettingsBtn = true
  }

  onAddStudy() {

    this.onToggle()
    this.settingsVisibility()
    this.showInvite = false;
    this.subMenu = false
    this.showSettings = false;
    this.createStudy = true;
    this.showstudytitle = false;
    this.showDetails = false;
    this.showAddStudyMenu = true;
    this.showReports = false;
    this.participants = false;
    this.showQuestions = false;
    this.category = false;
    this.participants = false;
    this.settings = false;
    this.reports = false;
    this.showCreateCategoryToggle = false
    this.showQrCode = false
    this.showSettingsBtn = false

  }

  settingsVisibility() {
    this.showInvite = false;
    this.subMenu = false
    this.showSettings = true;
    this.showCategory = false;
    this.showQuestions = false;
    this.showReports = false;
    this.showAddStudyButton = false;
    this.createStudy = false;
    this.showstudytitle = true;
    this.showAddStudyMenu = false
    this.participants = true;
    this.reports = true;
    this.showllastration = false;
    this.showCreateCategoryToggle = false
    this.showQrCode = false
    this.dashboard = false
    this.createStudy = false

    this.showParticipants = false
    this.showDetails = false
    this.showSettingsBtn = false

    this.subMenu = true
  }

  categoryVisibility() {
    this.showCreateCategoryToggle = false
    this.showQrCode = false
    this.showSettingsBtn = false
    this.showllastration = false;
    this.showInvite = false;
    this.subMenu = true
    this.showCategory = true
    this.showDetails = false
    this.dashboard = false
    this.category = true;
    this.settings = false;
    this.showReports = false;
    this.showQuestions = false;
    this.showAddStudyButton = false;
    this.showstudytitle = true;
    this.showAddStudyMenu = false
    this.participants = false;
    this.reports = false;
    this.showCategoryAddMenu()

  }

  showCategoryAddMenu() {
    if (this.study.study.type_of_survey == 2) {
      if (this.study.study_category.length >= 1) {
        //&& this.study.study_category.length === 1
        this.showCreateCategoryToggle = false
      } else {
        this.showCreateCategoryToggle = true
      }
    }
    if (this.study.study.type_of_survey == 1) {
      this.showCreateCategoryToggle = true
    }
  }

  showDashboard() {
    this.studyService.setActiveMode(false)
    this.showllastration = false;
    this.showStudyTitle = false
    this.showSettingsBtn = false
    this.showInvite = false;
    this.updatedStudyName = ''
    this.subMenu = false
    this.showParticipants = false
    this.showDetails = false
    this.createStudy = false
    this.dashboard = true
    this.category = false;
    this.settings = false;
    this.showCategory = false;
    this.showQuestions = false;
    this.showReports = false;
    this.showAddStudyButton = true;
    this.showstudytitle = false;
    this.showAddStudyMenu = false
    this.participants = false;
    this.showCreateCategoryToggle = false
    this.reports = false;
    this.showQrCode = false
  }

  questionsVisibility() {
    this.showllastration = false;
    this.showSettingsBtn = false
    this.showAddQuestionButton = true
    this.showInvite = false;
    this.subMenu = true
    this.showDetails = false
    this.dashboard = false
    this.category = false;
    this.settings = false;
    this.showReports = false;
    this.showQuestions = true;
    this.showAddStudyButton = false;
    this.showstudytitle = true;
    this.showAddStudyMenu = false
    this.participants = false;
    this.reports = false;
    this.showCreateCategoryToggle = false
    this.showQrCode = false
  }

  communityVisibility() {
    this.showQrCode = false
    this.showInvite = false;
    this.showSettingsBtn = false
    this.subMenu = true
    this.showDetails = false
    this.dashboard = false
    this.category = false;
    this.settings = false;
    this.showReports = false;
    this.showQuestions = false;
    this.showAddStudyButton = false;
    this.showstudytitle = true;
    this.showAddStudyMenu = false
    this.surveyCommunity = true;
    this.participants = false;
    this.reports = false;
    this.showCreateCategoryToggle = false
    //this.router.navigate(['community/'+this.study.study.id])
    this.router.navigate(['community'])
  }

  participantsVisibility() {
    // this.participantsService.setConfirmInviteLimitStatus(false)
    this.showllastration = false;
    this.subMenu = true
    this.showSettingsBtn = false
    this.showDetails = false
    this.dashboard = false
    this.category = false;
    this.settings = false;
    this.showReports = false;
    this.showQuestions = false;
    this.showAddStudyButton = false;
    this.showParticipants = true
    this.showstudytitle = true;
    this.showAddStudyMenu = false
    this.surveyCommunity = false;
    this.participants = true;
    this.reports = false;
    this.showInvite = false;
    this.showCreateCategoryToggle = false
    this.showQrCode = false

    if (this.isStudyTypeTwo()) {
      this.showQrCodeMenu = true
    } else {
      this.showQrCodeMenu = false
    }
  }

  reporter() {
    this.showllastration = false;
    this.subMenu = true
    this.showDetails = false
    this.showSettingsBtn = false
    this.dashboard = false
    this.category = false;
    this.settings = false;
    this.showReports = false;
    this.showQuestions = false;
    this.showAddStudyButton = false;
    this.showParticipants = false
    this.showstudytitle = true;
    this.showAddStudyMenu = false
    this.surveyCommunity = false;
    this.participants = false;
    this.reports = false;
    this.showReports = true;
    this.showCreateCategoryToggle = false
    this.showQrCode = false

  }

  onNav(study: any) {
    if (this.blockEntry) {
      return
    }
    this.studyService.setActiveMode(study.study['active'])
    this.showStudyTitle = true
    this.onToggle(study.name)
    this.updatedStudyName = study.name
    this.study = study
    this.studyService.setOptions(study.study_categories);
    this.upgradeNotification = false
    this.showQrCode = false
    this.showSettingsBtn = true
  }


  onInvite() {
    this.participantsService.inviteUsageCheck(this.study['study']['id']).subscribe((data: any) => {
        this.showInvite = true;
        this.participants = false;
        this.subMenu = true
        this.showDetails = false
        this.dashboard = false
        this.category = false;
        this.settings = false;
        this.showReports = false;
        this.showQuestions = false;
        this.showAddStudyButton = false;
        this.showParticipants = false
        this.showstudytitle = true;
        this.showAddStudyMenu = false
        this.surveyCommunity = false;
        this.showSettingsBtn = false
        this.reports = false;
        this.showCreateCategoryToggle = false
    },(error) => {
      this.participantsService.setConfirmInviteLimitStatus(error.error)
      this.showInvite = false;
      this.showParticipants = true
    })
  }

  onQrCode() {
    if (!this.isStudyTypeTwo()) {
      return;
    }
    this.participantsService.setConfirmInviteLimitStatus(false)
    this.showllastration = false;
    this.subMenu = true
    this.showDetails = false
    this.dashboard = false
    this.category = false;
    this.settings = false;
    this.showReports = false;
    this.showQuestions = false;
    this.showAddStudyButton = false;
    this.showParticipants = false
    this.showstudytitle = true;
    this.showAddStudyMenu = false
    this.surveyCommunity = false;
    this.participants = false;
    this.reports = false;
    this.showInvite = false;
    this.showCreateCategoryToggle = false
    this.showQrCode = true
    this.showSettingsBtn = false
  }

  onAddCategory() {
    this.showCreateCategoryToggle = true
    this.studyService.setCreateCategoryToggle(true)
  }

  onShowAddCategoryMenu($event: boolean = false) {
    if ($event) {
      this.showCreateCategoryToggle = true
    }
  }

  onSearchStatus(status = 1) {
    this.upgradeNotification = false
    this.status = status
    switch (+status) {
      case 99:
        this.statusValue = "All";
        break;
      case 1:
        this.statusValue = "Active";
        break;
      case 2:
        this.statusValue = "In Development";
        break;
      case 3:
        this.statusValue = "Archived";
        break;
    }

    this.studyService.listingFilter(status).subscribe((data: number) => {
      this.listingFilter = true;
      this.getPortalStudiesListing()
    })
  }

  setRestrictionStatus($event: string) {
    this.upgradeNotification = $event
    setTimeout(() => {
      this.showDashboard()
    }, 200)
    this.showSettings = false
    this.createStudy = true
  }

  ngOnDestroy() {
    this.participantsService.getInviteLimitStatus()
  }

  showAddQuestion() {
    this.showAddQuestionButton = false
    this.qs.setAddQuestion(true)
  }

  onToggleQrCode($event: boolean) {
    this.onQrCode()
  }

  onToggleInvite($event: boolean) {
    this.onInvite();
  }

  isStudyTypeTwo() {
    if (this.study.study.type_of_survey === 2) {
      return true;
    }
    return false;
  }
}
