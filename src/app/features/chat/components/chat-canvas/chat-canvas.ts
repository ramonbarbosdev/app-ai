import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chat-canvas',
  imports: [CommonModule],
  templateUrl: './chat-canvas.html',
  styleUrl: './chat-canvas.scss',
   host: {
    class: 'flex-1 min-h-0 flex flex-col'
  }
})
export class ChatCanvas {

  
  @Input()
  conversation: any;

  @Input()
  isTyping: boolean = false;

  @ViewChild('scrollContainer')
  private scrollContainer!: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom() {

    if (!this.scrollContainer) return;

    this.scrollContainer.nativeElement.scrollTop =
      this.scrollContainer.nativeElement.scrollHeight;

  }

}
