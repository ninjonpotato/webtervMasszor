import { TestBed } from '@angular/core/testing';

import { IdopontServiceService } from './idopont-service.service';

describe('IdopontServiceService', () => {
  let service: IdopontServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdopontServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
