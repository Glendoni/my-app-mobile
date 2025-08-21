import {Component, OnInit, Input, Output,EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {QuestionService} from "../../../_services/question.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService, StudyService} from "../../../_services";
import {data} from "autoprefixer";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
 @Input() studyInfo:any = []
 @Output() showAddMenu =  new EventEmitter<boolean>();
  p:number=1;
  pageItems:number=5;
  showCreate = false;
  showDetails = false;
  list =  true
  categoryForm:any= FormGroup ;
  categoryFormCreate:any= FormGroup ;
  updateFailier:any = false
categotyList:any
  submitted = false
  showUpgradeNotification = false
  upgradeNotification = false
  categotyNewBtn: boolean = false;
  saveAndAddBtn: boolean = false;
  showSpinner: boolean = false;

  constructor(private fb: FormBuilder, private studyService: StudyService, private route: ActivatedRoute,
              private router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.router.navigate(['survey'])
    this.showSpinner = true;
    this.studyService.getCreateCategoryToggle().subscribe((data) =>{

      if(data){

        this.studyService.checkCategoryUsage(this.studyInfo.study.id).subscribe((data) => {
            this.showSpinner = false;
            this.showUpgradeNotification = false
            if(this.showUpgradeNotification == false){
              this.create()
            }
          },
          (error) => {
            this.showUpgradeNotification = true
            this.upgradeNotification = error.error.data;
          }
        )
      }else {
        this.getCategories()
      }

        this.categoryForm = this.fb.group({
          name: ['',[Validators.required]],
          category_id: ['id'],
          study_id: [this.studyInfo.study.id],
        });

        this.categoryFormCreate = this.fb.group({
          name: ['', [Validators.required]],
          category_id: ['id'],
          study_id: [this.studyInfo.study.id],
        });


    })



  }

  showCategoryAddMenu(){

    if(this.studyInfo.study.type_of_survey ==1 ){
      //this.type_of_survey = study.type_of_survey

      this.saveAndAddBtn =true
    }else{

      this.saveAndAddBtn =true
    }

  }

  get f() {
    return this.categoryForm.controls;
  }
  get c() {
    return this.categoryFormCreate.controls;
  }
  getCategories(){


     this.showCategoryAddMenu()
    this.studyService.getPortalCategories(this.studyInfo.study.id)
      //.pipe(first())
      .subscribe((data: any) => {

        this.showSpinner = false;
        if(data.length ) {

           this.categotyList = data;
        }else {
          this.create()
       //   this.studyService.setCreateCategoryToggleClose(true)
        }
      //  this.showCreate =false
      });
  }

  create() {

    this.c.name.setValue('')
    this.showCategoryAddMenu()
    this.categotyList =false
    this.showCreate =true
    this.showDetails =false
    this.list =false

  }

  showList() {
    this.studyService.setCreateCategoryToggleClose(true)
  //  this.showUpgradeNotification = false
 if(this.showUpgradeNotification == false){
  //   this.studyService.setCreateCategoryToggleClose(false)
 }else{
  //this.studyService.setCreateCategoryToggleClose(true)
 }
    setTimeout(()=> this.showUpgradeNotification = false,3500)
    this.showCategoryAddMenu()
    this.showCreate =false
    this.showDetails =false
    this.list =true
    this.getCategories()
    // this.studyService.setCreateCategoryToggleClose(false)
  }

  details(category:any) {
    setTimeout(()=> this.showUpgradeNotification = false,1500)
    this.showUpgradeNotification = false
   // this.studyService.setCreateCategoryToggle(true)
    this.showCategoryAddMenu()
    this.f.name.setValue(category.name)
    this.f.category_id.setValue(category.id)
   // this.f.categoryId.setValue(category.id)

this.showCreate =false
this.showDetails =true
    this.categotyList =false
this.list =false
  }

  updateCategory(goToAdd = false) {
    // console.log(this.studyInfo)
    //
    // console.log(this.categoryForm.value)

    this.update(goToAdd)

    // if(goToAdd){
    //   console.log('ADD STUDY')
    //
    // //  this.create()
    //   this.save()
    // }else{
    //   this.showCreate =false
    //   console.log('EDIT STUDY')
    //
    //
    // }

  }

  save(goToAdd = false) {
    // console.log(this.studyInfo.study.id)
    this.submitted = true;
     if(!this.categoryForm.valid){
       return;
     }
    this.submitted = false;
    this.studyService.setPortalCategories(this.categoryForm.value).subscribe((data: any) => {
      // console.log(data)
      //this.create()
      this.showList()
    })

  //  this.getCategories()
  }

  update(goToAdd = false) {
    // console.log(this.studyInfo.study.id)
    // console.log(this.f.category_id.value)
    this.submitted = true;
    this.studyService.updatePortalCategories(this.categoryForm.value, this.f.category_id.value).subscribe((data: any) => {

      this.showCategoryAddMenu()
      if(!data.data.error) {
        if(goToAdd){
          this.submitted = false;
          this.create()
        }else{
           this.getCategories()
          this.showList()
        }


        this.studyService.addNotification(data);

      }else{
        this.updateFailier = data.data.error??null
        setTimeout(()=> this.updateFailier = false,3500)
      }

    })
    this.submitted = false;
  }

  changed(value:any) {
    // console.log(value)
    this.pageItems = value;
  }

  scrollToTop() {
    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
  }
}
