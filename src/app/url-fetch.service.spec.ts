import { TestBed } from '@angular/core/testing';

import { UrlFetchService } from './url-fetch.service';

describe('UrlFetchService', () => {
  let service: UrlFetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlFetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
