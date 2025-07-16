import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  template: `
    <h2 class="title text-7xl mb-6 text-center" i18n="@@not-found-page.not-found">Page Not Found</h2>

    <a class="underline" routerLink="/" i18n="@@not-found-page.go-home">Go Back Home</a>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
      }
    `,
  ],
})
export default class NotFoundPage {}
