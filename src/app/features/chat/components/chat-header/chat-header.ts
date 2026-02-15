import { Component, computed, EventEmitter, Input, Output, signal, SimpleChanges } from '@angular/core';
import { ChatStoreService } from '../../../../services/chat-store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-header',
  imports: [CommonModule],
  templateUrl: './chat-header.html',
  styleUrl: './chat-header.scss',
  standalone: true,
})
export class ChatHeader {

  @Output()
  commandPalette = new EventEmitter<void>();

  editing = signal(false);

  editText = signal('');

  conversation = computed(() => this.chat.activeConversation());

  constructor(public chat: ChatStoreService) {}

  startEdit() {

    const title = this.conversation()?.title ?? '';

    this.editText.set(title);

    this.editing.set(true);

  }

  saveEdit() {

    const value = this.editText().trim();

    const id = this.conversation()?.id;

    if (!value || !id) {

      this.editing.set(false);

      return;

    }

    this.chat.renameConversation(id, value);

    this.editing.set(false);

  }

  onCommandPalette() {

    this.commandPalette.emit();

  }

}
