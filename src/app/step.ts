

import { Question } from "app/question";

export class Step {
  order: number;
  key: string;
  controlType: string;
  label: string;
  visible: boolean;
  questions: Question[];
}