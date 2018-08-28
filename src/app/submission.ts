import { SubmissionDetails } from "app/submissionDetails";
import { Step, IStep } from "app/step";

export interface ISubmission {
    version?: string;
    displayName?: string;
    submissionDetails?: SubmissionDetails;
    steps?: Step[];
}

export class Submission implements ISubmission {

    constructor(
        public version?: string,
        public displayName?: string,
        public submissionDetails?: SubmissionDetails,
        public steps?: Step[]
    ) { }

    static create() {
        let sd = new SubmissionDetails()
        return {
            version: "1.1.0",
            displayName: "",
            submissionDetails: sd,
            steps: []
        }
    }
}