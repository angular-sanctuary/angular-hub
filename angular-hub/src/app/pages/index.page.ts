import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="flex justify-center">
        <img alt="Angular Hub Logo" class="logo" src="/assets/images/logo.webp" />
    </div>

    <h2 class="title text-6xl">ANGULAR HUB</h2>

    <h3 class="text-2xl mt-2">Curated list of Angular events and communities</h3>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .logo {
        will-change: filter;
      }
      .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
      }
      .title {
        font-family: 'Pixelify', 'sans-serif';
        background-image: linear-gradient(to right, #bf25b9, #836ae9, #1690fa, #00aaf3, #00bee0);
        width: fit-content;
        background-size: 100%;
        background-repeat: repeat;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    `,
  ],
})
export default class HomeComponent {
}
