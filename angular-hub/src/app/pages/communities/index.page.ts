import { Component } from '@angular/core';
import { CommunityCardComponent } from '../../components/cards/community-card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { injectLoad, RouteMeta } from '@analogjs/router';
import { load } from './index.server';
import { Title } from '@angular/platform-browser';
import { JsonLdService } from '../../services/json-ld.service';

export const routeMeta: RouteMeta = {
  meta: [
    {
      name: 'description',
      content: 'Curated list of Angular communities',
    },
  ],
};

@Component({
  selector: 'app-communities',
  standalone: true,
  imports: [CommunityCardComponent],
  template: `
    <aside
      class="h-36 w-full flex flex-col justify-center items-center mb-8 bg-no-repeat bg-auto md:bg-cover px-4"
      style="background-image: url(/assets/images/hero.webp);"
    >
      <h1 class="title text-4xl sm:text-5xl">ANGULAR HUB</h1>
      <h2 class="text-2xl text-center">Curated list of Angular Communities</h2>
    </aside>

    <ul class="flex flex-wrap justify-center gap-x-8 gap-y-4 px-8">
      @for (community of communities(); track community.name) {
        <li>
          <app-community-card [community]="community"></app-community-card>
        </li>
      }
    </ul>
  `,
})
export default class CommunitiesComponent {
  communities = toSignal(injectLoad<typeof load>(), { requireSync: true });

  constructor(
    private title: Title,
    private jsonldService: JsonLdService,
  ) {
    this.title.setTitle('Angular HUB - Communities');
    this.jsonldService.updateJsonLd(this.setJsonLd());
  }

  setJsonLd() {
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: this.communities().map((community, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Organization',
          name: community.name,
          url: community.url,
          ...(community.location
            ? {
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: community.location,
                },
              }
            : {}),
          knowsAbout: 'Angular',
        },
      })),
    };
  }
}
