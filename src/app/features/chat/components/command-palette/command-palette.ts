import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-command-palette',
  imports: [CommonModule, FormsModule],
  templateUrl: './command-palette.html',
  styleUrl: './command-palette.scss',
})
export class CommandPalette {

  
  @Input()
  isOpen: boolean = false;

  @Input()
  conversations: any[] = [];

  @Output()
  close = new EventEmitter<void>();

  @Output()
  selectConversation = new EventEmitter<string>();

  search = signal('');

  filtered = computed(() => {

    const term = this.search().toLowerCase();

    if (!term) return this.conversations;

    return this.conversations.filter(c =>
      c.title.toLowerCase().includes(term)
    );

  });

  handleClose() {
    this.search.set('');
    this.close.emit();
  }

  handleSelect(id: string) {
    this.selectConversation.emit(id);
    this.handleClose();
  }
}
