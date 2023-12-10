import { Component, inject, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CommunityCardComponent } from '../../components/cards/community-card.component';
import { RouterLink } from '@angular/router';
import { TalkCardComponent } from '../../components/cards/talk-card.component';
import { RouteMeta } from '@analogjs/router';
import { HeaderService } from '../../services/header.service';

export const routeMeta: RouteMeta = {
  title: 'ANGULAR HUB - Curated list of Angular Talks',
  meta: [
    {
      name: 'description',
      content: 'Curated list of Angular Talks',
    },
  ],
  data: {
    header: 'Talks',
  },
};

@Component({
  selector: 'app-talks',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CommunityCardComponent,
    RouterLink,
    TalkCardComponent,
  ],
  template: `
    <!-- <app-search-bar></app-search-bar> -->

    <p>Share your talks soon!</p>
  `,
})
export default class TalksComponent {
  #headerService = inject(HeaderService);
  @Input() set header(header: string) {
    this.#headerService.setHeaderTitle(header);
  }
}
