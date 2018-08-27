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

      // this.tab.questions = [];
      // this.tabService.standardVerificationTab()
      //   .then(section => {
      //     this.numSections = this.tab.questions.push(section);
      //     return this.tabService.createQuestionType("section");
      //   }).then(information => {
      //     information.label = "Information";
      //     information.questions = [];
      //     this.tab.questions[0].questions.push(information);
      //     return this.tabService.createQuestionType("display");
      //   }).then(d1 => {
      //     d1.label = "Both sides to the transaction (or their solicitors) must sign. The notes following constitute part of this form"
      //     this.tab.questions[0].questions[0].questions.push(d1);
      //     return this.tabService.createQuestionType("display");
      //   }).then(d2 => {
      //     d2.label = "Note: This form will be signed with certificate / certificates issued by Revenue Online Services (ROS)"
      //     this.tab.questions[0].questions[0].questions.push(d2);
      //     console.log(this.tab)
      //     return this.tabService.createQuestionType("display");
      //   });

      // this.tabService.standardVerificationTab()
      //   .then(x => {
      //     console.log("is Verification: " + x);
      //     this.numSections = this.tab.questions.push(x);
      //   }
      //   );
      //this.tab = {"key":"VerificationTab","label":"Verification","order":4,"controlType":"step","visible":true,"questions":[{"key":"00000000-0000-0000-0000-000000001001","label":"Verification Details","controlType":"section","visible":true,"questions":[{"key":"00000000-0000-0000-0000-000000001002","label":"Verified By","required":true,"controlType":"dropdown","regSysKey":"","regSysType":"number","placeholder":"","visible":true,"orientation":"horizontal","options":[{"key":2000,"value":"Electronic Filing Agent (Person) - ROS Only"},{"key":2001,"value":"Electronic Filing Agent (Company) - ROS Only"},{"key":2002,"value":"Electronic Filing Agent (Business Name) - ROS Only"},{"key":2003,"value":"Director, Secretary, Liquidator, etc."}]}]},{"key":"00000000-0000-0000-0000-000000001008","label":"ROS Certificate Holders","controlType":"section","visible":true,"questions":[{"key":"00000000-0000-0000-0000-000000001009","label":"","required":false,"controlType":"free-note","regSysKey":"","regSysType":"string","value":"Sign this form with certificate / certificates issued by Revenue online Services(ROS)","placeholder":"","visible":true},{"key":"00000000-0000-0000-0000-000000001010","label":"Sign with ROS","required":true,"controlType":"radio","orientation":"vertical","regSysKey":"","regSysType":"boolean","value":"","placeholder":"","visible":true,"options":[{"key":true,"value":"Yes"},{"key":false,"value":"No"}]},{"key":"00000000-0000-0000-0000-000000001011","label":"","required":false,"controlType":"free-note","regSysKey":"","regSysType":"string","value":"WARNING: ROS cert names must match the name on the form below. If the director and secretary are signing then the ROS cert must be in their own names and not that of the company. Unless further documentation is required by the CRO e.g. Accounts, changes may take immediate effect on the CRO register.","placeholder":"","visible":true}]},{"key":"00000000-0000-0000-0000-000000001003","label":"Details of Electronic Filing Agent who is certifying that the information provided is correct","controlType":"section","visible":false,"conditionalProperties":{"visible":[{"propertyValue":true,"left":[2000,2001,2002],"operator":"CONTAINS","right":"@00000000-0000-0000-0000-000000001002"}]},"questions":[{"key":"00000000-0000-0000-0000-000000001005","label":"Signature Type","required":false,"controlType":"display","regSysKey":"","regSysType":"string","placeholder":"","visible":true,"sizeColumn":2,"value":"Signature as Agent"},{"key":"00000000-0000-0000-0000-000000001006","label":"CRO Agent ID","required":true,"controlType":"textbox","regSysKey":"","regSysType":"string","placeholder":"","sizeColumn":2,"visible":true,"value":"<<API Search across CRO Agents>>"},{"key":"00000000-0000-0000-0000-000000001007","label":"Name","required":false,"controlType":"display","regSysKey":"","regSysType":"string","placeholder":"","sizeColumn":2,"visible":true,"value":"<<Prepopulated based on CRO Agent ID>>","conditionalProperties":{"visible":[{"propertyValue":false,"left":[2000,2002],"operator":"CONTAINS","right":"@00000000-0000-0000-0000-000000001002"}]}}]},{"key":"00000000-0000-0000-0000-000000001012","label":"Certifying Individual Details","controlType":"section","visible":false,"conditionalProperties":{"visible":[{"propertyValue":true,"left":"@00000000-0000-0000-0000-000000001002","operator":"EQUAL_TO","right":2003}]},"questions":[{"key":"00000000-0000-0000-0000-000000001013","label":"Signature","required":true,"controlType":"dropdown","regSysKey":"","regSysType":"number","placeholder":"","visible":true,"sizeColumn":2,"options":[{"key":2007,"value":"Signature as Director"},{"key":2008,"value":"Signature as Liquidator"},{"key":2009,"value":"Signature as Secretary"},{"key":2010,"value":"Signature as Statutory Receiver"}]},{"key":"00000000-0000-0000-0000-000000001014","label":"Entity Type","required":true,"controlType":"dropdown","regSysKey":"","regSysType":"number","placeholder":"","visible":false,"sizeColumn":2,"value":2011,"conditionalProperties":{"visible":[{"propertyValue":true,"left":"@00000000-0000-0000-0000-000000001013","operator":"NOT_EQUAL_TO","right":2009}]},"options":[{"key":2011,"value":"EEA Resident Individual"},{"key":2012,"value":"Non EEA Resident Individual"}]},{"key":"00000000-0000-0000-0000-000000001015","label":"Entity Type","required":true,"controlType":"dropdown","regSysKey":"","regSysType":"number","placeholder":"","visible":false,"sizeColumn":2,"value":2013,"conditionalProperties":{"visible":[{"propertyValue":true,"left":"@00000000-0000-0000-0000-000000001013","operator":"EQUAL_TO","right":2009}]},"options":[{"key":2013,"value":"Body Corporate formed in Ireland and registered otherwise than at the CRO"},{"key":2014,"value":"Body Corporate Registered Abroad"},{"key":2015,"value":"EEA Resident Individual"},{"key":2016,"value":"Irish Registered Company"},{"key":2017,"value":"Non EEA Resident Individual"},{"key":2018,"value":"Other Body Corporate formed in Ireland"},{"key":2019,"value":"Partnership not registered as a business name in Ireland"}]},{"key":"00000000-0000-0000-0000-000000001016","label":"Name","required":false,"controlType":"dropdown","regSysKey":"","regSysType":"number","sizeColumn":2,"placeholder":"","visible":false,"conditionalProperties":{"visible":[{"propertyValue":true,"left":"@00000000-0000-0000-0000-000000001013","operator":"EQUAL_TO","right":2009}]},"options":[{"key":2020,"value":"<< prepopulated with name of Secretary and dob>>"}]},{"key":"00000000-0000-0000-0000-000000001017","label":"Name","required":true,"controlType":"dropdown","regSysKey":"","regSysType":"number","placeholder":"","sizeColumn":2,"visible":false,"conditionalProperties":{"visible":[{"propertyValue":true,"left":"@00000000-0000-0000-0000-000000001013","operator":"EQUAL_TO","right":2007}]},"options":[{"key":2021,"value":"<<prepopulated with name of Director and dob>>"}]}]},{"key":"IndividualDetailsSection","label":"Individual Details","controlType":"section","visible":false,"conditionalProperties":{"visible":[{"propertyValue":true,"left":[2008,2010],"operator":"CONTAINS","right":"@00000000-0000-0000-0000-000000001013"}]},"questions":[{"key":"00000000-0000-0000-0000-000000001019","label":"","required":false,"controlType":"free-note","regSysKey":"","regSysType":"string","value":"Name of Individual who is signing on behalf of a firm.","placeholder":"","visible":true},{"key":"00000000-0000-0000-0000-000000001020","label":"Forename","required":true,"controlType":"textbox","regSysKey":"","regSysType":"string","value":"","placeholder":"","visible":true,"sizeColumn":2},{"key":"00000000-0000-0000-0000-000000001021","label":"Surname","required":true,"controlType":"textbox","regSysKey":"","regSysType":"string","value":"","placeholder":"","visible":true,"sizeColumn":2},{"key":"00000000-0000-0000-0000-000000001022","label":"Other Forenames","required":true,"controlType":"textbox","regSysKey":"","regSysType":"string","value":"","placeholder":"","visible":true,"sizeColumn":2},{"key":"00000000-0000-0000-0000-000000001024","label":"Entity Type","required":true,"controlType":"dropdown","regSysKey":"","regSysType":"number","placeholder":"","visible":false,"value":2022,"conditionalProperties":{"visible":[{"propertyValue":true,"left":[2001,2002],"operator":"CONTAINS","right":"@00000000-0000-0000-0000-000000001002"}]},"options":[{"key":2022,"value":"EEA Resident Individual"},{"key":2023,"value":"Non EEA Resident Individual"}]},{"key":"00000000-0000-0000-0000-000000001025","label":"Entity Type","required":true,"controlType":"dropdown","regSysKey":"","regSysType":"number","placeholder":"","visible":false,"value":2011,"sizeColumn":2,"conditionalProperties":{"visible":[{"propertyValue":true,"left":[2013,2014,2016,2018,2019],"operator":"CONTAINS","right":"@00000000-0000-0000-0000-000000001015"}]},"options":[{"key":2011,"value":"EEA Resident Individual"},{"key":2012,"value":"Non EEA Resident Individual"}]}]}]}

    }
  }
}
