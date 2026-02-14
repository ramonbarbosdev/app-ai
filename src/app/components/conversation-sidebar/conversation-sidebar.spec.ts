import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationSidebar } from './conversation-sidebar';

describe('ConversationSidebar', () => {
  let component: ConversationSidebar;
  let fixture: ComponentFixture<ConversationSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversationSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversationSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
