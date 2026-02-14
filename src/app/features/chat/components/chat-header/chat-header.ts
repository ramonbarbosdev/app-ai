import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chat-header',
  imports: [],
  templateUrl: './chat-header.html',
  styleUrl: './chat-header.scss',
})
export class ChatHeader {

    @Input()
  conversationTitle: string = '';

  @Output()
  commandPalette = new EventEmitter<void>();

  onCommandPalette() {
    this.commandPalette.emit();
  }
}
