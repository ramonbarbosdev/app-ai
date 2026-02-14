import { Component, EventEmitter, Output, signal } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-conversation-sidebar',
  imports: [CommonModule, ScrollPanelModule, ButtonModule],
  templateUrl: './conversation-sidebar.html',
  styleUrl: './conversation-sidebar.scss',
})
export class ConversationSidebar {

   conversations = signal<string[]>([]);

  @Output()
  selectConversation = new EventEmitter<string>();

  constructor(private chatService: ChatService) {

    this.load();

  }

  load() {

    this.chatService
      .getConversations()
      .subscribe(list => this.conversations.set(list));

  }

  select(id: string) {

    this.selectConversation.emit(id);

  }

  newConversation() {

    const id = crypto.randomUUID();

    this.selectConversation.emit(id);

  }


}
