import { Component, OnInit, Input } from '@angular/core';

import {Submission} from '../submission'
import { Step } from "app/step";
import { Guid } from "guid-typescript/dist/guid";

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {

  numTabs = 0;
  myForm: Submission;

  constructor(

  ) { }

  ngOnInit() {
    this.myForm = new Submission( );
    this.myForm.version = "1.1.0"
    this.myForm.displayName = "";
    this.myForm.steps = [];
  }

  AddTab() {
    console.log(this.numTabs);
    let toAdd: Step = new Step();
    toAdd.label = "Edit TAB " + (this.numTabs + 1);
    toAdd.controlType = "step";    
    toAdd.order = this.numTabs + 1;
    toAdd.key = Guid.create().toString();
    toAdd.questions = [];
    this.numTabs = this.myForm.steps.push(toAdd);
  }

}
