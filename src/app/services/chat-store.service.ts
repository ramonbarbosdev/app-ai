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
    )

  );

  loadConversations() {

    this.api.getConversations()
      .subscribe({

        next: (conversations) => {

          // se banco vazio, cria conversa local
          if (!conversations || conversations.length === 0) {

            this.createLocalConversation();

            return;

          }

          const mapped: Conversation[] =
            conversations.map(c => ({

              id: c.id,

              title: c.title,

              messages: []

            }));

          this.conversations.set(mapped);

          this.setActiveConversation(mapped[0].id);

        },

        error: () => {

          // fallback se backend indisponível
          this.createLocalConversation();

        }

      });

  }

  createLocalConversation() {

    const id = this.generateUUID();

    const newConv: Conversation = {

      id,

      title: 'Nova conversa',

      messages: []

    };

    this.conversations.set([newConv]);

    this.activeConversationId.set(id);

  }

  createConversation() {

    const id = this.generateUUID();

    const newConv: Conversation = {

      id,

      title: 'Nova conversa',

      messages: []

    };

    this.conversations.update(list => [...list, newConv]);

    this.activeConversationId.set(id);

  }


  setActiveConversation(id: string) {

    this.activeConversationId.set(id);

    this.loadHistory(id);

  }

  loadHistory(conversationId: string) {

    this.api.getHistory(conversationId)
      .subscribe({

        next: (history) => {

          this.conversations.update(list =>
            list.map(conv => {

              if (conv.id !== conversationId) return conv;

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

        error: () => {
          // conversa local ainda não existe no backend
        }

      });

  }

  sendMessage(content: string) {

    const id = this.activeConversationId();

    if (!id || !content.trim()) return;

    // adiciona mensagem do usuário localmente
    this.conversations.update(list =>
      list.map(conv =>
        conv.id === id
          ? {
            ...conv,
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

    // envia para backend
    this.api.sendMessage({

      conversationId: id,

      message: content

    })
      .subscribe({

        next: (response: any) => {
          this.loadHistory(id);

          this.isTyping.set(false);

        },

        error: (error) => {

          const message =
            error?.error?.message ??
            'Erro ao obter resposta do servidor.';

          this.addAIMessage(message);

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

  renameConversation(id: string, title: string) {

    if (!title.trim()) return;

    this.conversations.update(list =>
      list.map(conv =>
        conv.id === id
          ? { ...conv, title }
          : conv
      )
    );

    this.api.renameConversation({
      conversationId: id,
      title
    }).subscribe({
      error: () => { }
    });

  }

  deleteConversation(id: string) {

    if (!id) return;

    this.api.removeConversation(id).subscribe({
      next: (response: any) => {

        const updated = this.conversations()
          .filter(conv => conv.id !== id);

        this.conversations.set(updated);

        if (updated.length > 0) {

          this.setActiveConversation(updated[0].id);

        }
        else {
          this.createLocalConversation();
        }

      },
      error: (err) => {

        // console.error('Erro ao deletar conversa', err);
        const updated = this.conversations()
          .filter(conv => conv.id !== id);

        this.conversations.set(updated);

        if (updated.length > 0) {

          this.setActiveConversation(updated[0].id);

        }
        else {
          this.createLocalConversation();
        }
      }
    });

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

  generateUUID(): string {

    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

  }


}
