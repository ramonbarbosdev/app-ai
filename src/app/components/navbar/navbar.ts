import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-navbar',
  imports: [MenubarModule,ButtonModule, AvatarModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {


  
  items: any[] = [];

  constructor() {
    this.items = [
      {
        label: 'Simple chat',
        icon: 'pi pi-home',
        command: () => this.scroll('home')
      },
    
    ];
  }

  toggleTheme() {
    // this.themeService.toggle();
  }

  scroll(id: string) {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth'
    });
  }
}
