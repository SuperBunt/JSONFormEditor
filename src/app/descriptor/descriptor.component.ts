import { Component, OnInit, Input } from '@angular/core';
import { Descriptor } from '../question-dialog/descriptor';

@Component({
  selector: 'app-descriptor',
  templateUrl: './descriptor.component.html',
  styleUrls: ['./descriptor.component.css']
})
export class DescriptorComponent implements OnInit {

  @Input() description: Descriptor;

  constructor() { }

  ngOnInit() {
  }

}
