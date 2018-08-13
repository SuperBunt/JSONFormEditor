import { Injectable } from '@angular/core';
import { Submission } from './submission';
import { Question } from './question';
import { Guid } from '../../node_modules/guid-typescript';
import { Step } from './step';
import { Option } from './option';
import { ConditionValues } from './conditionValues';
import { QuestionBase } from './questionBase';

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
        const questionIndex = this.myForm.steps.map(question => { question.key }).indexOf(id);
        console.log(questionIndex);
        this.myForm.steps.splice(questionIndex, 1);
    }

    createQuestionType(type: string): any {
        console.log("Sevice: creating " + type)
        let newControl = new Question();
        newControl.controlType = type;
        newControl.placeholder = "";
        newControl.conditionalProperties = {};
        switch (type) {
            case "textbox":
                newControl.validators = {};
                console.log(newControl)
                return Promise.resolve(newControl);
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
                return Promise.resolve(newControl);
            case "file-upload":
                newControl.subAttachTypeId = 9999
                newControl.conditionalProperties = [];
                let cond = new ConditionValues();
                let visible: any = { "visible": [cond] }
                newControl.conditionalProperties.push(visible);
                let required: any = { "required": [cond] }
                newControl.conditionalProperties.push(required);
                let qb: Question = new Question();
                qb.regSysKey = Guid.create().toString() + ".addRegEditList[0]";
                qb.questions = [];
                newControl.questionBase = new QuestionBase;
                let desc1 = { "order": 1, "label": "Descriptor 1", keys: [{ "key": "add related key" }, { "order": 1 }] }
                let desc2 = { "order": 2, "label": "Descriptor 2", keys: [{ "key": "add related key" }, { "order": 1 }] }
                newControl.descriptors = [];
                newControl.descriptors.push(desc1);
                return Promise.resolve(newControl);
            case "list":
                newControl.buttonText = "Add";
                newControl.defaultOpen = true;
                newControl.itemName = "List of ?"
                newControl.questionBase = new QuestionBase();
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
                return Promise.resolve(newControl);
            case "password":
                newControl.label = "Password";
                newControl.regSysType = "string";
                newControl.required = true;
                newControl.validators = { "password": {} };
                console.log(newControl)
                return Promise.resolve(newControl);
            default:
                console.log("Default")
                return Promise.resolve(newControl);
        }

    }

}