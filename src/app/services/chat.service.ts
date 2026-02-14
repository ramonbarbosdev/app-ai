import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private readonly API = 'http://localhost:8080/api/chat';

  private http = inject(HttpClient);

  async sendMessage(message: string): Promise<string> {

    const res = await firstValueFrom(
      this.http.post<{ reply: string }>(this.API, { message })
    );

    return res.reply;

  }


}
