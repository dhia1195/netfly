import { TestBed } from '@angular/core/testing';
import { fournisseurService } from './fournisseur.service';


describe('FournisseurService', () => {
  let service: fournisseurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(fournisseurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
