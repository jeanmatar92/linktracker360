import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cm360ClickTagsTrackerComponent } from './cm360-click-tags-tracker.component';

describe('Cm360ClickTagsTrackerComponent', () => {
  let component: Cm360ClickTagsTrackerComponent;
  let fixture: ComponentFixture<Cm360ClickTagsTrackerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Cm360ClickTagsTrackerComponent]
    });
    fixture = TestBed.createComponent(Cm360ClickTagsTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
