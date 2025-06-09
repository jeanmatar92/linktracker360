import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleLinksTrackerComponent } from './multiple-links-tracker.component';

describe('MultipleLinksTrackerComponent', () => {
  let component: MultipleLinksTrackerComponent;
  let fixture: ComponentFixture<MultipleLinksTrackerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultipleLinksTrackerComponent]
    });
    fixture = TestBed.createComponent(MultipleLinksTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
