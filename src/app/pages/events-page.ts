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
import { Message } from '../components/message';
import { JsonLdService } from '../services/json-ld.service';
import { HttpClient, httpResource } from '@angular/common/http';
import { EventCard } from '../components/cards/event-card';
import { CommunityEvent } from '../../models/community-event.model';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

export const routeMeta = {
  meta: [
    {
      name: 'description',
      content: 'Curated list of Angular Events',
    },
    {
      property: 'og:title',
      content: 'Curated list of Angular Events',
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
    <section class="max-w-screen-xl w-full mx-auto">
      <input
        class="w-full p-2 rounded-lg border-2 border-gray-300"
        type="search"
        placeholder="Search events"
        [(ngModel)]="search"
      />
      <ul class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        @for (event of filteredEvents(); track event) {
          <li>
            <app-event-card [event]="event" />
          </li>
        }
      </ul>

      <!-- TODO create custom message UI -->
      @if (search().length && !filteredEvents()?.length) {
        <app-message
          [title]="
            'No event found with these criteria, update or reset the filters'
          "
          severity="warn"
        />
      }

      <!-- TODO create custom message UI -->
      @if (!filteredEvents()?.length) {
        <app-message
          [title]="'No upcoming event tracked, see you later!'"
          severity="warn"
        />
      }

      @if (filteredEvents()?.length) {
        <p class="text-sm text-gray-500 mt-4 ml-4">
          * Prices are updated manually, check the event website for the most
          accurate information.
        </p>
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
  imports: [ButtonModule, MessageModule, EventCard, Message, FormsModule],
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
    return this.events().filter((event) =>
      event.name?.toLowerCase().includes(this.search().toLowerCase()),
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
      description:
        'Curated list of Angular Communities, Events, Podcasts, and Call for Papers.',
      audience: {
        '@type': 'Audience',
        audienceType: 'Developers',
        description:
          'Developers interested in Angular and related technologies.',
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
          name: 'Angular Events',
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
                  'Developers interested in Angular and related technologies.',
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
                      name: 'Online',
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
