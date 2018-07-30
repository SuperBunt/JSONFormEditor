import { ConditionValues } from "./conditionValues";

export class Condition {
    condition : ConditionValues[]

    constructor(){
        let values = new ConditionValues();
        this.condition = [values]
    }
}

