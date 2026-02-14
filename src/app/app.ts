import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Navbar } from "./components/navbar/navbar";
import { SimpleChat } from "./components/simple-chat/simple-chat";
import { ChatPage } from "./components/chat-page/chat-page";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, Navbar, ChatPage],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('app-ai');
}
