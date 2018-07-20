import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../question'
import { Guid } from "guid-typescript/dist/guid";

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  @Input() section: Question;
  numQuestions = 0;

  constructor() { }

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

}
