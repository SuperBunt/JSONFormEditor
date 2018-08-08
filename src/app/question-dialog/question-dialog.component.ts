import { MAT_DIALOG_DATA, MatDialogRef, MatFormFieldBase } from "@angular/material";
import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { Question } from "../question";
import { FormBuilder, FormGroup, FormControl } from "../../../node_modules/@angular/forms";
import { ConditionValues } from "../conditionValues";
import { SubmissionService } from '../submissionService.service';
import { Condition } from "../conditionalProperty";
import { checkAndUpdateBinding } from "../../../node_modules/@angular/core/src/view/util";
import { Descriptor } from "./descriptor";

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
  hasLabel: boolean = false;
  hasVisible: boolean = false;
  hasRequired: boolean = false;
  options = ["textbox", "textarea", "radio", "dropdown", ,"file-upload", "list","multi-select", "free-note", "date", "checkbox", "quick-autocomplete"];
  optionSelected: any;
  numberOfTicks = 1;
  objectKeys: string[];


  constructor(
    public myService: SubmissionService,
    private dialogRef: MatDialogRef<QuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Question) {
    this.controlType = data;
  }

  ngOnInit() {
    
  }

  delete() {
    //emit deleteQuestion
  }

  close() {
    this.dialogRef.close();
  }

  deleteItem(key) {
    console.log("dialog emit: deleteing " + key);
    this.itemDeleted.emit(key);
    this.dialogRef.close();
  }

  addOption() {
    this.controlType.options.push({ key: this.numOptions++, value: "Option " + this.numOptions })
  }

  removeOption(i: number) {
    this.controlType.options.splice(i, 1);
  }

  // addCondition(){
  //   this.controlType.conditionalProperties ? null : this.controlType.conditionalProperties = [];
  //   let values = new ConditionValues();
  //     let whatever: any = { "condition": [values] }
  //     this.controlType.conditionalProperties.push(whatever);
  // }

  AddCondition(type: string, index: number) {
    console.log(". Add conditional from drop down: " + type)
    this.controlType.conditionalProperties ? null : this.controlType.conditionalProperties = [];
    let values = new ConditionValues();
    switch (type) {
      case "label":
        this.hasLabel != this.hasLabel;
        console.log(this.hasLabel)
        if (this.hasLabel == true) {
          let label: any = { "label": [values] }
          this.controlType.conditionalProperties.push(label);
        }
        else {
          this.controlType.conditionalProperties.splice(index, 1);
        }
        break;
      case "required":
        this.hasRequired != this.hasRequired;
        if (this.hasRequired == true) {
          let label: any = { "required": [values] }
          this.controlType.conditionalProperties.push(label);
        }
        else {
          this.controlType.conditionalProperties.splice(index, 1);
        }
        break;
      case "visible":
        this.hasVisible != this.hasVisible;
        if (this.hasVisible == true) {
          let label: any = { "visible": [values] }
          this.controlType.conditionalProperties.push(label);
        }
        else {
          this.controlType.conditionalProperties.splice(index, 1);
        }
        break;
      default:
        //do this         
        console.log("No propeties")
    }
  }

  CheckKeys(): void {
    this.objectKeys = Object.keys(this.controlType.conditionalProperties);
    console.log("Keys: " + this.objectKeys);
  }

  toggleVisible() {
    console.log("toggleVisible")
    if (this.hasVisible) {
      console.log("add visible")
      this.controlType.conditionalProperties ? null : this.controlType.conditionalProperties = [];
      let values = new ConditionValues();
      let whatever: any = { "visible": [values] }
      this.controlType.conditionalProperties.push(whatever);
    }
    else {
      console.log("remove visible")
      const i = this.controlType.conditionalProperties.map(question => question).indexOf("visible");
      this.controlType.conditionalProperties.splice(i, 1);
    }

  }

  toggleRequired() {
    if (this.hasRequired) {
      console.log("add required")
      this.controlType.conditionalProperties ? null : this.controlType.conditionalProperties = [];
      let values = new ConditionValues();
      let whatever: any = { "required": [values] }
      this.controlType.conditionalProperties.push(whatever);
    }
    else {
      console.log("remove required")
      const i = this.controlType.conditionalProperties.map(question => question.key).indexOf("required");
      this.controlType.conditionalProperties.splice(i, 1);
    }
  }

  addToQuestionBase() {
    let toAdd: Question = new Question();
    this.controlType.questionBase.questions.push(toAdd);
  }

  onDeleteFromQuestionBase(id: string) {
    console.log("deleteFromQuestionBase " + id);
    const questionIndex = this.controlType.questionBase.questions.map(question => question.key).indexOf(id);
    console.log(questionIndex);
    this.controlType.questionBase.questions.splice(questionIndex, 1);
  }

  // addDescriptor() {
  //   let toAdd: Descriptor = new Descriptor();
  //   this.controlType.descriptors.push(toAdd);
  // }

  addDescriptor(type: string) {
    //let toAdd: Descriptor = new Descriptor();
    this.myService.createQuestionType(type).then(x => this.controlType.questionBase.questions.push(x));
  }

  onItemDeleted(id: string) {
    const questionIndex = this.controlType.questionBase.questions.map(question => question.key).indexOf(id);
    const descriptorIndex = this.controlType.descriptors.map(question => question.key).indexOf(id);
    if (questionIndex != -1) {
      console.log("deleteFromQuestionBase " + id);
      this.controlType.questionBase.questions.splice(questionIndex, 1);
    }
  }

  onDescriptorDeleted(index: number){
    this.controlType.descriptors.splice(index, 1);
  }

}
