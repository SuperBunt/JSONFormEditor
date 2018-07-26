import { Injectable } from '@angular/core';
import { Submission } from './submission';
import { Question } from './question';
import { Guid } from '../../node_modules/guid-typescript';
import { Step } from './step';

@Injectable()
export class SubmissionService {
    myForm: Submission = new Submission("Submission Form");
    numTabs = 0
    numSections = 0

    addTab(tab: Step) {
        this.myForm.steps ? this.myForm.steps.push(tab) : this.myForm.steps = [tab];
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
        const questionIndex = this.myForm.steps.map(question => question.key).indexOf(id);
        console.log(questionIndex);
        this.myForm.steps.splice(questionIndex, 1);
    }

}