import {
  Component,
  signal,
  effect,
  ElementRef,
  ViewChild
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
    NgClass
  ],

  templateUrl: './simple-chat.html'
})
export class SimpleChat {

  private readonly STORAGE_KEY = 'conversationId';

  @ViewChild('scrollContainer')
  scrollContainer!: ElementRef<HTMLDivElement>;

  conversationId = signal<string>(
    localStorage.getItem(this.STORAGE_KEY)
    ?? crypto.randomUUID()
  );

  messages = signal<ChatMessage[]>([]);

  input = signal('');

  loading = signal(false);

  constructor(private chatService: ChatService) {

    localStorage.setItem(
      this.STORAGE_KEY,
      this.conversationId()
    );

    this.loadHistory();

    // AUTO SCROLL
    effect(() => {

      this.messages();

      queueMicrotask(() => {

        if (!this.scrollContainer) return;

        const el = this.scrollContainer.nativeElement;

        el.scrollTop = el.scrollHeight;

      });

    });

  }

  async send() {

    const text = this.input().trim();

    if (!text || this.loading()) return;

    this.messages.update(msgs => [
      ...msgs,
      { text, isBot: false }
    ]);

    this.input.set('');

    this.loading.set(true);

    try {

      const result =
        await this.chatService.sendMessage(
          this.conversationId(),
          text
        );

      this.messages.update(msgs => [
        ...msgs,
        {
          text: result.content,
          isBot: true
        }
      ]);

      console.log(
        'Tokens usados:',
        result.totalTokens
      );

    }
    catch {

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

  loadHistory() {

    this.chatService
      .getHistory(this.conversationId())
      .subscribe(history => {

        if (!history || history.length === 0) {

          this.messages.set([
            {
              text: 'Olá! Como posso ajudar?',
              isBot: true
            }
          ]);

          return;

        }

        const msgs = history.map(m => ({
          text: m.content,

          isBot: m.type === 'ASSISTANT'

        }));

        this.messages.set(msgs);

      });

  }

  setConversation(id: string) {

    this.conversationId.set(id);

    localStorage.setItem(
      this.STORAGE_KEY,
      id
    );

    this.messages.set([]);

    this.loadHistory();

  }

  onEnter(event: any) {

    if (event.shiftKey) return;

    event.preventDefault();

    this.send();

  }

}
