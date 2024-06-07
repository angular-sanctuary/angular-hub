import { afterNextRender, Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { filter, switchMap } from 'rxjs';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { PwaService } from './services/pwa.service';
import { DialogModule } from '@angular/cdk/dialog';

@Component({
  selector: 'angular-hub-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent, DialogModule],
  template: ` <app-navigation class="h-full"></app-navigation> `,
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class AppComponent {
  readonly #router = inject(Router);
  readonly #swUpdate = inject(SwUpdate);
  readonly #pwaService = inject(PwaService);

  constructor() {
    afterNextRender(() => {
      this.#pwaService.initPwaPrompt();
      this.#router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          switchMap(() => this.#swUpdate.versionUpdates),
          filter(
            (evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY',
          ),
        )
        .subscribe(() => {
          document.location.reload();
        });
    });
  }
}
