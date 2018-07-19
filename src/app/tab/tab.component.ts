import { Component, OnInit, Input } from '@angular/core';
import { Step } from '../step';
import { Question } from '../question'

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {

  @Input() tab: Step;

  constructor() { }

  ngOnInit(): void {
  }

  AddSection(): void{
    // Add section to the tab
    let toAdd: Question = new Question();
  }

}
