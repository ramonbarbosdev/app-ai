import { Injectable, signal, computed, inject } from '@angular/core';
import { ChatApiService } from './chat-api.service';

export interface Message {

  role: 'user' | 'assistant';

  content: string;

}

export interface Conversation {

  id: string;

  title: string;

  messages: Message[];

  temporary?: boolean;

}

@Injectable({
  providedIn: 'root'
})
export class ChatStoreService {

  private api = inject(ChatApiService);

  // ----------------------
  // STATE
  // ----------------------

  conversations = signal<Conversation[]>([]);

  activeConversationId = signal<string | null>(null);

  isTyping = signal(false);

  contextOpen = signal(true);

  paletteOpen = signal(false);

  activeConversation = computed(() =>
    this.conversations().find(
      c => c.id === this.activeConversationId()
    ) ?? null
  );

  // ----------------------
  // INIT
  // ----------------------

  loadConversations() {

    this.api.getConversations()
      .subscribe({

        next: (conversations) => {

          const mapped: Conversation[] =
            conversations.map(c => ({

              id: c.id,

              title: c.title,

              messages: [],

              temporary: false

            }));

          this.conversations.set(mapped);

          this.createLocalConversation();

        },

        error: () => {

          this.createLocalConversation();

        }

      });

  }

  // ----------------------
  // CREATE TEMPORARY
  // ----------------------

  createLocalConversation() {

    const existing = this.conversations()
      .find(c => c.temporary);

    if (existing) {

      this.activeConversationId.set(existing.id);

      return;

    }

    const id = this.generateUUID();

    const newConv: Conversation = {

      id,

      title: 'Nova conversa',

      messages: [],

      temporary: true

    };

    this.conversations.update(list =>
      [...list, newConv]
    );

    this.activeConversationId.set(id);

  }

  createConversation() {

    this.createLocalConversation();

  }

  // ----------------------
  // DELETE
  // ----------------------

  deleteConversation(id: string) {

    this.api.removeConversation(id).subscribe({

      next: () => {

        this.removeConversationLocal(id);

      },

      error: () => {

        this.removeConversationLocal(id);

      }

    });

  }

  private removeConversationLocal(id: string) {

    this.conversations.update(list =>
      list.filter(conv => conv.id !== id)
    );

    this.createLocalConversation();

  }

  // ----------------------
  // ACTIVE
  // ----------------------

  setActiveConversation(id: string) {

    this.activeConversationId.set(id);

    const conv = this.conversations()
      .find(c => c.id === id);

    if (conv && !conv.temporary) {

      this.loadHistory(id);

    }

  }

  // ----------------------
  // HISTORY
  // ----------------------

  loadHistory(conversationId: string) {

    this.api.getHistory(conversationId)
      .subscribe({

        next: (history) => {

          this.conversations.update(list =>
            list.map(conv => {

              if (conv.id !== conversationId)
                return conv;

              return {

                ...conv,

                messages: history.map(m => ({
                  role: m.role as 'user' | 'assistant',
                  content: m.content
                }))

              };

            })
          );

        },

        error: () => {}

      });

  }

  // ----------------------
  // SEND MESSAGE
  // ----------------------

  sendMessage(content: string) {

    const id = this.activeConversationId();

    if (!id || !content.trim()) return;

    this.conversations.update(list =>
      list.map(conv =>
        conv.id === id
          ? {
              ...conv,
              temporary: false, // promove
              messages: [
                ...conv.messages,
                {
                  role: 'user',
                  content
                }
              ]
            }
          : conv
      )
    );

    this.isTyping.set(true);

    this.api.sendMessage({

      conversationId: id,

      message: content

    })
    .subscribe({

      next: () => {

        this.loadHistory(id);

        this.isTyping.set(false);

      },

      error: () => {

        this.addAIMessage(
          'Resposta simulada.'
        );

        this.isTyping.set(false);

      }

    });

  }

  addAIMessage(content: string) {

    const id = this.activeConversationId();

    if (!id) return;

    this.conversations.update(list =>
      list.map(conv =>
        conv.id === id
          ? {
              ...conv,
              messages: [
                ...conv.messages,
                {
                  role: 'assistant',
                  content
                }
              ]
            }
          : conv
      )
    );

  }

  // ----------------------
  // RENAME
  // ----------------------

  renameConversation(id: string, title: string) {

    if (!title.trim()) return;

    this.conversations.update(list =>
      list.map(conv =>
        conv.id === id
          ? {
              ...conv,
              title,
              temporary: false
            }
          : conv
      )
    );

    this.api.renameConversation({
      conversationId: id,
      title
    }).subscribe();

  }

  // ----------------------
  // UI STATE
  // ----------------------

  toggleContext() {

    this.contextOpen.update(v => !v);

  }

  openPalette() {

    this.paletteOpen.set(true);

  }

  closePalette() {

    this.paletteOpen.set(false);

  }

  togglePalette() {

    this.paletteOpen.update(v => !v);

  }

  // ----------------------
  // UTILS
  // ----------------------

  generateUUID(): string {

    if (crypto?.randomUUID)
      return crypto.randomUUID();

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
      .replace(/[xy]/g, c => {

        const r = Math.random() * 16 | 0;

        const v = c === 'x'
          ? r
          : (r & 0x3 | 0x8);

        return v.toString(16);

      });

  }

}
