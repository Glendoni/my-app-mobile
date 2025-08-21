import { Component,Input,Output,EventEmitter,OnInit } from '@angular/core';


@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.css']
})
export class MultiSelectDropdownComponent implements OnInit{
  @Input() list:any[] =[];

  @Output() shareCheckedList = new EventEmitter();
  @Output() shareIndividualCheckedList = new EventEmitter();
  @Output() removeIndividualCheckedList = new EventEmitter();

  checkedList : any=[];
  currentSelected  = {};
  listChecked:any=[];
  showDropDown = false

  constructor() {
    this.checkedList = [];


  }
ngOnInit() {

}

  getSelectedValue(status:Boolean,value:string, category_id:string, ind:number,list:string){
  //console.log('status ' +status)
    if(status){
      //console.log(value)

      this.checkedList.push(value);
      this.listChecked.push(category_id);
      this.currentSelected = {checked : status,name:value,category_id:category_id,ind:ind};
      //share individual selected item
      this.shareIndividualStatus();
      //share checked list
      this.shareCheckedlist();

        list = list
    //  console.log(list)
    }else{
      //console.log(value)
      var index = this.checkedList.indexOf(value);
      this.checkedList.splice(index,1);
      this.listChecked.splice(index,1);
      this.removeIndividualStatus(value)
      this.removeIndividualStatus(category_id)
    }
  }
  shareCheckedlist(){
    console.log('this.listChecked ')
    console.log('this.listChecked ')
    this.shareCheckedList.emit(this.listChecked);
  //  this.shareCheckedList.emit(this.listChecked);
  }
  shareIndividualStatus(){

   // console.log('this.listChecked ')
    this.shareIndividualCheckedList.emit(this.currentSelected);
  }

  removeIndividualStatus(id:any){
    this.removeIndividualCheckedList.emit(id);
  }
}
