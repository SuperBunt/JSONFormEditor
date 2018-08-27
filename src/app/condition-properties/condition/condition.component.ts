import { Component, OnInit, Input } from '@angular/core';
import { ConditionValues } from '../../conditionValues';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.css']
})
export class ConditionComponent implements OnInit {
  
  @Input() condition: any;
  operators = ["CONTAINS","EQUAL_TO","NOT_EQUAL_TO","LESS_THAN","GREATER_THAN","LESS_THAN_OR_EQUAL_TO","GREATER_THAN_OR_EQUAL_TO"]
  operatorSelected: any;
  constructor() { }

  ngOnInit() {
  }

  AddOperator(op: string){
    console.log("op: "+op)
    this.condition.operator = op;
  }

}
