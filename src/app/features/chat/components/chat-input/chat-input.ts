import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  imports: [],
  templateUrl: './chat-input.html',
  styleUrl: './chat-input.scss',
    host: {
    class: 'shrink-0'
  }
})
export class ChatInput {


  @Output()
  send = new EventEmitter<string>();

  @Input()
  isTyping: boolean = false;

  text = signal('');

  handleSend() {

    const value = this.text().trim();

    if (!value || this.isTyping) return;

    this.send.emit(value);

    this.text.set('');

  }

  handleKeyDown(event: KeyboardEvent) {

    if (event.key === 'Enter' && !event.shiftKey) {

      event.preventDefault();

      this.handleSend();

    }

  }
}
