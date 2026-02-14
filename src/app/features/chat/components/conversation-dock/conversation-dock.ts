import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-conversation-dock',
  imports: [CommonModule],
  templateUrl: './conversation-dock.html',
  styleUrl: './conversation-dock.scss',
})
export class ConversationDock {

  
  @Input()
  conversations: any[] = [];

  @Input()
  activeId!: string;

  @Output()
  select = new EventEmitter<string>();

  @Output()
  create = new EventEmitter<void>();

  onSelect(id: string) {
    this.select.emit(id);
  }

  onCreate() {
    this.create.emit();
  }


}
