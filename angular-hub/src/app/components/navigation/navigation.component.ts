import { Component, inject, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { DividerModule } from 'primeng/divider';
import { PwaService } from '../../services/pwa.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SupabaseService } from '../../services/supabase.service';

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
    AsyncPipe,
  ],
})
export class NavigationComponent {
  readonly #pwaService = inject(PwaService);
  readonly supabaseService = inject(SupabaseService);

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
