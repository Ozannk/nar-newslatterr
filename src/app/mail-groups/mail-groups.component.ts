import { Component, OnInit } from '@angular/core';
import { MailGroupService } from '../mail-group.service';
import {ActivatedRoute, Router} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-mail-groups',
  templateUrl: './mail-groups.component.html',
  styleUrls: ['./mail-groups.component.css']
})
export class MailGroupsComponent implements OnInit {

  email= new FormControl('',[
    Validators.required,
    Validators.email
  ]);

  selectedId = 0;
  MailGroup : any = [];
  MailList : any = [];
  MailDetail = {name:'', edas:'', mailAddress:''};
  MailGroupsDetails = {name:'', tag:'', mailList: []};
  booleanCheck = false;

  page: number = 1;
  count: number = 0;
  tableSize: number = 10 ;
  tableSizes: any = [5, 10, 15, 20]

  constructor(
    public mailGroupService: MailGroupService,
    public router: Router,
    public actRoute: ActivatedRoute,
    ){ }

  ngOnInit(): void {
    this.loadMailGroup();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.loadMailGroup();
  }

  onTableSizeChange(event: any): void{
    this.tableSize = event.target.value ;
    this.page = 1;
    this.loadMailGroup();
  }

  //method ismini güncelle
  a(item: any) {
    if (item == this.MailList.name){
      return true;
    }
    else{
      return false;
    }
  }

  selectRow(item: any){
    this.selectedId= item.id;
    this.MailGroupsDetails.name = item.name;
    this.MailGroupsDetails.tag = item.tag;
    this.MailList = item.mailList;
    this.MailGroupsDetails.mailList = item.mailList;
  }

  loadMailGroup() {
    return this.mailGroupService.getMailGroups().subscribe((data: {}) => {
      this.MailGroup = data;
    });
  }

  saveMailGroup() {
    if (this.selectedId === 0) {
      this.mailGroupService.saveMailGroups(this.MailGroupsDetails).subscribe((_data: {}) => {

        this.loadMailGroup();
      });
    } else {

      if (window.confirm('Are you sure, you want to update?')) {
        this.mailGroupService.updateMailGroups(this.selectedId, this.MailGroupsDetails).subscribe(_data => {
          this.loadMailGroup();
        })
      }
    }
  }

  deleteMailGroup(id: any) {
    if (window.confirm('Silmek istediğinize emin misiniz?')) {
      this.mailGroupService.deleteMailGroups(id).subscribe((_data) => {
        this.loadMailGroup();
      });
    }
  }

  addMail(){
    this.MailList.push(Object.assign({}, this.MailDetail));
  }

  removeMail(index: number){
    this.MailList.splice(index, 1);
  }
}

