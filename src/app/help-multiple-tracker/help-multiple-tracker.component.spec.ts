import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpMultipleTrackerComponent } from './help-multiple-tracker.component';

describe('HelpMultipleTrackerComponent', () => {
  let component: HelpMultipleTrackerComponent;
  let fixture: ComponentFixture<HelpMultipleTrackerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelpMultipleTrackerComponent]
    });
    fixture = TestBed.createComponent(HelpMultipleTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
