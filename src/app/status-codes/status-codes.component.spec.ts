import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCodesComponent } from './status-codes.component';

describe('StatusCodesComponent', () => {
  let component: StatusCodesComponent;
  let fixture: ComponentFixture<StatusCodesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusCodesComponent]
    });
    fixture = TestBed.createComponent(StatusCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
