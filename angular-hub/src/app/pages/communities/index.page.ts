import { Component, computed, signal } from '@angular/core';
import { CommunityCardComponent } from '../../components/cards/community-card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { injectLoad, RouteMeta } from '@analogjs/router';
import { load } from './index.server';
import { Title } from '@angular/platform-browser';
import { JsonLdService } from '../../services/json-ld.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { BannerComponent } from '../../components/banner.component';

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
  imports: [
    CommunityCardComponent,
    DropdownModule,
    FormsModule,
    BannerComponent,
  ],
  template: `
    <app-banner description="Curated list of Angular Communities" />
    <form
      class="w-full flex flex-col sm:flex-row justify-center items-center gap-2 mb-8"
    >
      <p-dropdown
        ariaLabel="Select a country"
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
      @for (community of filteredCommunities(); track community) {
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
