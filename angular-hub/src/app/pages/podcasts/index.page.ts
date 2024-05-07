import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { PodcastCardComponent } from '../../components/cards/podcast-card.component';
import { injectLoad, RouteMeta } from '@analogjs/router';
import { HeaderService } from '../../services/header.service';

import { load } from './index.server';
import { JsonLdService } from '../../services/json-ld.service';

export const routeMeta: RouteMeta = {
  meta: [
    {
      name: 'description',
      content: 'Curated list of Angular Talks',
    },
  ],
  data: {
    header: 'Podcasts',
  },
};

@Component({
  selector: 'app-podcasts',
  standalone: true,
  imports: [PodcastCardComponent, FormsModule],
  template: `
    <aside
      class="h-36 w-full flex flex-col justify-center items-center mb-8 bg-no-repeat bg-auto md:bg-cover px-4"
      style="background-image: url(/assets/images/img.png);"
    >
      <h1 class="title text-5xl shadow-2xl">ANGULAR HUB</h1>
      <h2 class="text-2xl text-center">Curated list of Angular Podcasts</h2>
    </aside>

    <ul class="flex flex-wrap justify-center gap-x-8 gap-y-4 px-8">
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

  @Input() set header(header: string) {
    this.headerService.setHeaderTitle(header);
    this.jsonldService.updateJsonLd(this.setJsonLd());
  }

  constructor(
    private headerService: HeaderService,
    private jsonldService: JsonLdService,
  ) {}

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
