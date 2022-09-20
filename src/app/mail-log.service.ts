import { Injectable } from '@angular/core';
import {catchError, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { MailLog } from './class/mail-log';
import { FilterMail } from './class/track-mail';


@Injectable({
  providedIn: 'root'
})
export class MailLogService {

  mailUrl = 'http://10.200.20.81:8080';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getMailLogs(): Observable<Array<MailLog>> {
  return this.http
      .post<MailLog[]>(this.mailUrl + '/mailLogs',this.httpOptions)
  }

  getMailLogsFilter(selectedFilter: FilterMail): Observable<Array<MailLog>> {
    return this.http
      .post<MailLog[]>(this.mailUrl + '/mailLogs',JSON.stringify(selectedFilter),this.httpOptions)
  }

  listMailLogs(trackMailModel: FilterMail): Observable<any> {
    return this.http.post<any>(this.mailUrl + '/mailLogs' + JSON.stringify(trackMailModel),this.httpOptions)
  }
}
