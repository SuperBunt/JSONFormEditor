import { MAT_DIALOG_DATA, MatDialogRef, MatFormFieldBase } from "@angular/material";
import { Component, OnInit, Inject, Output, EventEmitter, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { Question } from "../question";
import { FormBuilder, FormGroup, FormControl } from "../../../node_modules/@angular/forms";
import { ConditionValues } from "../conditionValues";
import { SubmissionService } from '../submissionService.service';
import { Condition } from "../conditionalProperty";
import { checkAndUpdateBinding } from "../../../node_modules/@angular/core/src/view/util";
import { Descriptor } from "./descriptor";
import { ConditionComponent } from "../condition-properties/condition/condition.component";

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.css']
})
export class QuestionDialogComponent implements OnInit {

  @Output() itemDeleted: EventEmitter<string> = new EventEmitter();
  controlType: Question;
  numOptions: number;
  hasLabel: boolean = false;
  hasVisible: boolean = false;
  hasRequired: boolean = false;
  validators = ["email", "phone", "password", "none"];
  regTypes = ["string", "number", "boolean"]
  options = ["textbox", "textarea", "radio", "dropdown", "display", "password", "checkbox-list", "file-upload", "section", "list", "multi-select", "free-note", "numeric", "date", "checkbox", "quick-autocomplete"];
  optionSelected: any;
  numberOfTicks = 1;
  conditionKeys: string[];
  regEdit = false;
  passwordValidaton: boolean;
  emailValidation: boolean;
  phoneValidation: boolean;
  numberValidation: boolean;
  chosenValidator: string;
  updated: boolean;
  properties = this.myService.properties;

  constructor(
    public myService: SubmissionService,
    private dialogRef: MatDialogRef<QuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Question) {
    this.controlType = data;
  }

  ngOnInit() {
    this.options.sort();
    this.regTypes.sort();
    this.controlType.options ? this.numOptions = this.controlType.options.length : null;
    this.chosenValidator = this.controlType.validators ? Object.keys(this.controlType.validators)[0] : ""
    this.conditionKeys = this.controlType.conditionalProperties ? Object.keys(this.controlType.conditionalProperties) : [];
    console.log(this.controlType);
  }

  close() {
    this.dialogRef.close();
  }

  deleteItem(key: string) {
    console.log("dialog deleteing " + key);
    this.dialogRef.close(key);
  }

  addOption() {
    this.numOptions = this.numOptions + 1
    this.controlType.options.push({ key: this.numOptions, value: "Option " + this.numOptions })
  }

  removeOption(i: number) {
    this.controlType.options.splice(i, 1);
  }

  regex = /^[0-9]+$/;
  onKey(value: any, index: number) {
    value.match(this.regex) ? this.controlType.options[index].key = parseInt(value) : this.controlType.options[index].key = value;
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

  addConditionalProperty(val: string) {
    if (this.conditionKeys.indexOf(val) == -1) {
      let values = new ConditionValues();
      if (this.controlType.conditionalProperties == undefined) {
        this.controlType.conditionalProperties = {}
      }
      this.controlType.conditionalProperties[val] = [values]
      this.conditionKeys = Object.keys(this.controlType.conditionalProperties);
    }

  }

  addCondition(key: string) {
    let values = new ConditionValues();
    this.controlType.conditionalProperties[key].push(values)
  }

  deleteCondition(index: number, key: string) {
    this.controlType.conditionalProperties[key].splice(index, 1);
    if (this.controlType.conditionalProperties[key].length == 0) {
      delete this.controlType.conditionalProperties[key];
      this.conditionKeys = Object.keys(this.controlType.conditionalProperties);
    }
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

  changeInput(type: string) {
    console.log("changeInput: " + type)
    if (type != this.controlType.controlType) {
      this.updated = true;
      this.myService.createQuestionType(type)
        .then(result => {
          result.key = this.controlType.key.toString();
          if (type == "free-note")
            result.value = this.controlType.label.toString();
          else
            result.label = this.controlType.label.toString();

          if ((type == "radio" && result.controlType == "dropdown") || (type == "dropdown" && result.controlType == "radio")) {
            this.controlType.options.forEach(
              x => result.options.push(x)
            )
          }

          return Promise.resolve(result)
        }).then(res => Object.assign(this.controlType, res))
    }
  }

}
