import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface ChatHistory {
  content: string;
  type: 'USER' | 'ASSISTANT';
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private http = inject(HttpClient);

  private readonly API = 'http://localhost:8080/api/chat';

  async sendMessage(
    conversationId: string,
    message: string
  ): Promise<string> {

    const res = await firstValueFrom(
      this.http.post<{ reply: string }>(
        this.API,
        {
          conversationId,
          message
        }
      )
    );

    return res.reply;
  }

  getHistory(conversationId: string) {

    return this.http.get<ChatHistory[]>(
      `${this.API}/history/${conversationId}`
    );

  }

  getConversations() {

    return this.http.get<string[]>(
      `${this.API}/conversations`
    );

  }

}
