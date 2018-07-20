import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { Guid } from "guid-typescript";

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { QuestionComponent } from './question/question.component';
import { SubmissionComponent } from './submission/submission.component';
import { TabComponent } from './tab/tab.component';
import { SubmissionDetailsComponent } from './submission-details/submission-details.component';
import { SectionComponent } from './section/section.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    SubmissionComponent,
    TabComponent,
    SubmissionDetailsComponent,
    SectionComponent
  ],
  imports: [
    NgxJsonViewerModule,
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    SubmissionComponent,
    QuestionComponent,
    TabComponent
  ]
})
export class AppModule { }
