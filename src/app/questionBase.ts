import { Question } from "./question";
import { Guid } from "../../node_modules/guid-typescript";

export class QuestionBase {
    regSysKey: string;
    questions: Question[];

    constructor() {
        this.regSysKey = Guid.create().toString() + ".addRegEdit[0]";
        this.questions = [];        
    }
}