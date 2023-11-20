import {ChangeDetectionStrategy, Component} from "@angular/core";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage
  ],
  template: `
    <header class="flex flex-col items-center">
      <nav aria-label="Main Navigation">
        <ul class="flex items-center gap-3">
          <li class="flex"><a class="border-2 border-transparent inline-block" routerLink="/" [routerLinkActiveOptions]="{exact: true}" title="Home Page">
            <img ngSrc="/assets/images/logo.webp" height="25" width="25" alt="">
          </a></li>
          <li ><a class="border-2 border-transparent hover:underline" routerLink="/events" routerLinkActive="active" [queryParams]="{state: 'upcoming'}">Agenda</a></li>
          <li ><a class="border-2 border-transparent hover:underline" routerLink="/cfp" routerLinkActive="active" [queryParams]="{state: 'all'}">CFP</a></li>
          <li ><a class="border-2 border-transparent hover:underline" routerLink="/communities" routerLinkActive="active" [queryParams]="{state: 'all'}">Communities</a></li>
          <li ><a class="border-2 border-transparent hover:underline" routerLink="/talks" routerLinkActive="active">Talks</a></li>
        </ul>
      </nav>
    </header>
  `,
  styles: `
    .title {
        font-family: 'Pixelify', 'sans-serif';
        background-image: linear-gradient(to right, #bf25b9, #836ae9, #1690fa, #00aaf3, #00bee0);
        width: fit-content;
        background-size: 100%;
        background-repeat: repeat;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    .active {
      color: #BF25B9;
      text-decoration: underline;
    }
  `
})
export class HeaderComponent {
}
