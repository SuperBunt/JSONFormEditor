import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../question'
import { Guid } from "guid-typescript/dist/guid";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() controlType: Question;
  @Output() itemDeleted: EventEmitter<string> = new EventEmitter();
  
  numQuestions = 0;
  isVisible = true;

  constructor() { }

  ngOnInit() {
    //this.controlType.questions = [];
  }

  toggle() {
    console.log("toggle");
    this.isVisible = !this.isVisible;
  }

  deleteItem(key){
    console.log("deleteing " + key);
    this.itemDeleted.emit(key);
  }

  

}
