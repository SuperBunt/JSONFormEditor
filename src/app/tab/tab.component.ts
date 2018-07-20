import { Component, OnInit, Input } from '@angular/core';
import { Step } from '../step';
import { Question } from '../question'
import { Guid } from "guid-typescript/dist/guid";

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {

  @Input() tab: Step;
  numSections = 0;

  constructor() { }

  ngOnInit(): void {
  }

  AddSection(): void{
    // Add section to the tab
    console.log("Add section...")
    let newSection: Question = new Question();
    newSection.key = Guid.create().toString();
    newSection.controlType = "section";
    newSection.label = "Edit SECTION " + (this.numSections + 1) +" Label";    
    this. numSections = this.tab.questions.push(newSection);
  }

}
