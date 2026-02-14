import { Component, ViewChild } from '@angular/core';
import { SimpleChat } from '../simple-chat/simple-chat';
import { ConversationSidebar } from "../conversation-sidebar/conversation-sidebar";

@Component({
  selector: 'app-chat-page',
  imports: [SimpleChat, ConversationSidebar],
  templateUrl: './chat-page.html',
  styleUrl: './chat-page.scss',
})
export class ChatPage {


  
  @ViewChild(SimpleChat)
  chat!: SimpleChat;

  selectConversation(id: string) {

    this.chat.setConversation(id);

  }

}
