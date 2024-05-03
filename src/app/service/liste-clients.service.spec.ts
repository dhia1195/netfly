import { TestBed } from '@angular/core/testing';

import { ListeClientsService } from './liste-clients.service';

describe('ListeClientsService', () => {
  let service: ListeClientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
