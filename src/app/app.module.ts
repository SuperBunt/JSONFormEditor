import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { Guid } from "guid-typescript";

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import {Component} from "@angular/core";
import { SelectDropDownModule } from 'ngx-select-dropdown'

import { QuestionComponent } from './question/question.component';
import { SubmissionComponent } from './submission/submission.component';
import { TabComponent } from './tab/tab.component';
import { SubmissionDetailsComponent } from './submission-details/submission-details.component';
import { SectionComponent } from './section/section.component';

import { SubmissionService } from './submissionService.service';
import { ConditionPropertiesComponent } from './condition-properties/condition-properties.component';
import { ConditionComponent } from './condition-properties/condition/condition.component'

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    SubmissionComponent,
    TabComponent,
    SubmissionDetailsComponent,
    SectionComponent,
    ConditionPropertiesComponent,
    ConditionComponent
  ],
  imports: [
    NgxJsonViewerModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    SelectDropDownModule
  ],
  providers: [
    SubmissionService
  ],
  bootstrap: [
    AppComponent,
    SubmissionComponent,
    QuestionComponent,
    TabComponent
  ]
})
export class AppModule { }
