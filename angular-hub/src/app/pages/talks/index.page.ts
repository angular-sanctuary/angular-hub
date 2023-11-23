import { Component } from '@angular/core';
import { NgForOf, NgOptimizedImage } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { CommunityCardComponent } from '../../components/community-card.component';
import { RouterLink } from '@angular/router';
import { TalkCardComponent } from '../../components/talk-card.component';

@Component({
  selector: 'app-talks',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    CommunityCardComponent,
    RouterLink,
    TalkCardComponent,
  ],
  template: `
    <h1 class="text-3xl text-start sm:text-5xl font-bold mt-2 mb-6">Talks</h1>

    <!-- <app-search></app-search> -->

    <p>Share your talks soon!</p>
  `,
})
export default class TalksComponent {
  constructor(private readonly title: Title, private readonly meta: Meta) {
    title.setTitle('ANGULAR HUB - Curated list of Angular Talks');
    meta.updateTag({
      name: 'description',
      content: 'Curated list of Angular Talks',
    });
  }
}
