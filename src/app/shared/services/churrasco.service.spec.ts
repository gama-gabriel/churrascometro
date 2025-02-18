import { TestBed } from '@angular/core/testing';

import { ChurrascoService } from './churrasco.service';

describe('ChurrascoService', () => {
  let service: ChurrascoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChurrascoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
