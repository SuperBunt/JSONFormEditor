import { Injectable } from '@angular/core';
import { Submission } from './submission';
import { Question, IQuestion } from './question';
import { Guid } from '../../node_modules/guid-typescript';
import { Step } from './step';
import { Option } from './option';
import { ConditionValues } from './conditionValues';
import { QuestionBase } from './questionBase';

@Injectable()
export class SubmissionService {
    myForm: Submission = Submission.create();
    numTabs = 0
    numSections = 0

    addTab(): void {
        console.log(this.numTabs);
        let toAdd = new Step();
        this.numTabs++
        toAdd.label = "TAB " + (this.numTabs);
        toAdd.controlType = "step";
        toAdd.order = this.myForm.steps ? this.myForm.steps.length + 1 : 1;
        toAdd.key = Guid.create().toString();
        toAdd.visible = true;
        toAdd.questions = [];
        this.myForm.steps ? this.myForm.steps.push(toAdd) : this.myForm.steps = [toAdd];
    }

    deleteTab(id): void {
        const questionIndex = this.myForm.steps.map(question => question.key).indexOf(id);
        console.log(questionIndex);
        this.myForm.steps.splice(questionIndex, 1);
    }

    addSection() {
        console.log("Adding question from service")
    }

    deleteSection(id) {
        console.log("deleteSection in service")
        const questionIndex = this.myForm.steps.map(question => question.key).indexOf(id);
        console.log(questionIndex);
        this.myForm.steps.splice(questionIndex, 1);
    }

    addQuestion() {
        console.log("Adding question from service")
    }

    deleteQuestion(id) {
        console.log("deleteQuestion in service")
        const questionIndex = this.myForm.steps.map(question => { question.key }).indexOf(id);
        console.log("deleteQuestion:" + questionIndex);
        this.myForm.steps.splice(questionIndex, 1);
    }

    defaultControlType(type: string): Question {
        let control = new Question();
        control.controlType = type;
        control.key = Guid.create().toString();
        control.label = "";
        control.visible = true;
        control.required = false;
        control.conditionalProperties = {};

        return control
    }

    getKeys(index: number): Promise<any> {
        let filtered = [];
        console.log("getKeys");

        this.myForm.steps[index].questions
            .forEach(x => {
                if (x.label !== "") {
                    let obj = {};
                    obj["label"] = x.label
                    obj["key"] = x.key
                    filtered.push(obj)
                }
                x.questions.forEach(y => {
                    let obj = {};
                    obj["label"] = x.label
                    obj["key"] = x.key
                    if (y.label !== "") {
                        let obj = {};
                        obj["label"] = y.label
                        obj["key"] = y.key
                        filtered.push(obj)
                    }
                    //filtered.push(Object.entries(y).filter((item) =>  item.map))
                })
            })
        return Promise.resolve(filtered)
    }

    getEntries() {
        this.myForm.steps[0].questions.forEach(q => {

        })
    }

    createQuestionType(type: string): Promise<Question> {
        console.log("Sevice: creating " + type)
        let newControl = this.defaultControlType(type);
        switch (type) {
            case "section":
                newControl.questions = [];
                delete newControl.placeholder;
                return Promise.resolve(newControl);
            case "textbox":
                newControl.validators = {};
                return Promise.resolve(newControl);
            case "free-note":
                delete newControl.label;
                newControl.value = "Edit display value";
                return Promise.resolve(newControl);
            case "radio":
            case "dropdown":
                newControl.orientation = "horizontal";
                let option1 = new Option();
                option1.key = "1";
                option1.value = "Option 1";
                let option2 = new Option();
                option2.key = "2";
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
                //newControl.descriptors.push(desc2);
                return Promise.resolve(newControl);
            case "list":
                newControl.buttonText = "Add";
                newControl.defaultOpen = true;
                newControl.itemName = "List of ?"
                newControl.questionBase = new QuestionBase;
                newControl.questionBase.regSysKey = Guid.create().toString() + ".addRegEditList[0]";
                newControl.questionBase.questions = [];
                let section = new Question();
                section.controlType = "section";
                delete section.label;
                delete section.required;
                section.questions = [];
                newControl.questionBase.questions.push(section);
                let desc1 = { "order": 1, "label": "Descriptor 1", keys: [{ "key": "add related key" }, { "order": 1 }] }
                let desc2 = { "order": 2, "label": "Descriptor 2", keys: [{ "key": "add related key" }, { "order": 1 }] }
                newControl.descriptors = [];
                newControl.descriptors.push(desc1);
                return Promise.resolve(newControl);
            case "password":
                newControl.label = "Password";
                newControl.regSysType = "string";
                newControl.required = true;
                newControl.validators = { "password": {} };
                return Promise.resolve(newControl);
            default:
                console.log("Default")
                return Promise.resolve(newControl);
        }
    }

    standardVerificationTab(): Promise<Question> {
        // console.log("standardVerificationTab" + key)
        // const index = this.myForm.steps.map(question => question.key).indexOf(key);
        let personDetails: IQuestion;
        personDetails.controlType = "section";
        personDetails.label = "Details of the Person(s) who are certifying that the information provided is correct";
        personDetails.questions = [];
        return Promise.resolve(personDetails)
    }

}