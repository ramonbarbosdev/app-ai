import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationDock } from './conversation-dock';

describe('ConversationDock', () => {
  let component: ConversationDock;
  let fixture: ComponentFixture<ConversationDock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversationDock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversationDock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
