import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLinkTrackerComponent } from './single-link-tracker.component';

describe('SingleLinkTrackerComponent', () => {
  let component: SingleLinkTrackerComponent;
  let fixture: ComponentFixture<SingleLinkTrackerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleLinkTrackerComponent]
    });
    fixture = TestBed.createComponent(SingleLinkTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
