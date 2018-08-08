import { Component, OnInit, Input } from '@angular/core';
import { Condition } from '../conditionalProperty';
import { ConditionValues } from '../conditionValues';

@Component({
  selector: 'app-condition-properties',
  templateUrl: './condition-properties.component.html',
  styleUrls: ['./condition-properties.component.css']
})
export class ConditionPropertiesComponent implements OnInit {

  @Input() prop: any;
  conditions: ConditionValues[];
  operators = ["CONTAINS","EQUAL_TO","NOT_EQUAL_TO","LESS_THAN","GREATER_THAN","LESS_THAN_OR_EQUAL_TO","GREATER_THAN_OR_EQUAL_TO"]
  operatorSelected: any;
  objectKey: string;
  @Input() index: number;

  constructor() { }

  ngOnInit() {    
    console.log(JSON.stringify(this.prop))
    this.objectKey = Object.keys(this.prop)[0];
  }

  AddOperator(op: string){
    console.log("op: "+op)
    //this.prop.operator = op;
  }

}
