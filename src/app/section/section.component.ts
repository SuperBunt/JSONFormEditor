import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Question } from '../question'
import { Option } from '../option'
import { Guid } from "guid-typescript/dist/guid";
import { MatDialog, MatDialogConfig } from '../../../node_modules/@angular/material';
import { QuestionDialogComponent } from '../question-dialog/question-dialog.component';
import { ConditionValues } from '../conditionValues';
import { SubmissionService } from '../submissionService.service';
import { fadeInAnimation } from '../_animations/fade-in';
import { SlideInOutAnimation } from '../_animations/slide-in-out';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
  // make fade in animation available to this component
  animations: [fadeInAnimation, SlideInOutAnimation],
  // attach the fade in animation to the host (root) element of this component
  host: { '[@fadeInAnimation]': '' }
})
export class SectionComponent implements OnInit {

  @Input() section: Question;
  numQuestions = 0;
  options = ["textbox", "textarea", "radio", "display", "section", "dropdown", "password", "file-upload", "numeric", "list", "multi-select", "free-note", "date", "checkbox", "quick-autocomplete"];
  optionSelected: any;
  numberOfTicks = 1;
  show: boolean = true;
  animationState = 'in';
  hasVisible: boolean;
  buttonValue: string;
  @Output() sectionDeleted: EventEmitter<string> = new EventEmitter();

  constructor(
    public tabService: SubmissionService,
    private ref: ChangeDetectorRef,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.options.sort();
    if (this.section.visible === undefined) {
      this.section.visible = false
      this.hasVisible
    }
    else
      this.hasVisible = this.section.visible ? true : false;
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
      console.log("closed dialog "+ result);
      if(result == undefined)
        this.numQuestions = this.section.questions.push(newControl);
      else
        console.log("control not saved")
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

  visibleProperty(_event) {
    this.section.visible = _event.checked
    console.log(_event);
    if (_event.checked == false) {
      console.log("add visible");
      let values = new ConditionValues();
      this.section.conditionalProperties.visible = [values];
    }
    else {
      delete this.section.conditionalProperties.visible
    }
  }

  editVisibleProperties() {
    console.log("Edit section visible");
    this.buttonValue = "Remove conditions";
    if (!this.section.conditionalProperties.visible) {
      console.log("add visible");
      let values = new ConditionValues();
      this.section.conditionalProperties.visible = [values];
      this.buttonValue = "Discard conditions";
    }
    else {
      console.log("remove visible")
      delete this.section.conditionalProperties.visible;
      this.buttonValue = "Add conditions";
    }
  }

  addCondition() {
    let values = new ConditionValues();
    this.section.conditionalProperties.visible ? this.section.conditionalProperties.visible.push(values) : this.section.conditionalProperties.visible = [values]
  }

  removeCondition(i: number) {
    this.section.conditionalProperties.visible.splice(i, 1);
  }

}
