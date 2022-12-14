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

  loadMailGroups() {//t??m mail gruplar??n?? ??ekiyoruz
    return this.mailGroupService.getMailGroups().subscribe((data: MailGroup[]) => {
      this.mailGroups = data;
    });
  }

  loadMailTemplates() {//t??m mail templatelerini ??ekiyoruz
    return this.mailTemplateService.getMailTemplates().subscribe((data: MailTemplate[]) => {
      this.mailTemplates = data;
    });
  }

  loadMailLogs() {
    return this.mailLogService.getMailLogs().subscribe((data: MailLog[]) => {
      this.mailHistoryDetails = data;
    });
  }

  onChangeMailGroup(event: MailGroup[]) {//mail grubu her se??ildi??inde bu metod ??al??????yor
    this.mailDetails = [];
    let trackMailModel = new FilterMail();
    this.page=1;

    if (this.selectedStatus != "")
      trackMailModel.status = this.selectedStatus;
    event.forEach(mailGroup => {//burada se??ilen t??m mail gruplar?? i??in sorgu yap??lacak
      if (this.selectedMailTemplates == null || this.selectedMailTemplates.length == 0) {
        trackMailModel.mailGroupId = mailGroup.id;
        this.getFilterMailLogs(trackMailModel);
      }
      else {
        this.mailTemplates.forEach(mailTemplate => {//se??ilen mail temlatei olmad?????? i??in t??m mail templatelerine g??re sorgu ??al????acak
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

    if (this.selectedStatus != "") { //selectedstatus se??ilmediyse
      let trackMailModel = new FilterMail(); // sorgu i??in yeni nesnemizi olu??turduk
      trackMailModel.status = this.selectedStatus; // nesnemizdeki stat??y?? selectedStatus'e e??itledik
      if ((this.selectedMailGroups == null || this.selectedMailGroups.length == 0) && (this.selectedMailTemplates == null || this.selectedMailTemplates.length == 0)) { //e??er sadece statu se??ilmi??se stat??ye g??re arama yap
        this.getFilterMailLogs(trackMailModel);
      }
      else if ((this.selectedMailGroups != null && this.selectedMailGroups.length > 0) && (this.selectedMailTemplates == null || this.selectedMailTemplates.length == 0)) { // e??er stat?? ve mailgroup se??ilmi?? mailtemplate se??ilmemi??se ona g??re arama yap
        this.selectedMailGroups.forEach(mailGroup => {
          trackMailModel.mailGroupId = mailGroup.id; // idleri e??itleyip ona g??re sorgu yap??l??r
          this.getFilterMailLogs(trackMailModel);
        });
      }
      else if ((this.selectedMailTemplates != null && this.selectedMailTemplates.length > 0) && (this.selectedMailGroups == null || this.selectedMailGroups.length == 0)) { // stat?? ve mailtemplate'e g??re se??ilmi?? mailgruba g??re se??ilmemi??se ona g??re arama yap
        this.selectedMailTemplates.forEach(mailTemplate => {
          trackMailModel.mailTemplateId = mailTemplate.id;
          this.getFilterMailLogs(trackMailModel);
        });
      }
      else {
        this.selectedMailGroups.forEach(mailGroup => {
          this.selectedMailTemplates.forEach(mailTemplate => { //?????? se??ilmi??se ona g??re arama yap
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

    if (this.selectedStatus != "") // e??er status se??ilmi??se
      trackMailModel.status = this.selectedStatus; // statusleri e??itle
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

