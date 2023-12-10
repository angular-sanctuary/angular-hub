import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'angular-hub-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent],
  template: ` <app-navigation class="h-full"> </app-navigation> `,
  styles: [
    `
      :host {
        width: 100%;
        text-align: center;
      }
    `,
  ],
})
export class AppComponent {
  icons = ['menu', 'settings', 'search', 'cancel', 'light', 'dark', 'close'];

  constructor(
    private readonly iconRegistry: MatIconRegistry,
    private readonly sanitizer: DomSanitizer,
  ) {
    this.icons.forEach((icon) => {
      this.iconRegistry.addSvgIcon(
        icon,
        this.sanitizer.bypassSecurityTrustResourceUrl(
          `assets/icons/${icon}.svg`,
        ),
      );
    });
  }
}
