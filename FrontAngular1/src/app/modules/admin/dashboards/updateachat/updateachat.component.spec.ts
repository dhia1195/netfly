import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateachatComponent } from './updateachat.component';

describe('UpdateachatComponent', () => {
  let component: UpdateachatComponent;
  let fixture: ComponentFixture<UpdateachatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateachatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateachatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
