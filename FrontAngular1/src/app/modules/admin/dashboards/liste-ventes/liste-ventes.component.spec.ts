import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeVentesComponent } from './liste-ventes.component';

describe('ListeVentesComponent', () => {
  let component: ListeVentesComponent;
  let fixture: ComponentFixture<ListeVentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeVentesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeVentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
