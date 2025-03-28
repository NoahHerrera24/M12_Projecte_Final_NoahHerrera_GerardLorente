import { TestBed } from '@angular/core/testing';

import { DadesEquipsService } from './dades-equips.service';

describe('DadesEquipsService', () => {
  let service: DadesEquipsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadesEquipsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
