import { Component, signal, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { DividerModule } from 'primeng/divider';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.html',
  styleUrls: ['./navigation.css'],
  imports: [
    RouterLink,
    RouterOutlet,
    ButtonModule,
    DrawerModule,
    RouterLinkActive,
    DividerModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
  ],
})
export class Navigation {
  sidebarVisible = signal(false);

  drawerRef = viewChild.required(Drawer);

  closeCallback(e: Event): void {
    this.drawerRef().close(e);
  }
}
