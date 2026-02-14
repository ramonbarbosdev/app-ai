import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface ChatResponse {
  reply: string;
}

interface ChatRequest {
  conversationId: string;
  message: string;
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

    const body: ChatRequest = {
      conversationId,
      message
    };

    const res = await firstValueFrom(
      this.http.post<ChatResponse>(this.API, body)
    );

    return res.reply;

  }

}
  