import { Component, inject, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { DividerModule } from 'primeng/divider';
import { PwaService } from '../../services/pwa.service';
import { NgClass } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    ButtonModule,
    SidebarModule,
    RouterLinkActive,
    DividerModule,
    NgClass,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
  ],
})
export class NavigationComponent {
  readonly #pwaService = inject(PwaService);

  sidebarVisible = false;
  isInstallButtonVisible = this.#pwaService.isInstallButtonVisible;

  sidebarRef = viewChild.required(Sidebar);

  installPwa(): void {
    void this.#pwaService.installPwa();
  }

  closeCallback(e: Event): void {
    this.sidebarRef().close(e);
  }
}
