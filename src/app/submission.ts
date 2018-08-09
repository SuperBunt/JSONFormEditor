import { SubmissionDetails } from "app/submissionDetails";
import { Step } from "app/step";

export class Submission {
    version: string;
    displayName: string;
    submissionDetails: SubmissionDetails;
    steps: Step[];

    constructor(name: string) {
        this.displayName = name;
        this.submissionDetails = new SubmissionDetails();
        let toAdd: Step = new Step();
        toAdd.controlType = "step";
        toAdd.label = "Tab 1"
        toAdd.order = 1;
        toAdd.questions = [];
        this.steps = [];
        this.steps.push(toAdd)
    }
}