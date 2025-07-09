import { Component, inject } from '@angular/core';
import { CommunityCard } from '../components/cards/community-card';
import { Title } from '@angular/platform-browser';
import { JsonLdService } from '../services/json-ld.service';
import { FormsModule } from '@angular/forms';
import { Community } from '../../models/community.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';

export const routeMeta = {
  meta: [
    {
      name: 'description',
      content: 'Curated list of Angular communities',
    },
  ],
};

@Component({
  imports: [CommunityCard, FormsModule],
  template: `
    <section class="max-w-screen-xl mx-auto">
      <input
        class="w-full p-2 rounded-lg border-2 border-gray-300"
        type="search"
        placeholder="Search communities"
      />
      <ul class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        @for (community of communities(); track community) {
          <li>
            <app-community-card
              class="h-full"
              [community]="community"
            ></app-community-card>
          </li>
        }
        <!--
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
      -->
      </ul>
    </section>
  `,
})
export default class CommunitiesPage {
  // TODO /api/v1/communities
  communities = toSignal(
    inject(HttpClient).get<Community[]>('/api/v1/communities'),
    {
      initialValue: [],
    },
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
