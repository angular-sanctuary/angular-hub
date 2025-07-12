import { Component, computed, inject, signal } from '@angular/core';
import { CommunityCard } from '../components/cards/community-card';
import { Title } from '@angular/platform-browser';
import { JsonLdService } from '../services/json-ld.service';
import { FormsModule } from '@angular/forms';
import { Community } from '../../models/community.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { EmptySearchCommunitiesMessage } from '../components/message';

export const routeMeta = {
  meta: [
    {
      name: 'description',
      content: $localize`Curated list of Angular communities`,
    },
  ],
};

@Component({
  imports: [CommunityCard, FormsModule, EmptySearchCommunitiesMessage],
  template: `
    <section class="max-w-screen-xl mx-auto px-6">
      <input
        class="w-full p-2 rounded-lg border-2 border-gray-300 dark:border-gray-700"
        type="search"
        placeholder="Search communities"
        [(ngModel)]="search"
      />
      @if (filteredCommunities().length) {
        <ul class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
          @for (community of filteredCommunities(); track community) {
            <li>
              <app-community-card class="h-full" [community]="community" />
            </li>
          }
        </ul>
      }

      <!-- Show message when search has no results -->
      @if (
        search().length &&
        !filteredCommunities().length &&
        communities().length > 0
      ) {
        <app-empty-search-communities-message
          [title]="'No communities found'"
          [description]="
            'We could not find any communities matching your search criteria. Try different keywords or browse all available communities.'
          "
        />
      }
    </section>
  `,
})
export default class CommunitiesPage {
  search = signal('');

  communities = toSignal(
    inject(HttpClient).get<Community[]>('/api/v1/communities'),
    {
      initialValue: [],
    },
  );

  filteredCommunities = computed(() =>
    this.communities().filter(
      (community) =>
        community.name?.toLowerCase().includes(this.search().toLowerCase()) ||
        community.location
          ?.toLowerCase()
          .includes(this.search().toLowerCase()) ||
        community.type?.toLowerCase().includes(this.search().toLowerCase()),
    ),
  );

  /*

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

  */

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
