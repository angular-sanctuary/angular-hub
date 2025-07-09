import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PodcastCard } from '../components/cards/podcast-card';

import { JsonLdService } from '../services/json-ld.service';
import { Title } from '@angular/platform-browser';
import { Banner } from '../components/banner';
import { signal } from '@angular/core';
import { Podcast } from '../../models/podcast.model';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

export const routeMeta = {
  meta: [
    {
      name: 'description',
      content: 'Curated list of Angular Talks',
    },
  ],
};

@Component({
  imports: [PodcastCard, FormsModule],
  template: `
    <section class="max-w-screen-xl w-full mx-auto px-6 lg:px-0">
      <ul class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        @for (podcast of podcasts(); track podcast.name) {
          <li>
            <app-podcast-card [podcast]="podcast" />
          </li>
        }
      </ul>
    </section>
  `,
})
export default class PodcastsPage {
  // TODO /api/v1/podcasts
  podcasts = toSignal(inject(HttpClient).get<Podcast[]>('/api/v1/podcasts'), {
    initialValue: [],
  });

  constructor(
    private title: Title,
    private jsonldService: JsonLdService,
  ) {
    this.title.setTitle('Angular HUB - Podcasts');
    this.jsonldService.updateJsonLd(this.setJsonLd());
  }

  setJsonLd() {
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: this.podcasts().map((podcast, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'AudioObject',
          name: podcast.name,
          description: podcast.name,
          url: podcast.url,
        },
      })),
    };
  }
}
