import { Component, HostListener, signal } from '@angular/core';
import { ChatHeader } from "../../features/chat/components/chat-header/chat-header";
import { RouterOutlet } from '@angular/router';
import { ChatCanvas } from "../../features/chat/components/chat-canvas/chat-canvas";
import { CommonModule } from '@angular/common';
import { ChatInput } from "../../features/chat/components/chat-input/chat-input";
import { ConversationDock } from "../../features/chat/components/conversation-dock/conversation-dock";
import { ContextPanel } from "../../features/chat/components/context-panel/context-panel";
import { CommandPalette } from "../../features/chat/components/command-palette/command-palette";
import { ChatStoreService } from '../../services/chat-store.service';

@Component({
  selector: 'app-main-layout',
  imports: [ChatHeader, CommonModule, ChatCanvas, ChatInput, ConversationDock, ContextPanel, CommandPalette],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {

  constructor(public chat: ChatStoreService) {

  }
}
