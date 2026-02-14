import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-context-panel',
  imports: [CommonModule],
  templateUrl: './context-panel.html',
  styleUrl: './context-panel.scss',
})
export class ContextPanel {

   @Input()
  conversation: any;

  @Input()
  isOpen: boolean = true;

  @Output()
  close = new EventEmitter<void>();


}
