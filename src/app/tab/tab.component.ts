import { Component, OnInit, Input } from '@angular/core';
import { Step } from '../step';
import { Question } from '../question'
import { Guid } from "guid-typescript/dist/guid";
import { SubmissionService } from '../submissionService.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {

  @Input() tab: Step;
  numSections = 0;

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

  
}
