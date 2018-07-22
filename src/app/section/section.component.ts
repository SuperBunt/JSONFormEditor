import { Component, OnInit, Input } from '@angular/core';
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
  options = ["textbox","radio","dropdown"];
  optionSelected: any;

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

  AddInput(event): void {
    console.log("adding input type:" + event)
    let newControl: Question = new Question();
    newControl.key = Guid.create().toString();
    newControl.controlType = event;
    newControl.label = "Edit this Label";
    switch(event) { 
   case "radio":
   case "dropdown":{ 
     let option1 = new Option();
     option1.key = 1;
     option1.value = "Option A";
     let option2 = new Option();
     option2.key = 2;
     option2.value = "Option b";
      newControl.options = [
        option1,option2
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
  }

}
