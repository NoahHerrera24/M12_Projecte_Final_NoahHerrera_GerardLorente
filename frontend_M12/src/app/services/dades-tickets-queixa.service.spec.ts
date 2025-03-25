import { TestBed } from '@angular/core/testing';

import { DadesTicketsQueixaService } from './dades-tickets-queixa.service';

describe('DadesTicketsQueixaService', () => {
  let service: DadesTicketsQueixaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadesTicketsQueixaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
