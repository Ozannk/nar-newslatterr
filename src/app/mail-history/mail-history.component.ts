import { Component, OnInit } from '@angular/core';
import { MailLogService } from '../mail-log.service';
import { MailGroupService } from '../mail-group.service';
import { MailTemplateService } from '../mail-template.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MailLog } from '../class/mail-log';
import { MailGroup } from '../class/mail-group';
import { MailTemplate } from '../class/mail-template';
import { Input } from '@angular/core';
import { FilterMail } from '../class/track-mail';

@Component({
  selector: 'app-mail-history',
  templateUrl: './mail-history.component.html',
  styleUrls: ['./mail-history.component.css']
})
export class MailHistoryComponent implements OnInit {

  @Input()
  mailHistoryDetails: Array<MailLog> = [];
  selectedFilter = { templateId: '', mailGroupId: '', status: "" };
  mailDetails: Array<MailLog> = [];
  mailGroups: Array<MailGroup> = [];
  mailTemplates: Array<MailTemplate> = [];
  requestCode: any;
  selectedMailGroups: Array<MailGroup> = [];
  selectedMailTemplates: Array<MailTemplate> = [];
  denemeMailLog: any = [];
  selectedMailStatus: any;
  selectedStatus: string = "";

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20]

  constructor(private mailLogService: MailLogService,
    private mailGroupService: MailGroupService,
    private mailTemplateService: MailTemplateService,
    public router: Router,
    public actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMailTemplates();
    this.loadMailGroups();
    this.getMails();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.loadMailGroups();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.loadMailGroups();
  }

  getMails() {
    return this.mailLogService.getMailLogs().subscribe((data: any[]) => {
      data.forEach(element => {
        this.mailTemplateService.getMailTemplate(element.mailTemplateId).subscribe(res => {
          element.templateName = res.name;
        });
      });
      this.mailDetails = data;
    });
  }

  loadMailGroups() {//tüm mail gruplarını çekiyoruz
    return this.mailGroupService.getMailGroups().subscribe((data: MailGroup[]) => {
      this.mailGroups = data;
    });
  }

  loadMailTemplates() {//tüm mail templatelerini çekiyoruz
    return this.mailTemplateService.getMailTemplates().subscribe((data: MailTemplate[]) => {
      this.mailTemplates = data;
    });
  }

  loadMailLogs() {
    return this.mailLogService.getMailLogs().subscribe((data: MailLog[]) => {
      this.mailHistoryDetails = data;
    });
  }

  onChangeMailGroup(event: MailGroup[]) {//mail grubu her seçildiğinde bu metod çalışıyor
    this.mailDetails = [];
    let trackMailModel = new FilterMail();
    this.page=1;

    if (this.selectedStatus != "")
      trackMailModel.status = this.selectedStatus;
    event.forEach(mailGroup => {//burada seçilen tüm mail grupları için sorgu yapılacak
      if (this.selectedMailTemplates == null || this.selectedMailTemplates.length == 0) {
        trackMailModel.mailGroupId = mailGroup.id;
        this.getFilterMailLogs(trackMailModel);
      }
      else {
        this.mailTemplates.forEach(mailTemplate => {//seçilen mail temlatei olmadığı için tüm mail templatelerine göre sorgu çalışacak
          trackMailModel.mailGroupId = mailGroup.id;
          trackMailModel.mailTemplateId = mailTemplate.id;
          this.getFilterMailLogs(trackMailModel);
        });
      }
    });
  }

  onChangemailStatus(event: any) {
    this.mailDetails = [];
    this.selectedStatus = event;
    this.page=1;

    if (this.selectedStatus != "") { //selectedstatus seçilmediyse
      let trackMailModel = new FilterMail(); // sorgu için yeni nesnemizi oluşturduk
      trackMailModel.status = this.selectedStatus; // nesnemizdeki statüyü selectedStatus'e eşitledik
      if ((this.selectedMailGroups == null || this.selectedMailGroups.length == 0) && (this.selectedMailTemplates == null || this.selectedMailTemplates.length == 0)) { //eğer sadece statu seçilmişse statüye göre arama yap
        this.getFilterMailLogs(trackMailModel);
      }
      else if ((this.selectedMailGroups != null && this.selectedMailGroups.length > 0) && (this.selectedMailTemplates == null || this.selectedMailTemplates.length == 0)) { // eğer statü ve mailgroup seçilmiş mailtemplate seçilmemişse ona göre arama yap
        this.selectedMailGroups.forEach(mailGroup => {
          trackMailModel.mailGroupId = mailGroup.id; // idleri eşitleyip ona göre sorgu yapılır
          this.getFilterMailLogs(trackMailModel);
        });
      }
      else if ((this.selectedMailTemplates != null && this.selectedMailTemplates.length > 0) && (this.selectedMailGroups == null || this.selectedMailGroups.length == 0)) { // statü ve mailtemplate'e göre seçilmiş mailgruba göre seçilmemişse ona göre arama yap
        this.selectedMailTemplates.forEach(mailTemplate => {
          trackMailModel.mailTemplateId = mailTemplate.id;
          this.getFilterMailLogs(trackMailModel);
        });
      }
      else {
        this.selectedMailGroups.forEach(mailGroup => {
          this.selectedMailTemplates.forEach(mailTemplate => { //üçü seçilmişse ona göre arama yap
            trackMailModel.mailGroupId = mailGroup.id;
            trackMailModel.mailTemplateId = mailTemplate.id;
            this.getFilterMailLogs(trackMailModel);
          });
        });
      }
    }
  }

  onChangemailTemplates(event: MailTemplate[]) {
    this.mailDetails = [];
    let trackMailModel = new FilterMail();
    this.page=1;

    if (this.selectedStatus != "") // eğer status seçilmişse
      trackMailModel.status = this.selectedStatus; // statusleri eşitle
    event.forEach(mailTemplate => {
      if (this.selectedMailGroups == null || this.selectedMailGroups.length == 0) {
        trackMailModel.mailTemplateId = mailTemplate.id;
        this.getFilterMailLogs(trackMailModel);
      }
      else {
        this.mailGroups.forEach(mailGroup => {
          trackMailModel.mailGroupId = mailGroup.id;
          trackMailModel.mailTemplateId = mailTemplate.id;
          this.getFilterMailLogs(trackMailModel);
        });
      }
    });
  }

  getFilterMailLogs(selectedFilter: FilterMail) {
    this.mailLogService.getMailLogsFilter(selectedFilter).subscribe(res => {
      res.forEach((element: MailLog) => {
        this.mailTemplateService.getMailTemplate(element.mailTemplateId).subscribe(res => {
          element.templateName = res.name;
        });
        this.mailDetails.push(element);
      });
    });
  }
}

