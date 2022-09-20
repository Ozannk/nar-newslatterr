import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MailTemplate} from './class/mail-template';
import {Observable} from 'rxjs';
import {SendMail} from "./class/send-mail";

@Injectable({
  providedIn: 'root'
})

export class MailTemplateService {

  mailUrl = 'http://10.200.20.81:8080';


  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };


  getMailTemplates(): Observable<Array<MailTemplate>> {
    return this.http
      .get<MailTemplate[]>(this.mailUrl + '/mailTemplates')
  }

  getMailTemplate(id: any): Observable<MailTemplate> {
    return this.http
      .get<MailTemplate>(this.mailUrl + '/mailTemplates/' + id)
  }

  saveMailTemplates(mailTemplate: any): Observable<MailTemplate> {
    return this.http
      .post<MailTemplate>(
        this.mailUrl + '/mailTemplates',
        JSON.stringify(mailTemplate),
        this.httpOptions
      )
  }

  updateMailTemplates(id: any, mailTemplate: any): Observable<MailTemplate> {
    return this.http
      .put<MailTemplate>(
        this.mailUrl + '/mailTemplate/' + id,
        JSON.stringify(mailTemplate),
        this.httpOptions
      )

  }

  deleteMailTemplates(id: any) {
    return this.http
      .delete<MailTemplate>(
        this.mailUrl + '/mailTemplate/' + id
      )
  }

}
