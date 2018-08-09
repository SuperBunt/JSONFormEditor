import { SubmissionRegisterEdit } from "app/submissionRegisterEdit";

export class SubmissionDetails {
    submissionRegisterEdits: SubmissionRegisterEdit[];
  submissionTypeId: string;
  submissionTypeDesc: string;
  relatedRegisterId: string;

  constructor(){
    this.submissionTypeId = null;
    this.submissionTypeDesc = "Add a description";
    this.relatedRegisterId = null;
    this.submissionRegisterEdits = [];
  }
}