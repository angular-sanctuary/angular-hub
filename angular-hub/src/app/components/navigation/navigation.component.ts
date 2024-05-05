import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { DividerModule } from 'primeng/divider';

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
  sidebarVisible = false;
}
