import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./components/header.component";
import {FooterComponent} from "./components/footer.component";

@Component({
  selector: 'angular-hub-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <main class="flex-1">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: [
    `
      :host {
        width: 600px;
        max-width: 1280px;
        margin: 0 auto;
        padding: 1.5rem;
        text-align: center;
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class AppComponent {}
