import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatgeminiComponent } from './chatgemini.component';

describe('ChatgeminiComponent', () => {
  let component: ChatgeminiComponent;
  let fixture: ComponentFixture<ChatgeminiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatgeminiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatgeminiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
