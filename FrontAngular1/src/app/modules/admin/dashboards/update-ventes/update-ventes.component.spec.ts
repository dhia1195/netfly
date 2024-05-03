import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVentesComponent } from './update-ventes.component';

describe('UpdateVentesComponent', () => {
  let component: UpdateVentesComponent;
  let fixture: ComponentFixture<UpdateVentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateVentesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateVentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
