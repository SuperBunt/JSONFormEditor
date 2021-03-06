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
    tabsCreated = 0
    numSections = 0
    controls = ["textbox", "textarea", "hidden", "radio", "display", "section", "dropdown", "checkbox-list", "password", "file-upload", "numeric", "list", "multi-select", "free-note", "date", "checkbox", "quick-autocomplete"];
    properties = ["visible","required","label"];

    addTab(): Promise<number> {
        this.tabsCreated++
        let toAdd = new Step();
        toAdd.label = "TAB " + (this.tabsCreated);
        toAdd.controlType = "step";
        toAdd.order = this.myForm.steps ? this.myForm.steps.length + 1 : 1;
        toAdd.key = Guid.create().toString();
        toAdd.visible = true;
        toAdd.questions = [];
        this.myForm.steps.push(toAdd)

        return Promise.resolve(this.myForm.steps.length)
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
        //control.conditionalProperties = {};

        return control
    }

    getEntries(): Promise<any> {
        console.log("get entries")
        let filtered = []

        this.myForm.steps.forEach(q => {
            if (q.questions.length > 0) {
                getNestedKeys(q.questions)
            }
        })

        function getNestedKeys(_arr) {
            _arr.forEach(x => {
                console.log(x.controlType)
                if (x.controlType == "dropdown" || x.controlType == "radio" || x.controlType == "checkbox" || x.controlType == "checkbox-list") {
                    let obj = {};
                    obj["label"] = x.label
                    obj["key"] = x.key                    
                    filtered.push(obj)
                }
                else if (x.controlType == 'section') {
                    if (x.questions.length > 0) {
                        getNestedKeys(x.questions)
                    }
                }
            })
        }
        return Promise.resolve(filtered)
    }

    // getEntries(): Promise<any> {
    //     console.log("get entries")
    //     let filtered = []

    //     this.myForm.steps.forEach((q, index) => {
    //         if (q.questions.length > 0) {
    //             filtered.push({
    //                 name: "Tab " + index,
    //                 options: []
    //             })
    //             getNestedKeys(q.questions, index)
    //         }
    //     })

    //     function getNestedKeys(_arr, i) {
    //         _arr.forEach(x => {
    //             console.log(x.controlType)
    //             if (x.controlType == "dropdown" || x.controlType == "radio" || x.controlType == "checkbox" || x.controlType == "checkbox-list") {
    //                 let obj = {};
    //                 obj["label"] = x.label
    //                 obj["key"] = x.key                    
    //                 filtered[i].options.push(obj)
    //             }
    //             else if (x.controlType == 'section') {
    //                 if (x.questions.length > 0) {
    //                     getNestedKeys(x.questions, i)
    //                 }
    //             }
    //         })
    //     }
    //     return Promise.resolve(filtered)
    // }

    getOptions(val: string): Promise<any> {
        let options = [];

        this.myForm.steps.forEach(q => {
            if (q.questions.length > 0) {
                q.questions.forEach((x, index) => { search(x) })
            }
        })

        function search(_arr) {
            console.log("search: val " + val + "key " + _arr.key)
            if (_arr.key == val) {
                console.log("found it: " + _arr.options)
                if (_arr.controlType == "checkbox") {
                    options = [
                        {
                            "key": true,
                            "value": "True"
                        },
                        {
                            "key": false,
                            "value": "False"
                        }
                    ]
                    return;
                }
                else options = _arr.options;

                return;
            }
            else if (_arr.questions != undefined && _arr.questions.length > 0)
                _arr.questions.forEach(a => search(a))
        }

        return Promise.resolve(options)
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
            case "checkbox-list":
                newControl.orientation = "vertical";
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
                section.visible = true;
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
            case "hidden":
                delete newControl.label;
                delete newControl.visible;
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