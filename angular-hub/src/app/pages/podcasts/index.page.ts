import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { PodcastCardComponent } from '../../components/cards/podcast-card.component';
import { injectLoad, RouteMeta } from '@analogjs/router';

import { load } from './index.server';
import { JsonLdService } from '../../services/json-ld.service';
import { Title } from '@angular/platform-browser';

export const routeMeta: RouteMeta = {
  meta: [
    {
      name: 'description',
      content: 'Curated list of Angular Talks',
    },
  ],
};

@Component({
  selector: 'app-podcasts',
  standalone: true,
  imports: [PodcastCardComponent, FormsModule],
  template: `
    <aside
      class="h-20 sm:h-36 flex flex-col justify-center items-center mb-4 m-6 rounded-2xl bg-no-repeat bg-auto md:bg-cover px-4"
      style="background-image: url(/assets/images/hero.webp);"
    >
      <h1 class="title text-5xl hidden sm:block">ANGULAR HUB</h1>
      <h2 class="text-2xl text-center">Curated list of Angular Podcasts</h2>
    </aside>

    <ul
      class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-center gap-x-8 gap-y-4 px-8"
    >
      @for (podcast of podcasts(); track podcast.name) {
        <li>
          <app-podcast-card [podcast]="podcast"></app-podcast-card>
        </li>
      }
    </ul>
  `,
})
export default class PodcastsComponent {
  podcasts = toSignal(injectLoad<typeof load>(), { requireSync: true });

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
