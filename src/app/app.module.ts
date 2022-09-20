import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EditorModule } from '@tinymce/tinymce-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { SendMailComponent } from './send-mail/send-mail.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MailTemplateFormComponent } from './mail-template-form/mail-template-form.component';
import { MailGroupsComponent } from './mail-groups/mail-groups.component';
import { MailHistoryComponent } from './mail-history/mail-history.component';
import { NgSelectModule } from "@ng-select/ng-select";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SendMailComponent,
    MailTemplateFormComponent,
    MailGroupsComponent,
    MailHistoryComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EditorModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatPaginatorModule,
    NgxPaginationModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}

