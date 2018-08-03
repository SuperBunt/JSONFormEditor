import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Submission } from '../submission'
import { Step } from "app/step";
import { Guid } from "guid-typescript/dist/guid";
import { SubmissionService } from '../submissionService.service';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('activate', [
      state('small', style({
        transform: 'scale(1)',
      })),
      state('large', style({
        transform: 'scale(1.5)',
      })),
      transition('small => large', animate('800ms ease-in')),
    ])
  ]
})
export class SubmissionComponent implements OnInit {
  selectedTab: number;
  numTabs = 1;
  expanded: boolean;
  prettyJSON: string;
  state: string = 'show';

  constructor(public myService: SubmissionService) { }

  ngOnInit() {
    this.expanded = false;
    this.prettyJSON = JSON.stringify(this.myForm, undefined, 2);
  }

  get myForm() {
    return this.myService.myForm;
  }

  AddTab() {
    console.log(this.numTabs);
    let toAdd: Step = new Step();
    this.numTabs++
    toAdd.label = "TAB " + (this.numTabs);
    toAdd.controlType = "step";
    toAdd.order = this.myForm.steps ? this.myForm.steps.length + 1 : 1;
    toAdd.key = Guid.create().toString();
    toAdd.visible = true;
    toAdd.questions = [];
    this.myService.addTab(toAdd);
    this.selectedTab = this.myForm.steps.length;
    console.log("tab index: "+ this.selectedTab);
    //this.numTabs = this.myForm.steps.push(toAdd);
  }

  ViewPrettyJSON(): void {
    this.prettyJSON = JSON.stringify(this.myForm, undefined, 2);
    console.log("View json")
  }

  changeTab() {
    this.state = (this.state === 'small' ? 'large' : 'small');
  }

}
