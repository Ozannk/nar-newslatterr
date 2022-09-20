import {Component, Input, OnInit} from '@angular/core';
import {MailGroupService} from "../mail-group.service";
import {MailGroup} from "../class/mail-group";
import {MailTemplateService} from "../mail-template.service";
import {MailTemplate} from "../class/mail-template";
import {SendMail} from "../class/send-mail";
import { MailLog } from '../class/mail-log';
import { SendMailService } from '../send-mail.service';



@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit {


  mailGroups: Array<MailGroup> = [];
  mailTemplates: Array<MailTemplate> = [];
  selectedMailGroups: Array<MailGroup> = [];
  selectedMailTemplate: MailTemplate = new MailTemplate();
  mailLogs: Array<MailLog> = [];
  requestCode: string | undefined;
  alert:boolean=false;

  constructor(
    private mailGroupService: MailGroupService,
    private mailTemplateService: MailTemplateService,
    private sendMailService: SendMailService) {
  }

  ngOnInit(): void {
    this.mailGroupService.getMailGroups().subscribe(res => {
      this.mailGroups = res;
    });
    this.mailTemplateService.getMailTemplates().subscribe(res => this.mailTemplates = res);
  }

  sendMail() {
    if (this.selectedMailGroups.length > 0) {
      for (const element of this.selectedMailGroups) {
        let sendMailModel = new SendMail();
        sendMailModel.mailGroupId = element.id;
        sendMailModel.templateId = this.selectedMailTemplate.id;
        this.alert=true;
        this.sendMailService.sendMail(sendMailModel).subscribe(res => console.log(res.error),
            error => {
              //clean code değil requestCode html bağlamak için yaptık
              this.requestCode = error.error.text;

              this.sendMailService.trackMail(error.error.text).subscribe(res=>{
                console.log(res);
              });
            });
      }
    }
  }

  closeAlert(){
    this.alert = false;
  }
}


