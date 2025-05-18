import { TestBed } from '@angular/core/testing';

import { SignupCardService } from './signup-card.service';

describe('SignupCardService', () => {
  let service: SignupCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
