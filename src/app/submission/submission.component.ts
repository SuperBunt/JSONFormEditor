import { Component, OnInit, Input } from '@angular/core';
import { Submission } from '../submission'
import { Step, IStep } from "app/step";
import { Guid } from "guid-typescript/dist/guid";
import { SubmissionService } from '../submissionService.service';
import { fadeInAnimation } from '../_animations/fade-in';
import { MatDialogConfig, MatDialog } from '../../../node_modules/@angular/material';
import { SubmissionDialogComponent } from '../submission-dialog/submission-dialog.component';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css'],

  // make fade in animation available to this component
  animations: [fadeInAnimation],

  // attach the fade in animation to the host (root) element of this component
  host: { '[@fadeInAnimation]': '' }
})
export class SubmissionComponent implements OnInit {
  selectedTab: number;
  numTabs = 0;
  expanded: boolean;
  prettyJSON: string;
  state: string = 'show';

  constructor(
    public myService: SubmissionService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.expanded = false;
    this.prettyJSON = JSON.stringify(this.myForm, undefined, 2);
  }

  get myForm() {
    return this.myService.myForm;
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.myForm;
    dialogConfig.minWidth = 600;
    dialogConfig.direction = "ltr";

    const dialogRef = this.dialog.open(SubmissionDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log("closed submission details dialog");
    });
  }

  AddTab() {
    this.myService.addTab();
    this.selectedTab = this.myForm.steps.length;
    console.log("tab index: " + this.selectedTab);
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
