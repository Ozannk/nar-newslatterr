import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {SendMail} from "./class/send-mail";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { MailLog } from './class/mail-log';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  mailTemplateUrl = 'http://10.200.20.81:8080';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  sendMail(sendMailModel: SendMail): Observable<any> {
    return this.http
      .post<any>(
        this.mailTemplateUrl + '/sendingMail',
        JSON.stringify(sendMailModel),
        this.httpOptions
      );
  }
  trackMail(uid: string): Observable<any> {
    return this.http
      .post<any>(
        this.mailTemplateUrl + '/trackMail/'+uid,null,
        this.httpOptions
      );
  }
}
