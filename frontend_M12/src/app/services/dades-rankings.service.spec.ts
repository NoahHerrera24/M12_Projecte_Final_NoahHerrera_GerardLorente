import { TestBed } from '@angular/core/testing';

import { DadesRankingsService } from './dades-rankings.service';

describe('DadesRankingsService', () => {
  let service: DadesRankingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadesRankingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
