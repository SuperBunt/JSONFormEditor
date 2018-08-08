export class Descriptor{
    order: number;
    label: string;
    visible: boolean;
    keys: any[]

    constructor(){
        this.order = null;
        this.label = "Descriptor label";
        this.visible = null;
        this.keys = [];
        let key = {"key": "@","order": null}
        this.keys.push(key)
    }
}