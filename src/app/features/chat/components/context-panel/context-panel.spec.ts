import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextPanel } from './context-panel';

describe('ContextPanel', () => {
  let component: ContextPanel;
  let fixture: ComponentFixture<ContextPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContextPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContextPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
