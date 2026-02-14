import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, NgClass } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ChatService } from '../../services/chat.service';


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

  messages = signal<ChatMessage[]>([
    { text: 'Olá! Como posso ajudar?', isBot: true }
  ]);

  input = signal('');
  loading = signal(false);

  constructor(private chatService: ChatService) { }

  async send() {

    const text = this.input().trim();

    if (!text || this.loading()) return;

    // mensagem do usuário
    this.messages.update(msgs => [
      ...msgs,
      { text, isBot: false }
    ]);

    this.input.set('');
    this.loading.set(true);

    try {

      const reply = await this.chatService.sendMessage(text);

      // mensagem do bot
      this.messages.update(msgs => [
        ...msgs,
        { text: reply, isBot: true }
      ]);

    } catch (error) {

      this.messages.update(msgs => [
        ...msgs,
        { text: 'Erro ao comunicar com servidor.', isBot: true }
      ]);

      console.error(error);

    } finally {

      this.loading.set(false);

    }

  }


}
