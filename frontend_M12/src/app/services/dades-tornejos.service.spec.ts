import { TestBed } from '@angular/core/testing';

import { DadesTornejosService } from './dades-tornejos.service';

describe('DadesTornejosService', () => {
  let service: DadesTornejosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadesTornejosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
