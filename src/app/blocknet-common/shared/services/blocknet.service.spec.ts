import { TestBed, inject } from '@angular/core/testing';

import { BlocknetService } from './blocknet.service';

describe('BlocknetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlocknetService]
    });
  });

  it('should be created', inject([BlocknetService], (service: BlocknetService) => {
    expect(service).toBeTruthy();
  }));
});
