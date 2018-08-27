import { Option } from 'app/option';
import { ConditionValues } from './conditionValues';
import { QuestionBase } from './questionBase';
import { Guid } from '../../node_modules/guid-typescript';

export interface IQuestion {
  key?: string; 
  controlType?: string;
  label?: string;
  visible?: boolean;
  required?: boolean;
  regSysType?: string;
  sizeColumn?: number;
  questions?: Question[];
  regSysKey?: string;
  value?: string;
  maxLength?: number;
  orientation?: string;
  options?: Option[];
  subAttachTypeId?: number;
  placeholder?: string;
  conditionalProperties?: any;
  itemName?: string;
  buttonText?: string;
  defaultOpen?: boolean;
  questionBase?: QuestionBase;
  descriptors?: any[];
  validators?: any;
}

export class Question implements IQuestion {  

  constructor(
    public key?: string,
    public controlType?: string,
    public label?: string,
    public visible?: boolean,
    public required?: boolean,
    public regSysType?: string,
    public sizeColumn?: number,
    public questions?: Question[],
    public regSysKey?: string,
    public value?: string,
    public maxLength?: number,
    public orientation?: string,
    public options?: Option[],
    public subAttachTypeId?: number,
    public placeholder?: string,
    public conditionalProperties?: any,
    public itemName?: string,
    public buttonText?: string,
    public defaultOpen?: boolean,
    public questionBase?: QuestionBase,
    public descriptors?: any[],
    public validators?: any
  ) {   }

}

