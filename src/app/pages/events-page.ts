import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { EmptySearchMessage, NoEventsMessage } from '../components/message';
import { JsonLdService } from '../services/json-ld.service';
import { HttpClient } from '@angular/common/http';
import { EventCard } from '../components/cards/event-card';
import { CommunityEvent } from '../../models/community-event.model';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

export const routeMeta = {
  meta: [
    {
      name: 'description',
      content: $localize`:@@events-page.meta-description:Curated list of Angular Events`,
    },
    {
      property: 'og:title',
      content: $localize`:@@events-page.og-title:Curated list of Angular Events`,
    },
    {
      property: 'og:image',
      content: '/api/v1/og-image',
    },
    {
      name: 'twitter:image',
      content: '/api/v1/og-image',
    },
  ],
};

@Component({
  template: `
    <section class="max-w-screen-xl w-full mx-auto px-6">
      <input
        class="w-full p-2 rounded-lg border-2 border-gray-300 dark:border-gray-700"
        type="search"
        placeholder="Search events"
        [(ngModel)]="search"
      />
      <ul class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
        @for (event of filteredEvents(); track event) {
          <li>
            <app-event-card [event]="event" />
          </li>
        }
      </ul>

      <!-- Show message when search has no results -->
      @if (search().length && !filteredEvents().length && events().length > 0) {
        <app-empty-search-message
          i18n-title="@@events-page.empty-search-message-title"
          title="No events found"
          i18n-description="@@events-page.empty-search-message-description"
          description="We could not find any events matching your search criteria. Try different keywords or browse all available events."
        />
      }

      <!-- Show message when there are no events at all -->
      @if (!events().length) {
        <app-no-events-message
          i18n-title="@@events-page.empty-events-message-title"
          title="No upcoming events"
          i18n-description="@@events-page.empty-events-message-description"
          description="There are currently no upcoming Angular events scheduled. New events are added regularly, so please check back soon!"
        />
      }
    </section>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: stretch;
      }
    `,
  ],
  imports: [
    ButtonModule,
    MessageModule,
    EventCard,
    EmptySearchMessage,
    NoEventsMessage,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EventsPage {
  search = signal('');

  events = toSignal(
    inject(HttpClient).get<CommunityEvent[]>(`/api/v1/events/upcoming`),
    {
      initialValue: [],
    },
  );

  filteredEvents = computed(() => {
    return this.events().filter(
      (event) =>
        event.name?.toLowerCase().includes(this.search().toLowerCase()) ||
        event.location?.toLowerCase().includes(this.search().toLowerCase()) ||
        event.organizer?.name
          ?.toLowerCase()
          .includes(this.search().toLowerCase()),
    );
  });

  constructor(
    private title: Title,
    private jsonldService: JsonLdService,
  ) {
    this.title.setTitle('Angular HUB - Events');
    this.jsonldService.updateJsonLd(this.setJsonLd());
  }

  private setJsonLd() {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: 'https://angular-hub.com/',
      name: 'Angular Hub',
      description: $localize`:@@events-page.json-ld.description:Curated list of Angular Communities, Events, Podcasts, and Call for Papers.`,
      audience: {
        '@type': 'Audience',
        audienceType: 'Developers',
        description: $localize`:@@events-page.json-ld.audience-description:Developers interested in Angular and related technologies.`,
      },
      author: {
        '@type': 'Person',
        name: 'Gerome Grignon',
        url: 'https://www.gerome.dev/',
        sameAs: [
          'https://x.com/GeromeDEV',
          'https://www.linkedin.com/in/gerome-grignon/',
          'https://github.com/geromegrignon',
        ],
      },
      mainEntity: [
        {
          '@type': 'ItemList',
          name: $localize`:@@events-page.json-ld.main-entity.name:Angular Events`,
          itemListElement: this.filteredEvents()?.map((event, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Event',
              name: event.name,
              url: event.url,
              audience: {
                '@type': 'Audience',
                audienceType: 'Developers',
                description:
                  $localize`:@@events-page.json-ld.main-entity.item.description:Developers interested in Angular and related technologies.`,
              },
              startDate: event.date,
              ...(event.location
                ? {
                    location: {
                      '@type': 'Place',
                      name: event.location,
                    },
                  }
                : {}),
              ...(event.isRemote
                ? {
                    location: {
                      '@type': 'VirtualLocation',
                      name: $localize`:@@events-page.json-ld.main-entity.item.online:Online`,
                    },
                  }
                : {}),
              ...(event.language
                ? {
                    inLanguage: {
                      '@type': 'Language',
                      name: event.language,
                    },
                  }
                : {}),
            },
          })),
        },
      ],
    };
  }
}
