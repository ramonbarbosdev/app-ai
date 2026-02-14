import {
  Component,
  signal,
  effect
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  NgFor,
  NgIf,
  NgClass
} from '@angular/common';

import {
  CardModule
} from 'primeng/card';

import {
  ScrollPanelModule
} from 'primeng/scrollpanel';

import {
  InputTextModule
} from 'primeng/inputtext';

import {
  ButtonModule
} from 'primeng/button';

import {
  ChatService
} from '../../services/chat.service';

interface ChatMessage {

  text: string;
  isBot: boolean;

}

@Component({
  selector: 'app-simple-chat',
  standalone: true,

  imports: [
    FormsModule,
    NgFor,
    NgIf,
    NgClass,
    CardModule,
    ScrollPanelModule,
    InputTextModule,
    ButtonModule
  ],

  templateUrl: './simple-chat.html'
})
export class SimpleChat {

  private readonly STORAGE_KEY = 'conversationId';

  conversationId = signal<string>(
    localStorage.getItem(this.STORAGE_KEY)
    ?? crypto.randomUUID()
  );

  messages = signal<ChatMessage[]>([
    {
      text: 'Olá! Como posso ajudar?',
      isBot: true
    }
  ]);

  input = signal('');

  loading = signal(false);

  constructor(
    private chatService: ChatService
  ) {

    localStorage.setItem(
      this.STORAGE_KEY,
      this.conversationId()
    );

  }

  async send() {

    const text = this.input().trim();

    if (!text || this.loading()) return;

    this.messages.update(msgs => [
      ...msgs,
      {
        text,
        isBot: false
      }
    ]);

    this.input.set('');

    this.loading.set(true);

    try {

      const reply =
        await this.chatService.sendMessage(
          this.conversationId(),
          text
        );

      this.messages.update(msgs => [
        ...msgs,
        {
          text: reply,
          isBot: true
        }
      ]);

    }
    catch (err) {

      console.error(err);

      this.messages.update(msgs => [
        ...msgs,
        {
          text: 'Erro ao comunicar com servidor.',
          isBot: true
        }
      ]);

    }
    finally {

      this.loading.set(false);

    }

  }

}
