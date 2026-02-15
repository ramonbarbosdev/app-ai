import { Injectable, signal, computed } from '@angular/core';

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

  // STATE

  conversations = signal<Conversation[]>([
    {
      id: crypto.randomUUID(),
      title: 'Nova conversa',
      messages: [
        {
          role: 'assistant',
          content: 'Olá. Como posso ajudar você hoje?'
        }
      ]
    }
  ]);

  activeConversationId = signal<string>(
    this.conversations()[0].id
  );

  isTyping = signal(false);

  contextOpen = signal(true);

  paletteOpen = signal(false);

  // DERIVED STATE

  activeConversation = computed(() =>

    this.conversations().find(
      c => c.id === this.activeConversationId()
    )

  );

  // ACTIONS

  setActiveConversation(id: string) {

    this.activeConversationId.set(id);

  }

  createConversation() {

    const newConv: Conversation = {

      id: crypto.randomUUID(),

      title: 'Nova conversa',

      messages: [
        {
          role: 'assistant',
          content: 'Nova conversa criada.'
        }
      ]

    };

    this.conversations.update(list => [...list, newConv]);

    this.activeConversationId.set(newConv.id);

  }

  sendMessage(content: string) {

    const id = this.activeConversationId();

    this.isTyping.set(true);

    this.conversations.update(list =>
      list.map(conv => {

        if (conv.id !== id) return conv;

        return {

          ...conv,

          messages: [
            ...conv.messages,
            {
              role: 'user',
              content
            }
          ]

        };

      })
    );

    // simulate AI response
    setTimeout(() => {

      this.addAIMessage("Resposta simulada da IA.");

      this.isTyping.set(false);

    }, 1400);

  }

  addAIMessage(content: string) {

    const id = this.activeConversationId();

    this.conversations.update(list =>
      list.map(conv => {

        if (conv.id !== id) return conv;

        return {

          ...conv,

          messages: [
            ...conv.messages,
            {
              role: 'assistant',
              content
            }
          ]

        };

      })
    );

  }

  renameConversation(id: string, title: string) {

    this.conversations.update(list =>
      list.map(conv =>
        conv.id === id
          ? { ...conv, title }
          : conv
      )
    );

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

  togglePalette() {

  this.paletteOpen.update(v => !v);

}

}
