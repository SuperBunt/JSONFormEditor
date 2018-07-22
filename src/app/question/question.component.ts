import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Question } from '../question'
import { Guid } from "guid-typescript/dist/guid";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() controlType: Question;
  @Output() toggled: EventEmitter<boolean> = new EventEmitter();
  numQuestions = 0;
  isVisible = true;
  
  constructor() { }

  ngOnInit() {
    this.controlType.questions = [];
  }

  toggle() {
    console.log("clicked");
    this.isVisible = !this.isVisible;
  }

}
