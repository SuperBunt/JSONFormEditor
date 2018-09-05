import { Component, OnInit, Input } from '@angular/core';
import { ConditionValues } from '../../conditionValues';
import { SubmissionService } from '../../submissionService.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.css']
})
export class ConditionComponent implements OnInit {

  @Input() condition: any;
  operatorControl = new FormControl('', [Validators.required]);

  operators = ["CONTAINS", "EQUAL_TO", "NOT_EQUAL_TO", "LESS_THAN", "GREATER_THAN", "LESS_THAN_OR_EQUAL_TO", "GREATER_THAN_OR_EQUAL_TO"]
  operator: string;
  keys: string[];
  options: any[];

  constructor(
    public myService: SubmissionService
  ) { }

  ngOnInit() {
    this.myService.getEntries()
      .then(x => {
        this.keys = x
        console.log(x)
      });
  }

  selectOperator(op: string) {
    console.log("op: " + op)
    if (op == 'CONTAINS') {
      this.condition.left = []
    }
    this.condition.operator = op;
  }

  addValue(value: any) {
    this.condition.left = value.split(",");
    console.log(this.condition.left)
  }

  selectLeft(value: string) {
    console.log("left: " + value)
    this.myService.getOptions(value)
      .then(x => {
        this.options = x
        console.log(x)
      })
    this.condition.left = "@" + value;
  }

  selectRight(value: string) {
    console.log("right: " + value)
    this.myService.getOptions(value)
      .then(x => {
        this.options = x
        console.log(x)
      })
    this.condition.right = "@" + value;
  }

}
