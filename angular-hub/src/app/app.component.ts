import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, switchMap } from 'rxjs';

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
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class AppComponent {
  icons = ['menu', 'settings', 'search', 'cancel', 'light', 'dark', 'close'];

  constructor(
    private readonly iconRegistry: MatIconRegistry,
    private readonly sanitizer: DomSanitizer,
    private readonly swUpdate: SwUpdate,
    private readonly router: Router
  ) {
    this.icons.forEach((icon) => {
      this.iconRegistry.addSvgIcon(
        icon,
        this.sanitizer.bypassSecurityTrustResourceUrl(
          `assets/icons/${icon}.svg`
        )
      );
    });

    router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        switchMap(() => this.swUpdate.versionUpdates),
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')
      )
      .subscribe(() => {
        document.location.reload();
      });
  }
}
