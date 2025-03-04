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
import { CheckboxModule } from 'primeng/checkbox';

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
    CheckboxModule,
  ],
  template: `
    <app-banner description="Curated list of Angular Communities" />
    <section class="flex flex-col md:flex-row gap-6 px-6 mt-6">
      <form class="flex justify-center mt-2">
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

      <ul class="flex flex-col justify-center gap-4">
        @for (community of communitiesWithUpcomingEvents(); track community) {
          <li>
            <app-community-card [community]="community"></app-community-card>
          </li>
        }
        @for (community of activeCommunities(); track community) {
          <li>
            <app-community-card [community]="community"></app-community-card>
          </li>
        }
        @for (community of inactiveCommunities(); track community) {
          <li>
            <app-community-card [community]="community"></app-community-card>
          </li>
        }
      </ul>
    </section>
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

  communitiesWithUpcomingEvents = computed(() =>
    this.filteredCommunities().filter((community) =>
      community.events?.some((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getTime() > new Date().getTime();
      }),
    ),
  );

  activeCommunities = computed(() => {
    return this.filteredCommunities()
      .filter((community) => {
        const inactivityLimit = new Date();
        inactivityLimit.setMonth(inactivityLimit.getMonth() - 6);

        const newestEvent = community.events?.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        )[0];

        return newestEvent
          ? new Date(newestEvent.date).getTime() > inactivityLimit.getTime() &&
              community.type === 'meetup'
          : true;
      })
      .filter((community) => {
        return (
          !community.events?.some((event) => {
            const eventDate = new Date(event.date);
            return eventDate.getTime() > new Date().getTime();
          }) || community.type !== 'meetup'
        );
      });
  });

  inactiveCommunities = computed(() =>
    this.filteredCommunities()
      .filter((community) => community.events && community.events.length > 0)
      .filter((community) => {
        const inactivityLimit = new Date();
        inactivityLimit.setMonth(inactivityLimit.getMonth() - 6);

        const newestEvent = community.events.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        )[0];

        return (
          new Date(newestEvent.date).getTime() < inactivityLimit.getTime() &&
          community.type === 'meetup'
        );
      })
      .sort((a, b) => {
        const newestEventA = a.events.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        )[0];
        const newestEventB = b.events.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        )[0];

        return (
          new Date(newestEventB.date).getTime() -
          new Date(newestEventA.date).getTime()
        );
      }),
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
          url: community.websiteUrl,
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
