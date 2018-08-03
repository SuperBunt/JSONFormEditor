import { Option } from 'app/option';

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
  questionBase: Question[];
  descriptors: any[];

  constructor(){
      
  }
}