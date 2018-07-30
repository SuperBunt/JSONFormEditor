import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionPropertiesComponent } from './condition-properties.component';

describe('ConditionPropertiesComponent', () => {
  let component: ConditionPropertiesComponent;
  let fixture: ComponentFixture<ConditionPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
