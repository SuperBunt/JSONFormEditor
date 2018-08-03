import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { Question } from "../question";
import { FormBuilder, FormGroup } from "../../../node_modules/@angular/forms";
import { ConditionValues } from "../conditionValues";
import { Guid } from "../../../node_modules/guid-typescript";
import { SubmissionService } from '../submissionService.service';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.css']
})
export class QuestionDialogComponent implements OnInit {

  @Output() itemDeleted: EventEmitter<string> = new EventEmitter();
  form: FormGroup;
  controlType: Question;
  numOptions = 2;
  isVisible: boolean;
  isRequired: boolean = false;
  
  numberOfTicks = 1;
  

  constructor(
    public myService: SubmissionService,
    private dialogRef: MatDialogRef<QuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Question) {
    this.controlType = data;
  }

  ngOnInit() { 
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

  deleteItem(key) {
    console.log("deleteing " + key);
    this.itemDeleted.emit(key);
  }

  addOption() {
    this.controlType.options.push({ key: this.numOptions++, value: "Option " + this.numOptions })
  }

  removeOption(i: number) {
    this.controlType.options.splice(i, 1);
  }

  AddCondition(type: string) {
    this.controlType.conditionalProperties ? null : this.controlType.conditionalProperties = [];
    let cond = new ConditionValues();
    switch (type) {
      case "visible":
        // do this
        let visible: any = { "visible": [cond] }
        this.controlType.conditionalProperties.push(visible);
        break;
      case "required":
        // do this
        let required: any = { "required": [cond] }
        this.controlType.conditionalProperties.push(required);
        break;
      default:
        //do this         
        this.controlType.conditionalProperties.push(cond);
    }
  }

  AddInput(event): void {
    console.log("dropdown: "+event)
    this.myService.updateQuestionType(this.controlType, event).then(x => this.controlType = x);
  }

  toggleVisible() {
    if (this.isVisible) {
      console.log("add visible")
      this.controlType.conditionalProperties ? null : this.controlType.conditionalProperties = [];
      let cond = new ConditionValues();
      let visible: any = { "visible": [cond] }
      this.controlType.conditionalProperties.push(visible);
    }
    else {
      console.log("remove visible")
      const i = this.controlType.conditionalProperties.map(question => question.key).indexOf("visible");
      this.controlType.conditionalProperties.splice(i, 1);
    }

  }

  toggleRequired() {
    if (this.isRequired) {
      console.log("add required")
      this.controlType.conditionalProperties ? null : this.controlType.conditionalProperties = [];
      let cond = new ConditionValues();
      let required: any = { "required": [cond] }
      this.controlType.conditionalProperties.push(required);
    }
    else {
      console.log("remove required")
      const i = this.controlType.conditionalProperties.map(question => question.key).indexOf("required");
      this.controlType.conditionalProperties.splice(i, 1);
    }
  }

}
