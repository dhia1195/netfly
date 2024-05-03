import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginchatComponent } from './loginchat.component';

describe('LoginchatComponent', () => {
  let component: LoginchatComponent;
  let fixture: ComponentFixture<LoginchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginchatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
