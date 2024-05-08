import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { DividerModule } from 'primeng/divider';
import { PwaService } from '../../services/pwa.service';

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
  ],
})
export class NavigationComponent {
  readonly #pwaService = inject(PwaService);
  sidebarVisible = false;
  isInstallButtonVisible = this.#pwaService.isInstallButtonVisible;

  installPwa(): void {
    void this.#pwaService.installPwa();
  }
}
