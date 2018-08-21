import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Step } from '../step';
import { Question } from '../question'
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

  constructor(public tabService: SubmissionService) { }

  ngOnInit(): void {
  }

  AddSection(): void {
    // Add section to the tab
    console.log("Add section...")
    let newSection: Question = new Question();
    newSection.key = Guid.create().toString();
    newSection.controlType = "section";
    newSection.label = "SECTION " + (this.numSections + 1) + " Label";
    newSection.visible = true;
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
      
      //this.tab = {"key":"VerificationTab","label":"Verification","order":4,"controlType":"step","visible":true,"questions":[{"key":"00000000-0000-0000-0000-000000001001","label":"Verification Details","controlType":"section","visible":true,"questions":[{"key":"00000000-0000-0000-0000-000000001002","label":"Verified By","required":true,"controlType":"dropdown","regSysKey":"","regSysType":"number","placeholder":"","visible":true,"orientation":"horizontal","options":[{"key":2000,"value":"Electronic Filing Agent (Person) - ROS Only"},{"key":2001,"value":"Electronic Filing Agent (Company) - ROS Only"},{"key":2002,"value":"Electronic Filing Agent (Business Name) - ROS Only"},{"key":2003,"value":"Director, Secretary, Liquidator, etc."}]}]},{"key":"00000000-0000-0000-0000-000000001008","label":"ROS Certificate Holders","controlType":"section","visible":true,"questions":[{"key":"00000000-0000-0000-0000-000000001009","label":"","required":false,"controlType":"free-note","regSysKey":"","regSysType":"string","value":"Sign this form with certificate / certificates issued by Revenue online Services(ROS)","placeholder":"","visible":true},{"key":"00000000-0000-0000-0000-000000001010","label":"Sign with ROS","required":true,"controlType":"radio","orientation":"vertical","regSysKey":"","regSysType":"boolean","value":"","placeholder":"","visible":true,"options":[{"key":true,"value":"Yes"},{"key":false,"value":"No"}]},{"key":"00000000-0000-0000-0000-000000001011","label":"","required":false,"controlType":"free-note","regSysKey":"","regSysType":"string","value":"WARNING: ROS cert names must match the name on the form below. If the director and secretary are signing then the ROS cert must be in their own names and not that of the company. Unless further documentation is required by the CRO e.g. Accounts, changes may take immediate effect on the CRO register.","placeholder":"","visible":true}]},{"key":"00000000-0000-0000-0000-000000001003","label":"Details of Electronic Filing Agent who is certifying that the information provided is correct","controlType":"section","visible":false,"conditionalProperties":{"visible":[{"propertyValue":true,"left":[2000,2001,2002],"operator":"CONTAINS","right":"@00000000-0000-0000-0000-000000001002"}]},"questions":[{"key":"00000000-0000-0000-0000-000000001005","label":"Signature Type","required":false,"controlType":"display","regSysKey":"","regSysType":"string","placeholder":"","visible":true,"sizeColumn":2,"value":"Signature as Agent"},{"key":"00000000-0000-0000-0000-000000001006","label":"CRO Agent ID","required":true,"controlType":"textbox","regSysKey":"","regSysType":"string","placeholder":"","sizeColumn":2,"visible":true,"value":"<<API Search across CRO Agents>>"},{"key":"00000000-0000-0000-0000-000000001007","label":"Name","required":false,"controlType":"display","regSysKey":"","regSysType":"string","placeholder":"","sizeColumn":2,"visible":true,"value":"<<Prepopulated based on CRO Agent ID>>","conditionalProperties":{"visible":[{"propertyValue":false,"left":[2000,2002],"operator":"CONTAINS","right":"@00000000-0000-0000-0000-000000001002"}]}}]},{"key":"00000000-0000-0000-0000-000000001012","label":"Certifying Individual Details","controlType":"section","visible":false,"conditionalProperties":{"visible":[{"propertyValue":true,"left":"@00000000-0000-0000-0000-000000001002","operator":"EQUAL_TO","right":2003}]},"questions":[{"key":"00000000-0000-0000-0000-000000001013","label":"Signature","required":true,"controlType":"dropdown","regSysKey":"","regSysType":"number","placeholder":"","visible":true,"sizeColumn":2,"options":[{"key":2007,"value":"Signature as Director"},{"key":2008,"value":"Signature as Liquidator"},{"key":2009,"value":"Signature as Secretary"},{"key":2010,"value":"Signature as Statutory Receiver"}]},{"key":"00000000-0000-0000-0000-000000001014","label":"Entity Type","required":true,"controlType":"dropdown","regSysKey":"","regSysType":"number","placeholder":"","visible":false,"sizeColumn":2,"value":2011,"conditionalProperties":{"visible":[{"propertyValue":true,"left":"@00000000-0000-0000-0000-000000001013","operator":"NOT_EQUAL_TO","right":2009}]},"options":[{"key":2011,"value":"EEA Resident Individual"},{"key":2012,"value":"Non EEA Resident Individual"}]},{"key":"00000000-0000-0000-0000-000000001015","label":"Entity Type","required":true,"controlType":"dropdown","regSysKey":"","regSysType":"number","placeholder":"","visible":false,"sizeColumn":2,"value":2013,"conditionalProperties":{"visible":[{"propertyValue":true,"left":"@00000000-0000-0000-0000-000000001013","operator":"EQUAL_TO","right":2009}]},"options":[{"key":2013,"value":"Body Corporate formed in Ireland and registered otherwise than at the CRO"},{"key":2014,"value":"Body Corporate Registered Abroad"},{"key":2015,"value":"EEA Resident Individual"},{"key":2016,"value":"Irish Registered Company"},{"key":2017,"value":"Non EEA Resident Individual"},{"key":2018,"value":"Other Body Corporate formed in Ireland"},{"key":2019,"value":"Partnership not registered as a business name in Ireland"}]},{"key":"00000000-0000-0000-0000-000000001016","label":"Name","required":false,"controlType":"dropdown","regSysKey":"","regSysType":"number","sizeColumn":2,"placeholder":"","visible":false,"conditionalProperties":{"visible":[{"propertyValue":true,"left":"@00000000-0000-0000-0000-000000001013","operator":"EQUAL_TO","right":2009}]},"options":[{"key":2020,"value":"<< prepopulated with name of Secretary and dob>>"}]},{"key":"00000000-0000-0000-0000-000000001017","label":"Name","required":true,"controlType":"dropdown","regSysKey":"","regSysType":"number","placeholder":"","sizeColumn":2,"visible":false,"conditionalProperties":{"visible":[{"propertyValue":true,"left":"@00000000-0000-0000-0000-000000001013","operator":"EQUAL_TO","right":2007}]},"options":[{"key":2021,"value":"<<prepopulated with name of Director and dob>>"}]}]},{"key":"IndividualDetailsSection","label":"Individual Details","controlType":"section","visible":false,"conditionalProperties":{"visible":[{"propertyValue":true,"left":[2008,2010],"operator":"CONTAINS","right":"@00000000-0000-0000-0000-000000001013"}]},"questions":[{"key":"00000000-0000-0000-0000-000000001019","label":"","required":false,"controlType":"free-note","regSysKey":"","regSysType":"string","value":"Name of Individual who is signing on behalf of a firm.","placeholder":"","visible":true},{"key":"00000000-0000-0000-0000-000000001020","label":"Forename","required":true,"controlType":"textbox","regSysKey":"","regSysType":"string","value":"","placeholder":"","visible":true,"sizeColumn":2},{"key":"00000000-0000-0000-0000-000000001021","label":"Surname","required":true,"controlType":"textbox","regSysKey":"","regSysType":"string","value":"","placeholder":"","visible":true,"sizeColumn":2},{"key":"00000000-0000-0000-0000-000000001022","label":"Other Forenames","required":true,"controlType":"textbox","regSysKey":"","regSysType":"string","value":"","placeholder":"","visible":true,"sizeColumn":2},{"key":"00000000-0000-0000-0000-000000001024","label":"Entity Type","required":true,"controlType":"dropdown","regSysKey":"","regSysType":"number","placeholder":"","visible":false,"value":2022,"conditionalProperties":{"visible":[{"propertyValue":true,"left":[2001,2002],"operator":"CONTAINS","right":"@00000000-0000-0000-0000-000000001002"}]},"options":[{"key":2022,"value":"EEA Resident Individual"},{"key":2023,"value":"Non EEA Resident Individual"}]},{"key":"00000000-0000-0000-0000-000000001025","label":"Entity Type","required":true,"controlType":"dropdown","regSysKey":"","regSysType":"number","placeholder":"","visible":false,"value":2011,"sizeColumn":2,"conditionalProperties":{"visible":[{"propertyValue":true,"left":[2013,2014,2016,2018,2019],"operator":"CONTAINS","right":"@00000000-0000-0000-0000-000000001015"}]},"options":[{"key":2011,"value":"EEA Resident Individual"},{"key":2012,"value":"Non EEA Resident Individual"}]}]}]}
      console.log(this.tab)
    }
  }
}
