import { Component, HostListener, signal } from '@angular/core';
import { ChatHeader } from "../../features/chat/components/chat-header/chat-header";
import { RouterOutlet } from '@angular/router';
import { ChatCanvas } from "../../features/chat/components/chat-canvas/chat-canvas";
import { CommonModule } from '@angular/common';
import { ChatInput } from "../../features/chat/components/chat-input/chat-input";
import { ConversationDock } from "../../features/chat/components/conversation-dock/conversation-dock";

@Component({
  selector: 'app-main-layout',
  imports: [ChatHeader, CommonModule, ChatCanvas, ChatInput, ConversationDock],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {


  conversations = signal<any[]>([]);

  activeConversation = signal<any>({
    id: '1',
    title: 'Arquitetura de Microsserviços',
    messages: [
      {
        role: 'assistant',
        content: 'Como posso ajudar você hoje?'
      }
    ]
  });

  activeConversationId = signal<string>('1');

  isTyping = signal(false);

  contextOpen = signal(true);

  paletteOpen = signal(false);

  // SEND MESSAGE
  handleSend(content: string) {

    this.isTyping.set(true);

    const conversation = this.activeConversation();

    conversation.messages.push({
      role: 'user',
      content
    });

    this.activeConversation.set({ ...conversation });

    setTimeout(() => {
      this.isTyping.set(false);
    }, 1400);

  }

  // SELECT CONVERSATION
  setActiveConversationId(id: string) {
    this.activeConversationId.set(id);
  }

  // CREATE CONVERSATION
  createConversation() {

    const newConv = {
      id: crypto.randomUUID(),
      title: 'Nova conversa',
      messages: []
    };

    this.conversations.update(c => [...c, newConv]);

  }

  toggleContext() {
    this.contextOpen.update(v => !v);
  }

  openPalette() {
    this.paletteOpen.set(true);
  }

  closePalette() {
    this.paletteOpen.set(false);
  }

  // KEYBOARD SHORTCUT CTRL+K
  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {

    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {

      event.preventDefault();

      this.paletteOpen.update(v => !v);

    }

  }
}
