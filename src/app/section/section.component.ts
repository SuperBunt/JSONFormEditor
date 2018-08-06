import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Question } from '../question'
import { Option } from '../option'
import { Guid } from "guid-typescript/dist/guid";
import { MatDialog, MatDialogConfig } from '../../../node_modules/@angular/material';
import { QuestionDialogComponent } from '../question-dialog/question-dialog.component';
import { ConditionValues } from '../conditionValues';
import { SubmissionService } from '../submissionService.service';
import { fadeInAnimation } from '../_animations/fade-in';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'], 
  // make fade in animation available to this component
  animations: [fadeInAnimation], 
  // attach the fade in animation to the host (root) element of this component
  host: { '[@fadeInAnimation]': '' }
})
export class SectionComponent implements OnInit {

  @Input() section: Question;
  numQuestions = 0;
  options = ["textbox", "textarea", "radio", "dropdown", ,"file-upload", "list","multi-select", "free-note", "date", "checkbox", "quick-autocomplete"];
  optionSelected: any;
  numberOfTicks = 1;
  show: boolean = true;
  @Output() sectionDeleted: EventEmitter<string> = new EventEmitter();

  constructor(
    public tabService: SubmissionService,
    private ref: ChangeDetectorRef, 
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.options.sort();
    this.section.questions = []
  }

  AddControlType(): void {
    console.log("adding control type")
    let newControl: Question = new Question();
    newControl.key = Guid.create().toString();
    newControl.controlType = "textbox";
    newControl.label = "Edit this Label";
    newControl.visible = true;
    this.openDialog(newControl);
  }

  openDialog(newControl: Question): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = newControl;
    dialogConfig.minWidth = 600;
    dialogConfig.direction = "ltr";

    const dialogRef = this.dialog.open(QuestionDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log("closed dialog");
      this.numQuestions = this.section.questions.push(newControl);
    });
  }

  AddInput(event): void {
    console.log("adding input type:" + event)
    this.tabService.createQuestionType(event).then(x => this.openDialog(x));
      }

  onItemDeleted(id: string) {
    console.log("section delete item " + id);
    const questionIndex = this.section.questions.map(question => question.key).indexOf(id);
    console.log(questionIndex);
    this.section.questions.splice(questionIndex, 1);
  }

  deleteSection(key) {
    console.log("deleteing section " + key);
    this.sectionDeleted.emit(key);
  }

}
