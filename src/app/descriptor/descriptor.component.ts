import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Descriptor } from '../question-dialog/descriptor';
import { SlideInOutAnimation } from '../_animations/slide-in-out';

@Component({
  selector: 'app-descriptor',
  templateUrl: './descriptor.component.html',
  styleUrls: ['./descriptor.component.css'],
  animations:[SlideInOutAnimation]
})
export class DescriptorComponent implements OnInit {

  @Input() description: Descriptor;
  @Input() index: number;
  @Output() itemDeleted: EventEmitter<number> = new EventEmitter();
  
  animationState = 'in';

  constructor() { }

  ngOnInit() {
  }

  delete(index: number){
    console.log("Deleting descriptor: " + this.index)
    this.itemDeleted.emit(this.index);
  }

}
