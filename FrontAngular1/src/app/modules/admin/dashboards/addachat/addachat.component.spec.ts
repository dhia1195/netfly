import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddachatComponent } from './addachat.component';

describe('AddachatComponent', () => {
  let component: AddachatComponent;
  let fixture: ComponentFixture<AddachatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddachatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddachatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
