export class ConditionValues {
    propertyValue: boolean;
    left?: any;
    operator: string;
    right?: any;

    constructor(){
        this.propertyValue = true
        this.left = null
        this.operator = ""
        this.right =null
    }
}