import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ParticipantsService} from "../../_services";
import {data} from "autoprefixer";

@Component({
  selector: 'app-edit-multi-select-dropdown',
  templateUrl: './edit-multi-select-dropdown.component.html',
  styleUrls: ['./edit-multi-select-dropdown.component.css']
})
export class EditMultiSelectDropdownComponent {
  @Input() list:any[] =[];
  @Input() edit:any[] =[];
  @Input() editDetails:any[] =[];
  @Output() updateUserCategories = new EventEmitter();
  @Output() shareCheckedList = new EventEmitter();
  //@Output() shareIndividualCheckedList = new EventEmitter();
  @Output() removeIndividualCheckedList = new EventEmitter();

  checkedList : any=[];
  currentSelected  = {};
  listChecked:any=[];
  listIds: any = [];
  detailsId: any = [];
  showDropDown = false
  newDetails: any = []
  newList: any = []
checked:boolean = true
  constructor(private participantsService: ParticipantsService,) {
    this.checkedList = [];
    this.newDetails = [];
  }
  ngOnInit() {
    this.getUsersCategories()

  }




  getUsersCategories(){
    this.newDetails = [];
    this.participantsService.getUserEditCategories().subscribe((data) => {
      this.newDetails = [];
      this.listChecked = []
var i=0
    data.forEach((c: any) => {
      c['checked']?
        this.getSelectedValueCopy(true, c['name'] , c['id'] , i++, 'null') : ''
      i= i+1
     })
      this.newDetails = data
     this.shareCheckedlist()
    })
  }


  getSelectedValueCopy(status: Boolean, category_name: string, category_id: string, ind: number, list: string) {
    if (status) {
      this.listChecked.push(category_id);
    }
  }
  getSelectedValue(status: Boolean, category_name: string, category_id: string, ind: number, list: string) {
    if (status) {
      this.listChecked.push(category_id);
    } else {
      var index = this.checkedList.indexOf(category_name);
      this.checkedList.splice(index, 1);
        this.listChecked.splice(index, 1);
      this.removeIndividualStatus(category_name)
      this.removeIndividualStatus(category_id)
    }
      this.shareCheckedlist()
  }

  shareCheckedlist() {
    this.shareCheckedList.emit(this.listChecked);
  }

  // shareIndividualStatus() {
  //   this.shareIndividualCheckedList.emit(this.currentSelected);
  // }

  removeIndividualStatus(id: any) {
    this.removeIndividualCheckedList.emit(id);
  }

  addToSurvey() {
    this.newDetails = []
    this.updateUserCategories.emit()
  }
}
