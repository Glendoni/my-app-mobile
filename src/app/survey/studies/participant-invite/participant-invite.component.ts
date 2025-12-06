import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ParticipantsService, StudyService} from "../../../_services";
import {data} from "autoprefixer";
import {BehaviorSubject, debounceTime, distinctUntilChanged, Subject} from "rxjs";
import {HttpEventType} from "@angular/common/http";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-participant-invite',
  templateUrl: './participant-invite.component.html',
  styleUrls: ['./participant-invite.component.css']
})
export class ParticipantInviteComponent implements OnInit {
  @Input() studyInfo: any = []

  public inviteForm: any = FormGroup
  submitted: boolean = false
  alreadyInvitedValidation: boolean = false;
  showUpgradeNotification: boolean = false;
  upgradeNotification: string = '';
  dataLink: any;
  public study_categories: any = [];
  public filterSet: any;
  public searchText: any;
  public isVisible: boolean = false;
  public isCursorOverFilterSet: boolean = false;
  public userQuestion: string = '';
  public userQuestionUpdate = new Subject<string>();
  fileName: string = '';
  file: File | any;

  selectedFile: File | null = null;
  uploadProgress: number | null = null;
  uploadResponse: string | null = null;
  public message: any;
  public onToggleBulkUploader: boolean = false;
  public isNotDesktop: boolean = true;

  constructor(private fb: FormBuilder,
              private participantsService: ParticipantsService,
              private studyService: StudyService,
              private deviceService: DeviceDetectorService) {

    if (!this.deviceService.isDesktop()) {
      this.isNotDesktop = false
    }


    // this.userQuestionUpdate = new BehaviorSubject<string>('');

    if (true) {
      this.userQuestionUpdate.pipe(
        debounceTime(400),
        distinctUntilChanged())
        .subscribe((value: string) => {
          this.searchText = value
          if (value.length >= 3) {
            this.searchUsers(value)
          }
          //  this.consoleMessages.push(value);
        });
    } else {
      this.hideList()
    }
  }

  ngOnInit() {
//if(!this.studyInfo['study_categories'].length){
    this.studyService.getparticipantCategories(this.studyInfo['study']['id']).subscribe((data) => {
      this.study_categories = data
    })
//}
//else{
    //this.study_categories = this.studyInfo['study_categories'];
//}
    this.inviteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      categories: [''],
      study_id: [this.studyInfo.study.id],
    });
  }

  get f() {
    return this.inviteForm.controls;
  }

  onUpdate() {
    if (Array.isArray(this.f['categories'].value)) {
      if (this.f['categories'].value.length >= 1) {
        this.sendInvite()
      }
    }
  }

  sendInvite() {
    this.submitted = true;
    if (!this.inviteForm.valid) {
      return;
    }
    this.participantsService.inviteParticipants(this.inviteForm.value).subscribe((data) => {
        this.dataLink = data.data.link

        if (data.data.link) {
          if (data.data.link.length > 10) {
            this.inviteForm.controls['email'].disable();
            this.alreadyInvitedValidation = true
          }
        } else {
          if (data['success']) {
            this.submitted = false;
            this.f.name.setValue([])
            this.f.email.setValue([])
            this.f.categories.setValue([])
            this.participantsService.setResetCategories(true)
          }
          this.onSendReminderNo()
        }
      },
      (error) => {
        console.log(error.error.data)
        this.showUpgradeNotification = true
        this.upgradeNotification = error.error.data;
      }
    )
  }

  sendInviteReminder(inviteLink: string) {
    this.submitted = true;
    this.participantsService.inviteParticipantsReminder(inviteLink).subscribe((data) => {
      this.onSendReminderNo()
      this.participantsService.setResetCategories(true)
    })
  }

  removeIndividualCheckedList(event: any) {
  }

  addToSurvey(event: any) {

    // this.participantsService.setResetCategories(true)
  }

  shareCheckedList(event: any) {

    this.f.categories.setValue(event)
  }

  shareIndividualCheckedList(event: any) {

  }

  onSendReminder(linkId: string) {
    this.sendInviteReminder(linkId)
  }

  onSendReminderNo() {
    this.inviteForm.controls['email'].enable();
    this.f.name.setValue([])
    this.f.categories.setValue([])
    this.f.email.setValue('')
    this.submitted = false;
    this.alreadyInvitedValidation = false
  }

  showList() {
    if (this.searchText.length > 0) {
      console.log(this.searchText)
      this.isVisible = true;
    }
  }

  hideList() {
    if (this.isCursorOverFilterSet != true) {
      this.isVisible = false;
    }
  }

  cursorOverSet() {
    this.showList();
    this.isCursorOverFilterSet = true;
  }

  searchUsers(value: string) {
    if (!this.isCursorOverFilterSet) {
      this.participantsService.studyUserSearch(value, this.studyInfo['study']['id']).subscribe((data: any) => {
        if (data.length == 1) {
          this.isCursorOverFilterSet = true;
        }
        this.filterSet = data
        this.showList();
      })
    }
  }

  getTypeahead(event: any) {
    this.f.name.setValue(event.name)
    this.f.email.setValue(event.email)
    this.isVisible = false;
    this.filterSet = [];
    // this.hideList();
  }

  setValue(value: any) {
    this.searchText = value;
    this.filterSet = [];
    this.filterSet.push(value);
    this.isCursorOverFilterSet = true;

    this.getTypeahead(value);
    // this.hideList();
    // this.isCursorOverFilterSet = true
  }

  showListReset() {
    this.isCursorOverFilterSet = false
    this.isVisible = true;
    this.filterSet = [];
    // this.isCursorOverFilterSet = false
  }

  trigger() {
    let element = document.getElementById('upload_filer') as HTMLInputElement;
    element.click();
  }

  onChange(file: any) {
    this.file = file.files[0];
    this.fileName = file.files[0].name;
  }

  removeFile() {
    this.file = null;
    this.fileName = '';
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    if (Array.isArray(this.f['categories'].value)) {
    } else {
      this.trigger()
    }
// this.f['categories'].value.length??this.trigger()
//     console.log(this.f['categories'].value)
  }

  onSave() {
    if (this.onToggleBulkUploader) {
      this.basicUpload()
    } else {
      this.sendInvite()
    }
  }

  basicUpload() {
    if (!this.selectedFile) {
      return
    }
    ;
    var formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    formData.append('categories', this.f['categories'].value);
    formData.append('study_id', this.studyInfo.study.id);

    this.participantsService.uploadCSV(formData).subscribe((data) => {

      console.log(data.message)
      this.selectedFile = null
      this.message = 'File uploaded successfully!';
      //setTimeout(()=> this.message = null,4500)
      // next: (event) => {
      //   if (event.type === HttpEventType.Response) {
      //     this.message = 'File uploaded successfully!';
      //   }
      // },

      // if (event.type === HttpEventType.UploadProgress) {
      //   this.percentDone = Math.round(100 * event.loaded / event.total);
      // } else if (event instanceof HttpResponse) {
      //   this.uploadSuccess = true;
      // }
    }, (error) => {
      this.showUpgradeNotification = true
      setTimeout(() => this.showUpgradeNotification = false, 4500)
      this.upgradeNotification = error.error.data;
      console.info(error.error.data.file);
    })
  }

  onToggleBulkUpload() {
    this.onToggleBulkUploader = !this.onToggleBulkUploader;
  }

  onReturnToParticipantList() {

  }
}
