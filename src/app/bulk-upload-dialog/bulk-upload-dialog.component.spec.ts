import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUploadDialogComponent } from './bulk-upload-dialog.component';

describe('BulkUploadDialogComponent', () => {
  let component: BulkUploadDialogComponent;
  let fixture: ComponentFixture<BulkUploadDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkUploadDialogComponent]
    });
    fixture = TestBed.createComponent(BulkUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
