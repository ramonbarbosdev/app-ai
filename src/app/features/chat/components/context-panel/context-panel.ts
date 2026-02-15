import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Button } from "primeng/button";
import { ChatStoreService } from '../../../../services/chat-store.service';

@Component({
  selector: 'app-context-panel',
  imports: [CommonModule, Button],
  templateUrl: './context-panel.html',
  styleUrl: './context-panel.scss',
})
export class ContextPanel {

  private chat = inject(ChatStoreService);

  @Input()
  conversation: any;

  @Input()
  isOpen: boolean = true;

  @Output()
  close = new EventEmitter<void>();

  ngOnInit() {

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (isMobile) {
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }

  }


  onDelete() {
    if (this.conversation) {
      this.chat.deleteConversation(this.conversation.id);
    }

  }


}
