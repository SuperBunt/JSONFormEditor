import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Question } from '../question'
import { Option } from '../option'
import { Guid } from "guid-typescript/dist/guid";

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  @Input() section: Question;
  numQuestions = 0;
  options = ["textbox", "radio", "dropdown"];
  optionSelected: any;
  numberOfTicks = 1;
  @Output() sectionDeleted: EventEmitter<string> = new EventEmitter();

  constructor(private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.section.questions = []
  }

  AddControlType(): void {
    console.log("adding control type")
    let newControl: Question = new Question();
    newControl.key = Guid.create().toString();
    newControl.controlType = "textbox";
    newControl.label = "Edit this Label";
    this.numQuestions = this.section.questions.push(newControl);
  }

  AddInput(event): void {
    console.log("adding input type:" + event)
    let newControl: Question = new Question();
    newControl.key = Guid.create().toString();
    newControl.controlType = event;
    newControl.label = "Input " + this.numberOfTicks++;
    switch (event) {
      case "radio":
      case "dropdown": {
        let option1 = new Option();
        option1.key = 1;
        option1.value = "Option A";
        let option2 = new Option();
        option2.key = 2;
        option2.value = "Option b";
        newControl.options = [
          option1, option2
        ]
        break;
      }
      case "other": {
        //statements; 
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
    this.numQuestions = this.section.questions.push(newControl);
    console.log(this.section.questions);
  }

  onItemDeleted(id: string) {
    console.log("delete item " + id);
    const questionIndex = this.section.questions.map(question => question.key).indexOf(id);
    console.log(questionIndex);
    this.section.questions.splice(questionIndex, 1);
  }

  deleteSection(key) {
    console.log("deleteing section " + key);
    this.sectionDeleted.emit(key);
  }

}
