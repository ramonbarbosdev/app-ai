import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Navbar } from "./components/navbar/navbar";
import { SimpleChat } from "./components/simple-chat/simple-chat";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, Navbar, SimpleChat],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('app-ai');
}
