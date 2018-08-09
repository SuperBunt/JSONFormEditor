
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { Guid } from "guid-typescript";

import { AppComponent } from './app.component';
import {Component} from "@angular/core";
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatRadioModule, MatTooltipModule, MatSlideToggleModule } from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';

import { FlexLayoutModule } from '@angular/flex-layout';

import { QuestionComponent } from './question/question.component';
import { SubmissionComponent } from './submission/submission.component';
import { TabComponent } from './tab/tab.component';
import { SubmissionDetailsComponent } from './submission-details/submission-details.component';
import { SectionComponent } from './section/section.component';

import { SubmissionService } from './submissionService.service';
import { ConditionPropertiesComponent } from './condition-properties/condition-properties.component';
import { ConditionComponent } from './condition-properties/condition/condition.component';
import { QuestionDialogComponent } from './question-dialog/question-dialog.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DescriptorComponent } from './descriptor/descriptor.component';
import { SubmissionDialogComponent } from './submission-dialog/submission-dialog.component'

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    SubmissionComponent,
    TabComponent,
    SubmissionDetailsComponent,
    SectionComponent,
    ConditionPropertiesComponent,
    ConditionComponent,
    QuestionDialogComponent,
    FileUploadComponent,
    DescriptorComponent,
    SubmissionDialogComponent
  ],
  imports: [
    NgxJsonViewerModule,
    BrowserModule,
    FormsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatTabsModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatExpansionModule,
    FlexLayoutModule,
    MatDialogModule,
    MatFormFieldModule,
    MatRadioModule,
    MatTooltipModule,
    MatSlideToggleModule
  ],
  providers: [
    SubmissionService
  ],
  bootstrap: [
    AppComponent,
    SubmissionComponent,
    QuestionComponent,
    TabComponent
  ],
  entryComponents: [QuestionDialogComponent, SubmissionDialogComponent]
})
export class AppModule { }
