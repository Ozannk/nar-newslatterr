import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {MailGroup} from './class/mail-group';

@Injectable({
  providedIn: 'root'
})
export class MailGroupService {

  mailGroupUrl = 'http://10.200.20.81:8080';

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  getMailGroups(): Observable<Array<MailGroup>> {
    return this.http
      .get<MailGroup[]>(this.mailGroupUrl + '/mailGroups')
  }

  getMailGroup(id: any): Observable<MailGroup> {
    return this.http
      .get<MailGroup>(this.mailGroupUrl + '/mailGroups/' + id)
  }

  saveMailGroups(_mailGroup: any): Observable<MailGroup> {
    return this.http
      .post<MailGroup>(
        this.mailGroupUrl + '/mailGroups',
        JSON.stringify(_mailGroup),
        this.httpOptions
      )
  }

  updateMailGroups(id: any, _mailGroup: any): Observable<MailGroup> {
    return this.http
      .put<MailGroup>(
        this.mailGroupUrl + '/mailGroups/' + id,
        JSON.stringify(_mailGroup),
        this.httpOptions
      )
  }

  deleteMailGroups(id: any) {
    return this.http
      .delete<MailGroup>(
        this.mailGroupUrl + '/mailGroups/' + id
      )
  }
}
