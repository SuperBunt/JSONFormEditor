import { SubmissionDetails } from "app/submissionDetails";
import { Step } from "app/step";

export class Submission {
    version: string;
    displayName: string;
    submissionDetails: SubmissionDetails;
    steps: Step[];

    constructor(name: string){
        this.displayName = name;
    }
}