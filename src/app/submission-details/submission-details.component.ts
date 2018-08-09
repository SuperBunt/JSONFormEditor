import { Component, OnInit, Input } from '@angular/core';
import { Submission } from '../submission';
import { MatDialogConfig } from '../../../node_modules/@angular/material';

@Component({
  selector: 'app-submission-details',
  templateUrl: './submission-details.component.html',
  styleUrls: ['./submission-details.component.css']
})
export class SubmissionDetailsComponent implements OnInit {

  @Input() submission: Submission;

  constructor() { }

  ngOnInit() {
  }

  

}
