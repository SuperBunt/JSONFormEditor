import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Step } from '../step';
import { Question } from '../question'
import { Guid } from "guid-typescript/dist/guid";
import { SubmissionService } from '../submissionService.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('tabStyling', [
      state('active', style({
        transform: 'scale(0.8)',
      })),
      state('inactive', style({
        transform: 'scale(1)',
      })),
      transition('active => inactive', animate('800ms ease-in')),
    ])
  ]
})
export class TabComponent implements OnInit {

  @Input() tab: Step;
  numSections = 0;
  state = "active";
  @Output() tabSelected: EventEmitter<string> = new EventEmitter();

  constructor(public tabService: SubmissionService) { }

  ngOnInit(): void {
  }

  AddSection(): void{
    // Add section to the tab
    console.log("Add section...")
    let newSection: Question = new Question();
    newSection.key = Guid.create().toString();
    newSection.controlType = "section";
    newSection.label = "SECTION " + (this.numSections + 1) +" Label"; 
    newSection.visible = true;
    newSection.conditionalProperties = {};
    this. numSections = this.tab.questions.push(newSection);
  }

  deleteTab(key: any){
    console.log("delete tab..." + key);
    this.tabService.deleteTab(key);
  }

  onSectionDeleted(id: string){
    console.log("delete section " + id);
    const questionIndex = this.tab.questions.map(question => question.key).indexOf(id);
    console.log(questionIndex);
    this.tab.questions.splice(questionIndex, 1);
  }

  onTabSelected() {
    this.state = (this.state === 'active' ? 'inactive' : 'active');
    this.tabSelected.emit();
  }
}
