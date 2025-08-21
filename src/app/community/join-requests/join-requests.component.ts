import {Component, OnInit, Input, ViewChild, AfterViewInit,ElementRef} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService, StudyService} from "../../_services";
import {ActivatedRoute, Router} from "@angular/router";
import {CommunityService} from "../../_services/community.service";
import {Subscription} from "rxjs";
import {BaseCommunity} from "../../interfaces/BaseCommunity";



@Component({
  selector: 'app-join-requests',
  templateUrl: './join-requests.component.html',
  styleUrls: ['./join-requests.component.css']
})
export class JoinRequestsComponent implements OnInit, AfterViewInit{
  @Input() studyInfo: any = [];
  allJoinRequests: BaseCommunity[] = []
  allJoinRequestsOrg: any = []
  selectedItemPostion:number = 0
  categories: any = []
  paramsSubscription: any = Subscription;
  study: any = []
  studyDetails: any = []
  userProfile: any = []
  public categoryForm: any = FormGroup
  form: any = FormGroup;
  categoryArray: any
  submitted: boolean = false
  calculateClasses: any ='display'
  name = 'Angular';
  list: any = [];
  items: any = FormArray;
  currentuser:string = ''
  public categoryBtnVisibility: boolean = true;

  public val:string ='9'

  constructor(private fb: FormBuilder, private communityService: CommunityService, private route: ActivatedRoute,
              private router: Router, private authenticationService: AuthenticationService) {
  }

  shareCheckedList(item: any[]) {

    console.log(item)
    const cate = this.categoryForm.get('cate') as FormArray;
    cate.clear()
    item = item.filter((el, i, a) => i === a.indexOf(el))
    for (var index1 in item) {
      cate.push(this.createCategory(item[index1]));
    }
  }

  createCategory(item: any | null): FormGroup {
    //console.log(item)
    return this.fb.group({
      item,
    });
  }

  generateUniqueId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  addItem(item: any): void {
    // this.items = this.categoryForm.get('categories') as FormArray;
    // if (this.items.length) {
    //   this.categoryBtnVisibility = true
    // } else {
    //   this.categoryBtnVisibility = true
    // }
  }


  shareIndividualCheckedList(item: {}) {
    //console.log(item)
   // this.addItem(item)
  }

  removeIndividualCheckedList(item: any) {

    const categoryList = this.categoryForm.value.cate
    const cate = this.categoryForm.get('cate') as FormArray;
    cate.clear()
   // console.log(categoryList)
    //console.log(this.categoryForm.value.cate)
    for (var index1 in categoryList) {
      //console.log(categoryList[index1].item)

      if (item !== categoryList[index1].item) {
        cate.push(this.createCategory(categoryList[index1].item))
      }
    }

  }

  get fa() {
    return this.categoryForm.get('categories') as FormArray;
  }

  // get fc() {
  //   return this.categoryForm.get('cate') as FormArray;
  // }

  ngOnInit() {

   console.log(this.studyInfo)

    this.form = this.fb.group({
      email: ['test@test.com'],
      study_id: ['9ab6b3b0-b5b5-4afe-bedf-3fefa703dab4'],
    });

    this.categoryForm = this.fb.group({
      study_id: ['9aad164a-d12d-4100-ac31-d38d3e5461da'],
      user_id: [''],
      request_id: [''],
     // categories: new FormArray([]),
      cate: new FormArray([]),
      //  trackingId: this.generateUniqueId()
    });

    // this.communityService.getJoinRequests().subscribe((data: any) => {
    //   this.allJoinRequestsOrg = data.data;
    //   this.study = data.meta.studyDetails
    //   this.categoryArray = data.meta.studyDetails[0].study_categories
    // })

    this.communityService.getStudyCategories().subscribe((data:any) =>{
      this.categories = data;
      this.categoryArray = data
    })
    /**
     * @todo check if still required or awaiting further development
     */
    this.communityService.getJoinRequests().subscribe(resp =>
      this.allJoinRequests = resp);
  }

  createItem(item: any | null): FormGroup {
    // console.log('HAPPY')
    return this.fb.group({
      name: item.name,
      id: item.category_id,
    });
  }

  get f() {
    return this.form.controls;
  }

  get c() {
    return this.categoryForm.controls;
  }

  save(emailvalue: string) {

    this.form.patchValue(emailvalue)
    this.communityService.acceptJoinRequest(this.form.value).subscribe((data: any) => {

    })
  }

  displayStudyDetailsModal(value: any) {
    this.studyDetails = value
  }

  addToShortlist(profile: any) {
    // console.log(profile)
    this.c.user_id.patchValue(profile.user_id)
    // this.submitted =true

    this.userProfile = profile
    // console.log(this.study[0].settings.study_id)

  }

  addToShortlist_(profile: any) {
    this.userProfile = profile
  }

  addToShortlistSave(user_id: any) {
    this.submitted = true
  }

  addToSurvey(user_id: any) {
    this.allJoinRequests.splice(this.selectedItemPostion, 1);
    console.log(user_id.currentuser)
    this.communityService.attachUserToCategory(this.categoryForm.value).subscribe((data) => {
        console.log('saved category details ')
    })

  }

  setCurrentUser(user_details: any, indexId:number) {

this.selectedItemPostion = indexId

    const user_id = user_details.user_id
this.val=user_id
    this.currentuser = user_id
    // console.log('Set Current User ' +user_id)
    this.c.user_id.patchValue(user_id)
  }

  removeCurrentUser(user_request_id: string, indexId:number) {
    this.c.request_id.patchValue(user_request_id)
    this.allJoinRequests.splice(this.selectedItemPostion, 1);

    this.communityService.rejectUserFromStudy(this.categoryForm.value).subscribe((data) => {
      console.log(data)
    })

console.log(this.categoryForm.value)

  }

  ngAfterViewInit(){

  }

}
