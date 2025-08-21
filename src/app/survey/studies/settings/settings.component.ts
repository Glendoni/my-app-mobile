import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {QuestionService} from "../../../_services/question.service";
import {StudyService} from "../../../_services";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  @Input() new_study: boolean = false;
  @Input() studyInfo: any = [];
  @Output() toggleSettings = new EventEmitter<object>();
  @Output() addStudyRestriction = new EventEmitter<string>();
  @Output() toggleSettingsCr = new EventEmitter<any>();
  public surveyForm: any = FormGroup
  public replicateForm: any = FormGroup
  showCancelButton = false;
  disabled: boolean = false;
  state = false;
  url: string = ''
  isLocal: boolean = false

  public qrCodeImg: any;
  submitted: boolean = false
  replicateSubmitted: boolean = false

  public hideUI: boolean = false;
  public safeForLater: any;

  constructor(private fb: FormBuilder, private qs: QuestionService, private studyService: StudyService) {
  }

  sectionTitle: any;
  nrSelect:any
  nrSelected:any
  nrSelectType:any
  City: any = ['Technology', 'Sports', 'Politics', 'Education', 'Business','Hospitality','Business', 'Medical', 'Social', 'Transportation', 'Property','Music', 'Travel', 'Food', 'Recruitment','Games','Television']
  surveyTypes: any = ['Private', 'Public & Private Access']
  hostEnv: string = ''

  modelHeader: string = ''
  modelBody: string = ''
  modelBtn: string = ''
  modelStatus: number = 0
  clear: boolean = false
  upgradeNotification: any;
  showUpgradeNotification: boolean =false;

  ngOnInit() {

    this.nrSelectType =''
    this.nrSelected =''
    if (!this.new_study) {


      if (this.studyInfo['study']['type_of_survey'] == 2) {
        this.nrSelectType = 2
        this.disabled = true
      } else {

        this.disabled = false
      }
    }

    this.surveyForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(80)]],
      description: ['', [Validators.required, Validators.maxLength(5000)]],
      sectors: [],
      active: [false],
      study_sectors: ['', [Validators.required]],
      type_of_survey: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      min_number_of_participants: ['1', [Validators.required]],
      max_number_of_participants: ['100', [Validators.required]],
      studyId: ['', [Validators.required]],
      save_for_later: [false],
      showQrCodeOnFrontEnd:[false],
      qrCodeParticipantSingleComplete:[true]
    });
    var study = ''
if(this.studyInfo) {
  study = this.studyInfo.study.id
}
    this.replicateForm = this.fb.group({
      studyName: ['', [Validators.required]],
      study_id: [study, [Validators.required]],
      typeOfSurvey: ['', [Validators.required]],

    });


    if (!this.new_study) { //add server patching
      this.studyService.getPortalStudy(this.studyInfo.study.id).subscribe((data: any) => {
        data = data.data
        try {
          data.qrPublicLink['data'][0] ? this.setQrUrl(data.qrPublicLink['data'][0]) : null
        } catch (e) {

        }


        const settings = data.settings
        const study = data.study
        if (study.active == 2 || study.active == 3) {
          this.f.active.setValue(false)
        } else {
          this.f.active.setValue(study.active)
        }
        this.safeForLater = true
        this.f.studyId.setValue(study.id)
        this.f.name.setValue(study.name)
        this.f.type_of_survey.setValue(study.type_of_survey)

        this.f.start_date.setValue(settings.start_date)
        this.f.end_date.setValue(settings.end_date)
        this.f.description.setValue(settings.description)
        this.f.showQrCodeOnFrontEnd.setValue(settings.show_qr_code_on_front_end)
        this.f.qrCodeParticipantSingleComplete.setValue(settings.qrcode_single_session_complete??false)
        this.f.study_sectors.setValue(settings.study_sectors[0])
        this.f.min_number_of_participants.setValue(settings.min_number_of_participants)
        this.f.max_number_of_participants.setValue(settings.max_number_of_participants)
        this.f.save_for_later.setValue(false)
        if (this.safeForLater) {
          this.f.save_for_later.setValue(settings.save_for_later ?? false)
        }
       this.studyService.setActiveMode(study.active)

      })
    } else {
      this.f.active.setValue(false)
      this.hideUI = false
      this.f.studyId.setValue('newStudy')
      this.studyService.checkStudyUsage().subscribe((data) => {
        },
        (error) => {
        console.log(error.error.data)
          this.addStudyRestriction.emit(error.error.data);


          // This block will only execute if catchError is used
          // console.info('Error handler:', error.error.data);
        }
      )
      this.sectionTitle = 'Add Study'
      this.showCancelButton = true;
    }

    this.isLocal = this.studyService.checkIfLocal();
  }

  get f() {
    return this.surveyForm.controls;
  }

  get r() {
    return this.replicateForm.controls;
  }

  setQrUrl(url: string) {
    this.url = url
  }

  onUpdate() {

    if (this.surveyForm.invalid) {
      this.submitted = true;
      return;
    }

    if (!this.new_study) {
      this.studyService.updateNewStudy(this.surveyForm.value, this.studyInfo.study.id).subscribe((data: any) => {

        console.log('I was strong strong')
        console.log(data.data)
        this.studyService.setStudyRefresher([data]);

        //this.toggleSettings.emit(data);

        this.toggleSettings.emit(data.data);
        this.dismissAddStudy()
      })

    } else {
      this.studyService.addNewStudy(this.surveyForm.value).subscribe((data: any) => {
        console.log(data.data)
        this.studyService.setStudyRefresher([data]);
        this.toggleSettingsCr.emit(data.data);
      })
    }
   //
  }

  dismissAddStudy() {
    this.qs.setRedirectToDashboard()
  }

  removeStudyModal() {
    this.modelStatus = 1
    this.modelHeader = 'Delete Study '
    this.modelBtn = 'DELETE'
    this.modelBody = 'Are you sure you would like to remove this study?'
  }

  archiveStudyModal() {
    this.modelStatus = 3
    this.modelHeader = 'Archive Study '
    this.modelBtn = 'ARCHIVE'
    this.modelBody = 'Are you sure you would like to archive this study?'
  }

  replicateStudyModal() {
    this.modelStatus = 6
    this.modelHeader = 'Replicate Study '
    this.modelBtn = 'REPLICATE STUDY'
    this.modelBody = 'New replicated study will exclude participants!'
  }

  purgeStudyModal() {
    this.modelStatus = 4
    this.modelHeader = 'Purge   Data'
    this.modelBtn = 'Purge Data'
    this.modelBody = 'This action will only remove participant answers for this study that were captured in Development-Mode?'
  }

  restoreStudyModal() {
    this.modelStatus = 2
    this.modelHeader = 'Restore Study'
    this.modelBtn = 'RESTORE'
    this.modelBody = 'Restored study status will be changed to In-Development'
  }


  onPurgeTestData() {
    this.studyService.purgeTestData(this.studyInfo.study.id).subscribe((data) => {
    })
  }

  modelAction() {
    this.showUpgradeNotification = false

    if (this.modelStatus == 1) {
      this.studyService.removeStudy(this.studyInfo.study.id).subscribe((data) => {
        this.setRedirect()
      })
    }
    if (this.modelStatus == 3) {
      this.studyService.archiveStudy(this.studyInfo.study.id).subscribe((data) => {
        this.setRedirect()
      })
    }
    if (this.modelStatus == 2) {
      this.studyService.restoreStudy(this.studyInfo.study.id).subscribe((data) => {
        this.setRedirect()
      })
    }

    if (this.modelStatus == 4) {
      this.studyService.purgeTestData(this.studyInfo.study.id).subscribe((data) => {
        this.setRedirect()
      })
    }
    if (this.modelStatus == 6) {

      this.replicateSubmitted = true
      if (!this.replicateForm.valid) {
        return;
      }
      this.clear = true
      this.modelBtn = 'REPLICATING...'
      this.studyService.replicateStudy(this.replicateForm.value).subscribe((data) => {
        this.modelBtn = 'REPLICATE STUDY'
        this.replicateSubmitted = false
        this.setRedirect()
      },(error)=>{
        this.showUpgradeNotification = error
        this.upgradeNotification = {"usageCheck" : error.error['data']}
      })
    }
  }


  setRedirect() {
    setTimeout(() => window.location.replace('survey'), 4500)
  }
}
