import { TestBed } from '@angular/core/testing';

import { ThePoioApiServiceService } from './the-poio-api-service.service';

describe('ThePoioApiServiceService', () => {
  let service: ThePoioApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThePoioApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
