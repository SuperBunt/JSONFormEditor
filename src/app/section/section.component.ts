import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Question } from '../question'
import { Option } from '../option'
import { Guid } from "guid-typescript/dist/guid";
import { MatDialog, MatDialogConfig } from '../../../node_modules/@angular/material';
import { QuestionDialogComponent } from '../question-dialog/question-dialog.component';
import { ConditionValues } from '../conditionValues';
import { SubmissionService } from '../submissionService.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  @Input() section: Question;
  numQuestions = 0;
  options = ["textbox", "textarea", "radio", "dropdown", ,"file-upload", "list","multi-select", "free-note", "date", "checkbox", "quick-autocomplete"];
  optionSelected: any;
  numberOfTicks = 1;
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
    let newControl: Question = new Question();
    newControl.key = Guid.create().toString();
    newControl.controlType = event;
    newControl.visible = true;
    newControl.label = "Input " + this.numberOfTicks++;
    switch (event) {
      case "radio":
      case "dropdown":
          newControl.orientation = "horizontal";
          let option1 = new Option();
          option1.key = 1;
          option1.value = "Option 1";
          let option2 = new Option();
          option2.key = 2;
          option2.value = "Option 2";
          newControl.options = [
              option1, option2
          ]
          break;
      case "file-upload":
          newControl.subAttachTypeId = 9999
          newControl.conditionalProperties = [];
          let cond = new ConditionValues();
          let visible: any = { "visible": [cond] }
          newControl.conditionalProperties.push(visible);
          let required: any = { "required": [cond] }
          newControl.conditionalProperties.push(required);
          break;
      case "list":
          let questionBase: any;
          newControl.buttonText = "Add";
          newControl.defaultOpen = true;
          newControl.itemName = "List of ?"
          questionBase.regSysKey = Guid.create().toString() + ".addRegEdit[0]";
          questionBase.questions = [];
          newControl.descriptors = [
              {
                  "order": 1,
                  "label": "Description label",
                  "visible": true,
                  "keys": [
                      {
                          "key": "@",
                          "order": 1
                      }
                  ]
              }
          ]
          break;
      default:
          console.log("Default")
          break;
  }
    this.openDialog(newControl);
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
