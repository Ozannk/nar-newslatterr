import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MailGroupsComponent } from './mail-groups/mail-groups.component';
import { MailHistoryComponent } from './mail-history/mail-history.component';
import { MailTemplateFormComponent } from './mail-template-form/mail-template-form.component';
import {SendMailComponent} from "./send-mail/send-mail.component";

const routes: Routes = [

  {path: '', component: SendMailComponent},
  {path: 'mail-template-form', component: MailTemplateFormComponent},
  {path: 'mail-groups', component: MailGroupsComponent},
  {path: 'mail-history', component: MailHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
