import { Component, OnInit, Input } from '@angular/core';
import { Step } from '../step';
import { Question } from '../question'

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
    newSection.controlType = "section";
    newSection.label = "Edit SECTION " + (this.numSections + 1) +" Label";
    newSection.key = "Generate key";
    this. numSections = this.tab.questions.push(newSection);
  }

}
