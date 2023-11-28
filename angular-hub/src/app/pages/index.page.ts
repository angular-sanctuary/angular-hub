import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="flex justify-center">
      <img
        alt="Angular Hub Logo"
        class="logo"
        ngSrc="/assets/images/logo.webp"
        height="500"
        width="500"
        priority
      />
    </div>

    <h2 class="title text-6xl">ANGULAR HUB</h2>

    <h3 class="text-2xl mt-2 mb-6">
      Curated list of Angular events and communities
    </h3>

    <a
      class="text-xl font-bold bg-primary px-6 py-2 rounded-lg"
      routerLink="/events"
      [queryParams]="{ state: 'upcoming' }"
      >Discover upcoming events</a
    >
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
    `,
  ],
  imports: [RouterLink, NgOptimizedImage],
})
export default class HomeComponent {}
