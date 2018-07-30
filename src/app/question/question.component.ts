import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../question'
import { Condition } from '../conditionalProperty'
import { ConditionValues } from '../conditionValues';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() controlType: Question;
  @Output() itemDeleted: EventEmitter<string> = new EventEmitter();
  isVisible: boolean;
  isRequired: boolean = false;

  numQuestions = 0;
  edit = true;
  numOptions = 2;
  conditions = ["visible", "required"]

  constructor() { }

  ngOnInit() {
    //this.controlType.questions = [];
  }

  toggle() {
    console.log("toggle");
    this.edit = !this.edit;
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
