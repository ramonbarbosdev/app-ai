import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ConversationDTO {

  id: string;
  title: string;

}

export interface ChatMessageRequest {

  conversationId: string;
  message: string;

}

export interface ChatHistoryMessage {

  role: string;
  content: string;

}

@Injectable({
  providedIn: 'root'
})
export class ChatApiService {

  private http = inject(HttpClient);

   private readonly apiUrl = `${environment.apiUrl}`;

  private baseUrl = `${this.apiUrl}/chat`;

  // GET conversations
  getConversations(): Observable<ConversationDTO[]> {

    return this.http.get<ConversationDTO[]>(
      `${this.baseUrl}/conversations`
    );

  }

  // GET history
  getHistory(conversationId: string): Observable<ChatHistoryMessage[]> {

    return this.http.get<ChatHistoryMessage[]>(
      `${this.baseUrl}/history/${conversationId}`
    );

  }

  // POST send message
  sendMessage(data: ChatMessageRequest): Observable<any> {

    return this.http.post(
      `${this.baseUrl}/send`,
      data
    );

  }

  renameConversation(data: {
    conversationId: string;
    title: string;
  }) {

    return this.http.post(
        `${this.baseUrl}/rename`,
      data
    );

  }

  removeConversation(id: string){
       return this.http.delete(
        `${this.baseUrl}/${id}`,
    );
  }


}
