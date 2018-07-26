import { Component, OnInit, Input } from '@angular/core';

import {Submission} from '../submission'
import { Step } from "app/step";
import { Guid } from "guid-typescript/dist/guid";
import { SubmissionService } from '../submissionService.service';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {

  numTabs = 0;
  expanded: boolean;
  prettyJSON: string;

  constructor(public myService: SubmissionService) { }

  ngOnInit() {
    this.expanded = false;
    this.prettyJSON = JSON.stringify(this.myForm, undefined, 2);
  }

  get myForm(){
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
    toAdd.questions = [];
    this.myService.addTab(toAdd);
    //this.numTabs = this.myForm.steps.push(toAdd);
  }

  ViewPrettyJSON(): void{
    this.prettyJSON = JSON.stringify(this.myForm, undefined, 2);
  }

}
