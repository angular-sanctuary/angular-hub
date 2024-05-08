import { Component, computed, signal } from '@angular/core';
import { CommunityCardComponent } from '../../components/cards/community-card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { injectLoad, RouteMeta } from '@analogjs/router';
import { load } from './index.server';
import { Title } from '@angular/platform-browser';
import { JsonLdService } from '../../services/json-ld.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

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
  imports: [CommunityCardComponent, DropdownModule, FormsModule],
  template: `
    <aside
      class="h-36 w-full flex flex-col justify-center items-center mb-8 bg-no-repeat bg-auto md:bg-cover px-4"
      style="background-image: url(/assets/images/hero.webp);"
    >
      <h1 class="title text-4xl sm:text-5xl">ANGULAR HUB</h1>
      <h2 class="text-2xl text-center">Curated list of Angular Communities</h2>
    </aside>

    <form
      class="w-full flex flex-col sm:flex-row justify-center items-center gap-2 mb-8"
    >
      <p-dropdown
        name="language"
        [options]="countries()"
        [style]="{ width: '230px' }"
        [showClear]="true"
        placeholder="Select a country"
        [ngModel]="selectedCountry()"
        (ngModelChange)="selectedCountry.set($event)"
      />
    </form>

    <ul class="flex flex-wrap justify-center gap-x-8 gap-y-4 px-8">
      @for (community of filteredCommunities(); track community.name) {
        <li>
          <app-community-card [community]="community"></app-community-card>
        </li>
      }
    </ul>
  `,
})
export default class CommunitiesComponent {
  communities = toSignal(injectLoad<typeof load>(), { requireSync: true });
  selectedCountry = signal(null);
  countries = computed(() =>
    this.communities()
      .map((community) => community.location)
      .reduce<string[]>((acc, curr) => {
        const location = curr
          ? curr.includes(',')
            ? curr.split(',').at(-1)
            : curr
          : '';
        if (location && !acc.includes(location.trim())) {
          acc.push(location.trim());
        }
        return acc;
      }, [])
      .sort((a, b) =>
        a.toLocaleUpperCase().localeCompare(b.toLocaleUpperCase()),
      ),
  );

  filteredCommunities = computed(() =>
    this.communities().filter((community) =>
      this.selectedCountry()
        ? community.location?.includes(this.selectedCountry() ?? '')
        : true,
    ),
  );

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
