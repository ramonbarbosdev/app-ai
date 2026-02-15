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

  // STATE

  conversations = signal<Conversation[]>([]);

  activeConversationId = signal<string | null>(null);

  isTyping = signal(false);

  contextOpen = signal(true);

  paletteOpen = signal(false);

  // DERIVED STATE

  activeConversation = computed(() =>

    this.conversations().find(
      c => c.id === this.activeConversationId()
    )

  );

  // LOAD ALL CONVERSATIONS FROM BACKEND

  loadConversations() {

    this.api.getConversations()
      .subscribe(conversations => {

        const mapped: Conversation[] = conversations.map(c => ({
          id: c.id,
          title: c.title,
          messages: []
        }));

        this.conversations.set(mapped);

        if (mapped.length > 0) {

          this.setActiveConversation(mapped[0].id);

        }

      });

  }

  // LOAD HISTORY

  loadHistory(conversationId: string) {

    this.api.getHistory(conversationId)
      .subscribe(history => {

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

      });

  }

  // SELECT CONVERSATION

  setActiveConversation(id: string) {

    this.activeConversationId.set(id);

    this.loadHistory(id);

  }

  // CREATE NEW CONVERSATION (frontend only, backend will persist on first message)

  createConversation() {

    const id = crypto.randomUUID();

    const newConv: Conversation = {

      id,

      title: 'Nova conversa',

      messages: []

    };

    this.conversations.update(list => [...list, newConv]);

    this.activeConversationId.set(id);

  }

  // SEND MESSAGE TO BACKEND

  sendMessage(content: string) {

    const id = this.activeConversationId();

    if (!id) return;

    // add user message instantly (optimistic UI)

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

    // send to backend

    this.api.sendMessage({
      conversationId: id,
      message: content
    })
      .subscribe((response: any) => {

        const aiText =
          response?.output?.text ??
          response?.result?.output?.text ??
          'Sem resposta';

        this.addAIMessage(aiText);

        this.isTyping.set(false);

      });

  }

  // ADD AI MESSAGE

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

  // RENAME CONVERSATION


  renameConversation(id: string, title: string) {

    this.api.renameConversation({
      conversationId: id,
      title
    }).subscribe();

    this.conversations.update(list =>
      list.map(conv =>
        conv.id === id
          ? { ...conv, title }
          : conv
      )
    );

  }

  // UI STATE

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

}
