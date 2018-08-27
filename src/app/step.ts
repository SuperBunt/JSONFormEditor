import { Question } from "app/question";

export interface IStep {
  order?: number;
  key?: string;
  controlType?: string;
  label?: string;
  visible?: boolean;
  questions?: Question[];
}

export class Step implements IStep{
  constructor(
    public order?: number,
    public key?: string,
    public controlType?: string,
    public label?: string,
    public visible?: boolean,
    public questions?: Question[],
  ){}
}