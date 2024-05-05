import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';

@Component({
  selector: 'angular-hub-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent],
  template: ` <app-navigation class="h-full"> </app-navigation> `,
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class AppComponent {}
