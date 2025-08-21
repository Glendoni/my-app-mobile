import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {ParticipantsService} from "../../_services";

@Component({
  selector: 'app-edit-multiple-select-dropdown-participant',
  templateUrl: './edit-multiple-select-dropdown-participant.component.html',
  styleUrls: ['./edit-multiple-select-dropdown-participant.component.css']
})
export class EditMultipleSelectDropdownParticipantComponent {

  @Input() list: any[] = ['one', 'two'];
  @Input() editDetails: any[] = [];
  @Output() updateUserCategories = new EventEmitter();
  @Output() shareCheckedList = new EventEmitter();
  @Output() shareIndividualCheckedList = new EventEmitter();
  @Output() removeIndividualCheckedList = new EventEmitter();

  checkedList: any = [];
  currentSelected = {};
  listChecked: any = [];
  showDropDown = false

  constructor(private participantsService: ParticipantsService, private elem: ElementRef) {
    this.checkedList = [];
    this.list = []
  }

  resetMyForm() {
    this.list.forEach((c: any) => {
      c['checked'] = false
    })
  }

  ngOnInit() {

    this.participantsService.getResetCategories().subscribe((data) => {

      if (data) {
        this.checkedList = [];
        this.listChecked = []
        this.resetMyForm()
      }
    })
  }

  getSelectedValue(status: Boolean, value: string = '', category_id: string = '', ind: any = 0, list: string = '') {

  console.log(this.checkedList)
  console.log(this.listChecked)


    if (status) {
      this.checkedList.push(value);
      this.listChecked.push(category_id);
      this.currentSelected = {checked: status, name: value, category_id: category_id, ind: ind};
      //share individual selected item
      this.shareIndividualStatus();
      //share checked list
      this.shareCheckedlist();
    } else {
      var index = this.checkedList.indexOf(value);
      this.checkedList.splice(index, 1);
      this.listChecked.splice(index, 1);
      this.removeIndividualStatus(value)
      this.removeIndividualStatus(category_id)
    }
  }

  shareCheckedlist() {
    this.shareCheckedList.emit(this.listChecked);
  }

  shareIndividualStatus() {
    this.shareIndividualCheckedList.emit(this.currentSelected);
  }

  removeIndividualStatus(id: any) {
    this.removeIndividualCheckedList.emit(id);
  }

  addToSurvey(item: any) {
    this.updateUserCategories.emit(item)
  }
}
