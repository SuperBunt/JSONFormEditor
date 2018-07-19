export class Question {
    key: string;
  controlType: string;
  label: string;
  visible: boolean;
  required: boolean;
  regSysType: string;
  sizeColumn: number;
  questions: Question[];
  regSysKey: string;
  value: string;
  maxLength: number;
  orientation: string;
  //options: Option[];
  subAttachTypeId: number;
  placeholder: string;
  //conditionalProperties: ConditionalProperties;
  itemName: string;
  buttonText: string;
  defaultOpen: boolean;
  //questionBase: QuestionBase;
  //descriptors: Descriptor[];

  constructor(){
      this.controlType = "textarea";
      this.label = "Edit me";
      this.visible = true;
      this.required = false
  }
}