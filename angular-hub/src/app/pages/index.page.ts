import { Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { injectLoad, RouteMeta } from '@analogjs/router';
import { load } from './index.server';
import { EventCardComponent } from '../components/cards/event-card.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { isSameDay } from 'date-fns';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { Title } from '@angular/platform-browser';
import { JsonLdService } from '../services/json-ld.service';

export const routeMeta: RouteMeta = {
  meta: [
    {
      name: 'description',
      content: 'Curated list of Angular Events',
    },
  ],
};

@Component({
  selector: 'app-events',
  standalone: true,
  template: `
    <aside
      class="h-36 w-full flex flex-col justify-center items-center mb-4 md:mb-8 bg-no-repeat bg-auto md:bg-cover px-4"
      style="background-image: url(/assets/images/hero.webp);"
    >
      <h1 class="title text-4xl sm:text-5xl">ANGULAR HUB</h1>
      <h2 class="text-2xl text-center">
        Curated list of Angular Communities and Events
      </h2>
    </aside>
    <form
      class="w-full flex flex-col sm:flex-row justify-center items-center gap-2 mb-8"
    >
      <p-calendar
        ariaLabel="Select a date"
        name="date"
        [style]="{ width: '230px' }"
        [ngModel]="date()"
        (ngModelChange)="date.set($event)"
        placeholder="Select a date"
        [showClear]="true"
      />
      <p-dropdown
        ariaLabel="Select a language"
        name="language"
        [style]="{ width: '230px' }"
        [options]="languages()"
        [showClear]="true"
        [ngModel]="selectedLanguage()"
        (ngModelChange)="selectedLanguage.set($event)"
        placeholder="Select a language"
      />
      <div class="flex items-center gap-2">
        <p-inputSwitch
          ariaLabel="Display remote events only"
          id="remote"
          name="remote"
          [ngModel]="isRemote()"
          (ngModelChange)="isRemote.set($event)"
        />
        <label class="mb-2" for="remote">remote only</label>
      </div>
    </form>

    <ul
      class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 justify-start items-start px-8"
    >
      @for (event of filteredEvents(); track event.url) {
        <li>
          <app-event-card [event]="event"></app-event-card>
        </li>
      }
    </ul>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `,
  ],
  imports: [
    RouterLink,
    EventCardComponent,
    CalendarModule,
    FormsModule,
    ButtonModule,
    RouterLinkActive,
    DropdownModule,
    InputSwitchModule,
  ],
})
export default class EventsComponent {
  events = toSignal(injectLoad<typeof load>(), { requireSync: true });
  date = signal(undefined);
  selectedLanguage = signal(null);
  isRemote = signal(false);

  filteredEvents = computed(() => {
    return this.events().filter((event) => {
      return (
        (this.date()
          ? isSameDay(new Date(event.date), new Date(this.date()!))
          : true) &&
        (this.selectedLanguage()
          ? event.language === this.selectedLanguage()
          : true) &&
        (this.isRemote() ? event.isRemote : true)
      );
    });
  });

  languages = computed(() => {
    return Array.from(new Set(this.events().map((event) => event.language)));
  });

  constructor(
    private title: Title,
    private jsonldService: JsonLdService,
  ) {
    this.title.setTitle('Angular HUB - Events');
    this.jsonldService.updateJsonLd(this.setJsonLd());
  }

  setJsonLd() {
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: this.events().map((event, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Event',
          name: event.name,
          url: event.url,
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
    };
  }
}
