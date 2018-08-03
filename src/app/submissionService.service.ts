import { Injectable } from '@angular/core';
import { Submission } from './submission';
import { Question } from './question';
import { Guid } from '../../node_modules/guid-typescript';
import { Step } from './step';
import { Option } from './option';
import { ConditionValues } from './conditionValues';

@Injectable()
export class SubmissionService {
    myForm: Submission = new Submission("Submission Form");
    numTabs = 0
    numSections = 0

    addTab(tab: Step) {
        this.myForm.steps ? this.myForm.steps.push(tab) : this.myForm.steps = [tab];
        // const i = this.myForm.steps.length - 1;
        // this.myForm.steps.splice(i, 0, tab);
    }

    deleteTab(id) {
        const questionIndex = this.myForm.steps.map(question => question.key).indexOf(id);
        console.log(questionIndex);
        this.myForm.steps.splice(questionIndex, 1);
    }

    addSection() {
        console.log("Adding question from service")
    }

    deleteSection(id) {
        const questionIndex = this.myForm.steps.map(question => question.key).indexOf(id);
        console.log(questionIndex);
        this.myForm.steps.splice(questionIndex, 1);
    }

    addQuestion() {
        console.log("Adding question from service")
    }

    deleteQuestion(id) {
        const questionIndex = this.myForm.steps.map(question => {question.key}).indexOf(id);
        console.log(questionIndex);
        this.myForm.steps.splice(questionIndex, 1);
    }

    updateQuestionType(control: Question, type: string): any {
        let updated = new Question();
        updated.label = control.label;
        updated.key = control.key;
        updated.visible = control.visible;
        updated.required = control.required;
        updated.placeholder = control.placeholder;
        updated.controlType = type;
        switch (type) {
            case "radio":
            case "dropdown":
                updated.orientation = "horizontal";
                let option1 = new Option();
                option1.key = 1;
                option1.value = "Option 1";
                let option2 = new Option();
                option2.key = 2;
                option2.value = "Option 2";
                updated.options = [
                    option1, option2
                ]
                return Promise.resolve(updated);
            case "file-upload":
                updated.subAttachTypeId = 9999
                updated.conditionalProperties = [];
                let cond = new ConditionValues();
                let visible: any = { "visible": [cond] }
                updated.conditionalProperties.push(visible);
                let required: any = { "required": [cond] }
                updated.conditionalProperties.push(required);
                return Promise.resolve(updated);
            case "list":
                let questionBase: any;
                updated.buttonText = "Add";
                updated.defaultOpen = true;
                updated.itemName = "List of ?"
                questionBase.regSysKey = Guid.create().toString() + ".addRegEdit[0]";
                questionBase.questions = [];
                updated.descriptors = [
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
                return Promise.resolve(updated);
            default:
                console.log("Default")
                return Promise.resolve(updated);
        }

    }

}