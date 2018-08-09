import { Guid } from "../../node_modules/guid-typescript";

export class SubmissionRegisterEdit {
  key: string;
  name: string;
  registerEditId: number;

  constructor(){
    this.key = Guid.create().toString();
    this.name = "Add name to regEdit";
    this.registerEditId = null;
  }
}