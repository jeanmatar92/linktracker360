import { TestBed } from '@angular/core/testing';

import { SpreadsheetToolsService } from './spreadsheet-tools.service';

describe('SpreadsheetToolsService', () => {
  let service: SpreadsheetToolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpreadsheetToolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
