import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Step } from '../step';
import { Question, IQuestion } from '../question'
import { Guid } from "guid-typescript/dist/guid";
import { SubmissionService } from '../submissionService.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('tabStyling', [
      state('active', style({
        transform: 'scale(0.8)',
      })),
      state('inactive', style({
        transform: 'scale(1)',
      })),
      transition('active => inactive', animate('800ms ease-in')),
    ])
  ]
})
export class TabComponent implements OnInit {

  @Input() tab: Step;
  numSections = 0;
  state = "active";
  @Output() tabSelected: EventEmitter<string> = new EventEmitter();
  index: number;

  constructor(public tabService: SubmissionService) { }

  ngOnInit(): void {
  }

  AddSection(): void {
    // Add section to the tab
    console.log("Add section...")
    let newSection = new Question();
    newSection.key = Guid.create().toString();
    newSection.controlType = "section";
    newSection.visible = true;
    newSection.label = "SECTION " + (this.numSections + 1) + " Label";
    newSection.questions = []
    //newSection.visible = true;
    newSection.conditionalProperties = {};
    this.numSections = this.tab.questions.push(newSection);
  }

  deleteTab(key: any) {
    console.log("delete tab..." + key);
    this.tabService.deleteTab(key);
  }

  onSectionDeleted(id: string) {
    console.log("delete section " + id);
    const questionIndex = this.tab.questions.map(question => question.key).indexOf(id);
    console.log(questionIndex);
    this.tab.questions.splice(questionIndex, 1);
  }

  onTabSelected() {
    this.state = (this.state === 'active' ? 'inactive' : 'active');
    this.tabSelected.emit();
  }

  onEnter(value: string) {
    console.log("Tab input - ENTER" + value)

    if (value == "Verification") {
      this.tab.questions = [{"key":"3dbf570e-c279-42f2-a591-eeccde022cf3","controlType":"section","label":"Details of the Person(s) who are certifying that the information provided is correct","visible":true,"questions":[{"key":"08376de7-0088-469d-82f2-0905a349d966","controlType":"section","label":"Information","visible":true,"questions":[{"key":"da766de7-9174-1717-eeda-0905a349eeee","controlType":"display","label":"Both sides to the transaction (or their solicitors) must sign. The notes following constitute part of this form ","visible":true},{"key":"80ddab6d-23b5-4dcd-b10e-f65417f9f9c5","controlType":"display","label":"Note: This form will be signed with certificate / certificates issued by Revenue Online Services (ROS)","visible":true}]},{"key":"13aaa3a9-a97d-45ed-9488-acf5f477be7e","controlType":"section","label":"Interest In Charge","visible":true,"questions":[{"key":"0ca68659-c11a-4d15-aa29-dd3c44023e26","controlType":"dropdown","label":"Signature Type","visible":true,"options":[{"key":1,"value":"Signature as Authorised Signatory"},{"key":2,"value":"Signature as Solicitor on behalf of an Entity"}]},{"key":"b609b10a-95d1-4da3-b73e-e4f48a0dde18","controlType":"dropdown","label":"Entity Role","visible":false,"options":[{"key":1,"value":"An Individual signing the form on behalf of a firm"},{"key":2,"value":"Self"}],"conditionalProperties":{"visible":[{"propertyValue":true,"left":"@0ca68659-c11a-4d15-aa29-dd3c44023e26","operator":"EQUAL_TO","right":2}]}},{"key":"639419ab-de9b-4d2c-b25a-31ad1f1e4580","label":"Forename","required":false,"controlType":"textbox","visible":true},{"key":"36e6b980-d5df-4985-95b2-38dfc7b79a57","label":"Surname","required":false,"controlType":"textbox","visible":true},{"key":"0ddb890b-d9aa-4706-8f5b-dedeee7626b9","label":"Firm Name","required":false,"controlType":"textbox","visible":false,"conditionalProperties":{"visible":[{"propertyValue":true,"left":"@b609b10a-95d1-4da3-b73e-e4f48a0dde18","operator":"EQUAL_TO","right":1}]}}]}]},{"key":"65d9b12f-e3e7-4d07-bf9e-eb3721bc9022","controlType":"section","label":"Counter Signature Details","visible":true,"questions":[{"key":"2609fc2f-2af4-485e-ae31-9793f77d2887","controlType":"dropdown","label":"Signature Type","visible":true,"options":[{"key":1,"value":"Signature as Secetary"},{"key":2,"value":"Signature as Director"},{"key":3,"value":"Signature as Solicitor on behalf of an Entity"}]},{"key":"3a0d4aa7-6aea-46f1-8827-031ab99d7e80","controlType":"dropdown","label":"Entity Role","visible":false,"options":[{"key":1,"value":"An Individual signing the form on behalf of a firm"},{"key":2,"value":"Self"}],"conditionalProperties":{"visible":[{"propertyValue":true,"left":"@2609fc2f-2af4-485e-ae31-9793f77d2887","operator":"NOT_EQUAL_TO","right":2}]}},{"key":"b4900d01-0e4f-4618-9752-183f851889c3","label":"Forename","required":false,"controlType":"textbox","visible":true},{"key":"546805a1-85bd-48e6-978f-aca7583830cd","label":"Surname","required":false,"controlType":"textbox","visible":true},{"key":"e1aa47a6-a9c0-4837-899f-9877cc08e8de","label":"Frim Name","required":false,"controlType":"textbox","visible":false,"conditionalProperties":{"visible":[{"propertyValue":true,"left":"@3a0d4aa7-6aea-46f1-8827-031ab99d7e80","operator":"EQUAL_TO","right":1}]}}]}]
    }
  }

  

}
