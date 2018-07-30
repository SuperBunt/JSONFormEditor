import { Component, OnInit, Input } from '@angular/core';
import { Condition } from '../conditionalProperty';

@Component({
  selector: 'app-condition-properties',
  templateUrl: './condition-properties.component.html',
  styleUrls: ['./condition-properties.component.css']
})
export class ConditionPropertiesComponent implements OnInit {

  @Input() prop: any

  constructor() { }

  ngOnInit() {
  }

}
