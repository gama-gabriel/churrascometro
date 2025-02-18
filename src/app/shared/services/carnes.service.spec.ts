import { TestBed } from '@angular/core/testing';

import { CarnesService } from './carnes.service';

describe('CarnesService', () => {
  let service: CarnesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarnesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
