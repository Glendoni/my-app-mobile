import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';

import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService, ParticipantsService, StudyService, UserService} from "../../_services";
import {CommunityService} from "../../_services/community.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BaseCommunity} from "../../interfaces/BaseCommunity";
import {debounceTime, distinctUntilChanged, Observable, Subject, Subscription} from "rxjs";
import {switchMap} from "rxjs/operators";
import {DeviceDetectorService} from "ngx-device-detector";


@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit, OnDestroy {
  participants: any = []
  @Input() studyInfo: any = [];
  @Output() toggleQrCode = new EventEmitter<boolean>();
  @Output() toggleInvite = new EventEmitter<boolean>();

  showUpdatePackageMsg: boolean = false
  p: number = 1;
  status: any = 'completed'
  pageItems: number = 10;
  categoryArray: any = []
  editDetails: any
  categoryEdit: any = []
  model: any = null
  modelConstructor: any = []
  upgradeNotification: any;
  user_categories: boolean = false
  filterIcon: string = ''
  showFilterIcon: boolean = false
  currentUserDetails: any = []
  public categoryForm: any = FormGroup
  form: any = FormGroup;

  submitted: boolean = false

  calculateClasses: any = 'display'
  name = 'Angular';
  list: any = [];
  items: any = FormArray;
  currentuser: string = ''

  public val: string = '9'
  allJoinRequests: BaseCommunity[] = []
  allJoinRequestsOrg: any = []

  selectedItemPostion: number = 0

  selectedCategoriesArray: any = []

  updatedSelectedCategoriesArray: any = []
  private searchText$ = new Subject<string>();
  packages$!: Observable<object>;

  checkEdit: any = []
  categoryIds: any = []
  public allowAddInvite: boolean = false;
  public triggered: boolean = false;
  public filterGroup: any = null;
  private searchEvent: any;
  showSpinner: boolean = false;
  public deviceIsMobile: boolean =false;

  constructor(private participantsService: ParticipantsService, private studyService: StudyService, private us: UserService, private fb: FormBuilder, private communityService: CommunityService, private route: ActivatedRoute,
              private router: Router, private authenticationService: AuthenticationService,
              private deviceService: DeviceDetectorService) {
    this.showUpdatePackageMsg = false
  }

  modelConstruct(data: any) {

    const modelP = {
      // age_group: {
      //   type: "select",
      //   value: '',
      //   label: "Age ",
      //   rules: {
      //     required: false,
      //   },
      //   options: data.age_group,
      // },
      filter_group: {
        type: "select",
        value: '',
        label: "Status ",
        rules: {
          required: false,
        },
        options: [{'label': 'Accepted', 'value': 2}, {'label': 'Pending', 'value': 1}],
      }, category_group: {
        type: "select",
        value: '',
        label: "Category",
        rules: {
          required: false,
        },
        options: data.categories,
      },
      // ethnicity_group: {
      //   type: "select",
      //   value: '',
      //   label: "Ethnicity ",
      //   rules: {
      //     required: false,
      //   },
      //   options: [
      //     {
      //       label: "Asian",
      //       value: "asian",
      //     },
      //     {
      //       label: "European",
      //       value: "european",
      //     },
      //     {
      //       label: "Latin American",
      //       value: "latin_american",
      //     }
      //   ],
      // }
    }
    this.model = [];
    this.model = modelP;
  }

  ngOnInit() {


    if(this.deviceService.getDeviceInfo().deviceType == 'mobile'){
      this.deviceIsMobile = true;
    }

    this.showUpdatePackageMsg = false

    this.participantsService.getConfirmInviteLimitStatus().subscribe((data: any) => {

        if (!data['success']) {
          this.showUpdatePackageMsg = true
          this.upgradeNotification = {"usageCheck" :data.data}
          setTimeout(() => this.upgradeNotification = false, 6500)
        }
    })

    this.categoryIds = []
    this.studyInfo.study_categories.forEach((c: any) => {
      this.categoryIds.push(c);
    })
    this.reloadParticipant()
  }

  reloadParticipant() {
    this.showSpinner = true
    this.participantsService.getParticipantsFormArray(this.studyInfo.study.id).subscribe((data: any) => {
      this.showSpinner = false
      this.modelConstructor = data;
      this.modelConstruct(data)
    })

    this.refreshGetStudyParticipants()
    this.categoryForm = this.fb.group({
      study_id: [this.studyInfo.study.id],
      user_id: [''],
      request_id: [''],
      cate: new FormArray([]),
    });

    this.packages$ = this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(packageName =>
        this.participantsService.participantSearch(this.studyInfo.study.id, packageName))
    );

    this.packages$.subscribe((data: any) => {
      if(!data){
        this.filterGroup =3
      }
      this.participants = data.data
    },(error) => {

      })
  }

  refreshData() {
    this.filterGroup = null
    this.participantsService.getParticipantsFormArray(this.studyInfo.study.id).subscribe((data: any) => {
      this.modelConstructor = data;
      this.modelConstruct(data)
      this.showFilterIcon = false
      this.filterIcon = ''
    })

    this.refreshGetStudyParticipants()
    this.categoryForm = this.fb.group({
      study_id: [this.studyInfo.study.id],
      user_id: [''],
      request_id: [''],
      cate: new FormArray([]),
    });
  }

  get f() {
    return this.form.controls;
  }

  get c() {
    return this.categoryForm.controls;
  }

  refreshGetStudyParticipants() {
    this.showUpdatePackageMsg = false
    this.participantsService.getStudyParticipants(this.studyInfo.study.id).subscribe((data: any) => {
      this.showUpdatePackageMsg = false
      this.participantsService.setInviteLimitStatus(data['allowAddInvite'])
      this.participants = data //contains is_read
      if (!data['participants'].length) {
        this.studyService.setRedirectToInvite(true)
      }
    })
    this.studyService.getStudyCategories(this.studyInfo.study.id).subscribe((data) => {
      this.categoryArray = data
      this.refresh()
    })
  }

  refresh() {
    this.showUpdatePackageMsg = false
    this.editDetails = false
    this.participantsService.getStudyParticipants(this.studyInfo.study.id).subscribe((data: any) => {
      this.participants = data['participants'] //contains is_read
      this.showUpdatePackageMsg = false
    })
  }

  refreshUpdateStudyParticipants() {
    const participantsNew: any = [];
    const participantsOriginal = this.participants.filter((el: any[], i: any, a: any) => i === a.indexOf(el))
    var cate: any = []
    for (var index1 in participantsOriginal) {
      if (this.currentUserDetails.user[0].id === participantsOriginal[index1].user[0].id) {
        cate = participantsOriginal[index1].user_categories.filter((el: any[], i: any, a: any) => i === a.indexOf(el))
        for (var index2 in cate) {
          participantsOriginal[index1].user_categories = this.updatedSelectedCategoriesArray
        }
      }
      participantsNew.push(participantsOriginal[index1])
      this.participants = []
      this.participants = participantsNew
    }
  }

  filterCategoryArray(): void {
    var userSelectedCategories = this.categoryEdit
    const categories = this.categoryArray.filter((el: any[], i: any, a: any) => i === a.indexOf(el))
    for (var index1 in categories) {
      if (userSelectedCategories.includes(categories[index1].name)) {
        categories[index1]['checked'] = true
        categories[index1]['bumba'] = true
      } else {
        categories[index1]['checked'] = false
      }
    }
    for (var index2 in categories) {
      if (userSelectedCategories[0] == categories[index2].name) {
        categories[index2]['is_read'] = this.editDetails.user_categories[0]['is_read'] // this.editDetails.user_categories[0]['is_read']
        categories[index2]['completed'] = this.editDetails.user_categories[0]['completed'] // this.editDetails.user_categories[0]['is_read']
      }
    }
    this.categoryEdit = []
  }

  edit(details: any) {
   if(this.studyInfo.study.type_of_survey == 2 && !details['user'][0]['name']){
     return;
   }
    console.log(this.studyInfo.study.type_of_survey)

    const allCategories = this.categoryIds
    this.checkEdit = []
    const user_id = details.user_id
    this.val = user_id
    this.currentuser = details.user[0].id
    this.currentUserDetails = []
    this.currentUserDetails = details
    this.c.user_id.patchValue(details.user[0].id)
    this.editDetails = details
    const cate = this.categoryForm.get('cate') as FormArray;
    const userCategories = details.user_categories.filter((el: any[], i: any, a: any) => i === a.indexOf(el))
    cate.clear()
    this.checkEdit = []
    const selectedIndex: any = []
    userCategories.forEach((uc: any) => {
      uc['checked'] = true
      this.checkEdit.push(uc)
      selectedIndex.push(uc['id'])
    })

    allCategories.forEach((uc: any) => {
      if (!(selectedIndex.indexOf(uc['id']) > -1)) {
        this.checkEdit.push(uc)
      }
    })
    this.participantsService.setUserEditCategories(this.checkEdit)
  }

  /**
   * used to store the user allocated selection
   * @param item
   * accepts flat array of checked items
   */
  shareCheckedList(item: any): void {
    let cate = this.categoryForm.get('cate') as FormArray;
    cate.clear()
    for (var index1 in item) {
      cate.push(this.createCategory(item[index1]));
    }
  }

  /**
   * formats the data to be stored
   * @param item
   */
  createCategory(item: any | null): FormGroup {

    return this.fb.group({
      item
    });
  }

  // shareIndividualCheckedList(event: any) {
  //
  // }

  removeIndividualCheckedList(item: any) {
    const categoryList = this.categoryForm.value.cate
    const cate = this.categoryForm.get('cate') as FormArray;
    cate.clear()
    for (var index1 in categoryList) {
      if (item !== categoryList[index1].item) {
        cate.push(this.createCategory(categoryList[index1].item))
      }
    }
  }

  get fa() {
    return this.categoryForm.get('categories') as FormArray;
  }

  submit($event: any) {
    this.searchEvent = $event
    this.filterGroup = $event['filter_group'] ?? null
    this.participants = []
    this.editDetails = false
    this.showFilterIcon = true
    this.filterIcon = 'filterIcon'

    this.participantsService.searchParticipants(this.studyInfo.study.id, $event).subscribe((data: any) => {
      this.participants = data.data
    })

    //  this.refreshGetStudyParticipants()
  }

  OnRefreshParticipants() {

    this.refreshGetStudyParticipants()
  }

  setCurrentUser(user_details: any, indexId: number) {

    this.selectedItemPostion = indexId

    const user_id = user_details.user_id
    this.val = user_id
    this.c.user_id.patchValue(user_id)
  }

  removeCurrentUser(user_request_id: string, indexId: number) {
    this.c.request_id.patchValue(user_request_id)
    this.allJoinRequests.splice(this.selectedItemPostion, 1);

    this.communityService.rejectUserFromStudy(this.categoryForm.value).subscribe((data) => {
    })
  }

  addToSurvey() {
    this.communityService.attachUserToCategory(this.categoryForm.value).subscribe((data) => {
      const cate = this.categoryForm.get('cate') as FormArray;
      cate.clear()
      this.editDetails = false
      this.refreshData()
      this.showFilterIcon = true
      //this.reloadParticipant()
    })
  }

  OnFilter() {
    this.showFilterIcon = true
    this.filterIcon = this.filterIcon ?? ''

    if (this.editDetails) this.editDetails = false;
  }

  changed(value: any) {
    this.pageItems = value;
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  search(packageName: string) {
    this.participants = []
    this.filterGroup=99
    if (!packageName) {
      packageName = '--All--'
    }
    this.searchText$.next(packageName)
  }


  ngOnDestroy() {
    this.showUpdatePackageMsg = false
  }

  removeInvite(editDetails: any) {
    this.participantsService.removeInvite(editDetails['user'][0]['id']).subscribe((data: any) => {
      this.submit(this.searchEvent)
    })
  }

  onShowInvite() {
    this.toggleInvite.emit(true);
    console.log('Invite')
  }

  onShowQrCode() {

    this.toggleQrCode.emit(true);
    console.log('Qr Code')
  }


}
