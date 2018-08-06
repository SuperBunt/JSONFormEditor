import { Option } from 'app/option';
import { ConditionValues } from './conditionValues';
import { QuestionBase } from './questionBase';
import { Guid } from '../../node_modules/guid-typescript';

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
  options: Option[];
  subAttachTypeId: number;
  placeholder: string;
  conditionalProperties: any[];
  itemName: string;
  buttonText: string;
  defaultOpen: boolean;
  questionBase: QuestionBase;
  descriptors: any[];

  constructor() {
    this.controlType = "";
    this.label = "Edit me";
    this.key = Guid.create().toString();
    this.visible = true;
    this.required = false;
  }
}