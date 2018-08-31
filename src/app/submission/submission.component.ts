import { Component, OnInit } from '@angular/core';
import { SubmissionService } from '../submissionService.service';
import { fadeInAnimation } from '../_animations/fade-in';
import { MatDialogConfig, MatDialog } from '../../../node_modules/@angular/material';
import { SubmissionDialogComponent } from '../submission-dialog/submission-dialog.component';
import { Submission } from '../submission';

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
  expanded: boolean;
  prettyJSON: string;
  state: string = 'show';
  paste: boolean;

  constructor(
    public myService: SubmissionService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.expanded = false;
    this.prettyJSON = JSON.stringify(this.myForm, undefined, 2);
    this.selectedTab = this.myForm.steps.length;
  }

  get myForm() {
    return this.myService.myForm;
  }

  set myForm(_form) {
    this.myService.myForm = _form;
    console.log(typeof (this.myForm));
  }

  openDialog(): void {
    this.myForm = Submission.create();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.myForm;
    dialogConfig.minWidth = 600;
    dialogConfig.direction = "ltr";

    const dialogRef = this.dialog.open(SubmissionDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      console.log("closed submission details dialog");
      this.AddTab();
    });
  }

  AddTab() {
    event.stopPropagation();
    this.myService.addTab().then(x => {
      this.selectedTab = x
    })
  }

  ViewPrettyJSON(): void {
    this.prettyJSON = JSON.stringify(this.myForm, undefined, 2);
  }

  copyToClipboard() {
    this.prettyJSON = JSON.stringify(this.myForm, undefined, 2);

    console.log("copy");
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.prettyJSON;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    alert("Form copied to clipboard")

    let newWindow = window.open(
      "http://developer.regsys.ie"
    );
  }

  changeTab() {
    this.state = (this.state === 'small' ? 'large' : 'small');
  }

  pasteJSON(value: string) {
    this.myForm = JSON.parse(value);
  }

  openEditor() {
    this.prettyJSON = JSON.stringify(this.myForm, undefined, 2);
    this.paste = !this.paste
  }

}
