import { TestBed } from '@angular/core/testing';

import { VelemenyService } from './velemeny.service';

describe('VelemenyService', () => {
  let service: VelemenyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VelemenyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
