import { Component, OnInit, Input } from '@angular/core';

import {Submission} from '../submission'
import { Step } from "app/step";

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
    this.myForm.steps = [];
  }

  AddTab() {
    this.numTabs++;
    console.log(this.numTabs);
    let toAdd: Step = new Step();
    toAdd.label = "Edit Label";
    var count = this.myForm.steps.push(toAdd);
  }

}
