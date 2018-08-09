import { Component, OnInit, Inject } from '@angular/core';
import { SubmissionService } from '../submissionService.service';
import { Submission } from '../submission';
import { MAT_DIALOG_DATA, MatDialogRef, MatFormFieldBase } from "@angular/material";
import { SubmissionRegisterEdit } from '../submissionRegisterEdit';


@Component({
  selector: 'app-submission-dialog',
  templateUrl: './submission-dialog.component.html',
  styleUrls: ['./submission-dialog.component.css']
})
export class SubmissionDialogComponent implements OnInit {

  submission: Submission;

  constructor(
    public myService: SubmissionService,
    private dialogRef: MatDialogRef<SubmissionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Submission
  ) { this.submission = data }

  ngOnInit() {
  }

  addRegEdit() {
    console.log("Add reg edit")
    const regEdit = new SubmissionRegisterEdit()
    this.submission.submissionDetails.submissionRegisterEdits.push(regEdit);
  }

  removeRegEdit(i: number) {
    console.log("delete reg edit")
    this.submission.submissionDetails.submissionRegisterEdits.splice(i, 1);
  }

}
