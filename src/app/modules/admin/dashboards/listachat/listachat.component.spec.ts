import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListachatComponent } from './listachat.component';

describe('ListachatComponent', () => {
  let component: ListachatComponent;
  let fixture: ComponentFixture<ListachatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListachatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListachatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
