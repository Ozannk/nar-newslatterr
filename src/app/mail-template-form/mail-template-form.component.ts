import {Component, OnInit} from '@angular/core';
import {MailTemplateService} from '../mail-template.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-mail-template-form',
  templateUrl: './mail-template-form.component.html',
  styleUrls: ['./mail-template-form.component.css']
})
export class MailTemplateFormComponent implements OnInit {
  selectedId = 0;
  mailTemplateDetails = {name: '', title: '', content: '', attachments: []};
  MailTemplate: any = [];
  id = this.actRoute.snapshot.params['id'];
  mailTemplateData: any = {};

  page: number = 1;
  count: number = 0;
  tableSize: number = 10 ;
  tableSizes: any = [5, 10, 15, 20]

  constructor(
    public mailTemplateService: MailTemplateService,
    public router: Router,
    public actRoute: ActivatedRoute,) {
  }

  ngOnInit() {
    this.loadMailTemplate();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.loadMailTemplate();
  }

  onTableSizeChange(event: any): void{
    this.tableSize = event.target.value ;
    this.page = 1;
    this.loadMailTemplate();
  }

  updateLoadMailTemplate(item: any) {
    this.selectedId = item.id;
    this.mailTemplateDetails.name = item.name;
    this.mailTemplateDetails.title = item.title;
    this.mailTemplateDetails.content = item.content;
    this.mailTemplateDetails.attachments = item.attachments;
  }

  loadMailTemplate() {
    return this.mailTemplateService.getMailTemplates().subscribe((data: {}) => {
      this.MailTemplate = data;
    });
  }

  deleteMailTemplate(id: any) {
    if (window.confirm('Silmek istediğinize emin misiniz?')) {
      this.mailTemplateService.deleteMailTemplates(id).subscribe((_data) => {
        this.loadMailTemplate();
      });
    }
  }

  saveMailTemplate() {
    if (this.selectedId === 0) {
      this.mailTemplateService.saveMailTemplates(this.mailTemplateDetails).subscribe((_data: {}) => {
        this.clearForm();
        this.loadMailTemplate();
      });
    } else {
      if (window.confirm('Are you sure, you want to update?')) {
        this.mailTemplateService.updateMailTemplates(this.selectedId, this.mailTemplateDetails).subscribe(_data => {
          this.clearForm();
          this.loadMailTemplate();
        })
      }
    }

  }

  clearForm() {
    this.selectedId = 0;
    this.mailTemplateDetails = {name: '', title: '', content: '', attachments: []};
  }

  isClear(): boolean {
    return !(this.selectedId === 0 && this.mailTemplateDetails.name === ''
      && this.mailTemplateDetails.title === '' && this.mailTemplateDetails.content === '');
  }
}
