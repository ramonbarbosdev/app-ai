import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCanvas } from './chat-canvas';

describe('ChatCanvas', () => {
  let component: ChatCanvas;
  let fixture: ComponentFixture<ChatCanvas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatCanvas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatCanvas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
