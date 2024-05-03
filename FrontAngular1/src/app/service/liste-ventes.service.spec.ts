import { TestBed } from '@angular/core/testing';

import { ListeVentesService } from './liste-ventes.service';

describe('ListeVentesService', () => {
  let service: ListeVentesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeVentesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
