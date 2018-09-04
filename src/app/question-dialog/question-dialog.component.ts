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
  validators = ["email", "phone", "password", "none"];
  regTypes = ["string", "number", "boolean"]
  options = ["textbox", "textarea", "radio", "dropdown", "display", "password", "file-upload", "section", "list", "multi-select", "free-note", "numeric", "date", "checkbox", "quick-autocomplete"];
  optionSelected: any;
  numberOfTicks = 1;
  objectKeys: string[];
  regEdit = false;
  passwordValidaton: boolean;
  emailValidation: boolean;
  phoneValidation: boolean;
  numberValidation: boolean;
  chosenValidator: string;

  constructor(
    public myService: SubmissionService,
    private dialogRef: MatDialogRef<QuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Question) {
    this.controlType = data;
  }

  ngOnInit() {
    this.options.sort();
    this.regTypes.sort();
    this.chosenValidator = this.controlType.validators ? Object.keys(this.controlType.validators)[0] : ""
  }

  close() {
    this.dialogRef.close();
  }

  deleteItem(key) {
    console.log("dialog deleteing " + key);
    this.dialogRef.close(key);
  }

  addOption() {
    this.numOptions = this.numOptions + 1
    this.controlType.options.push({ key: this.numOptions.toString(), value: "Option " + this.numOptions })
  }

  removeOption(i: number) {
    this.controlType.options.splice(i, 1);
  }

  CheckKeys(): void {
    this.objectKeys = Object.keys(this.controlType.conditionalProperties);
    console.log("Keys: " + this.objectKeys);
  }

  toggleLabel() {
    console.log("toggleLabel")
    if (this.hasLabel) {
      console.log("add visible");
      let values = new ConditionValues();
      this.controlType.conditionalProperties.label = [values]
    }
    else {
      console.log("remove label")
      delete this.controlType.conditionalProperties.label
    }

  }

  toggleVisible() {
    console.log("toggleVisible")
    if (this.hasVisible) {
      console.log("add visible");
      let values = new ConditionValues();
      this.controlType.conditionalProperties.visible = [values]
    }
    else {
      console.log("remove visible")
      delete this.controlType.conditionalProperties.visible
    }

  }

  toggleRequired() {
    if (this.hasRequired) {
      console.log("add required");
      let values = new ConditionValues();
      this.controlType.conditionalProperties.required = [values]
    }
    else {
      console.log("remove required")
      delete this.controlType.conditionalProperties.required
    }
  }

  addControlToQuestionBase(type: string) {
    this.myService.createQuestionType(type).then(x => this.controlType.questionBase.questions[0].questions.push(x));
  }

  onDeleteFromQuestionBase(id: string) {
    console.log("deleteFromQuestionBase " + id);
    const questionIndex = this.controlType.questionBase.questions[0].questions.map(question => question.key).indexOf(id);
    console.log(questionIndex);
    this.controlType.questionBase.questions[0].questions.splice(questionIndex, 1);
  }

  setValidator(val: string) {
    console.log("setValidator: " + val);
    this.controlType.validators = {}
    this.chosenValidator = val;
    switch (val) {
      case "email":
        this.controlType.validators.email = {}
        break;
      case "password":
        this.controlType.validators.password = {}
        break;
      case "phone":
        this.controlType.validators.phone = {}
        break;
      case "number":
        this.controlType.validators.regex = {
          "regExp": "^[\\d]",
          "message": "Only numeric values are allowed"
        }
        break;
      case "none":
        break;
    }
  }

  setRegsysType(type: string) {
    this.controlType.regSysType = type
  }

  addDescriptor(type: string) {
    this.myService.createQuestionType(type).then(x => this.controlType.descriptors.push(x));
  }
  onDescriptorDeleted(index: number) {
    this.controlType.descriptors.splice(index, 1);
  }

  onItemDeleted(id: string) {
    const questionIndex = this.controlType.questionBase.questions.map(question => question.key).indexOf(id);
    const descriptorIndex = this.controlType.descriptors.map(question => question.key).indexOf(id);
    if (questionIndex != -1) {
      console.log("deleteFromQuestionBase " + id);
      this.controlType.questionBase.questions.splice(questionIndex, 1);
    }
  }



}
