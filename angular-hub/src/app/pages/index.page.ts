import { Component, computed, signal, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { injectLoad, RouteMeta } from '@analogjs/router';
import { load } from './index.server';
import { EventCardComponent } from '../components/cards/event-card.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { isSameDay, isThisISOWeek, isToday, isWithinInterval } from 'date-fns';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { Title } from '@angular/platform-browser';
import { JsonLdService } from '../services/json-ld.service';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { NgTemplateOutlet } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { EventSectionComponent } from '../components/event-section.component';
import { MessageComponent } from '../components/message.component';

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
    <!-- TODO create a shared component out of this aside -->
    <aside
      class="h-20 sm:h-36 flex flex-col justify-center items-center mb-4 m-6 rounded-2xl bg-no-repeat bg-auto md:bg-cover"
      style="background-image: url(/assets/images/hero.webp);"
    >
      <h1 class="title text-5xl hidden sm:block">ANGULAR HUB</h1>
      <h2 class="text-2xl text-center">
        Curated list of Angular Communities and Events
      </h2>
    </aside>
    <!-- TODO add scrollbar-gutter stable for md + -->
    <div class="flex flex-col md:flex-row px-6 gap-6">
      <!-- TODO add sticky -->
      <div role="search" class="flex flex-col gap-4">
        <div class="flex items-center justify-between h-10">
          <span>{{ filteredEvents().length }} upcoming events</span>
          @if (hasFilters()) {
            <p-button
              class="hidden sm:block"
              size="small"
              outlined="true"
              severity="secondary"
              label="Reset"
              icon="pi pi-filter-slash"
              (click)="resetFilters()"
            />
          }
          <p-button
            class="md:hidden"
            size="small"
            outlined="true"
            severity="secondary"
            label="Filters"
            icon="pi pi-filter"
            (click)="sidebarVisible.set(true)"
          />
        </div>
        <div class="hidden md:flex flex-col gap-4">
          <ng-container *ngTemplateOutlet="filters" />
        </div>
      </div>
      <section class="flex flex-col gap-4">
        @if (isTodayEvents().length) {
          <app-event-section [events]="isTodayEvents()" [title]="'Today'" />
        }
        @if (isWeekEvents().length) {
          <app-event-section [events]="isWeekEvents()" [title]="'This week'" />
        }
        @if (isNotWeekEvents().length) {
          <app-event-section
            [events]="isNotWeekEvents()"
            [title]="'Upcoming'"
          />
        }

        <!-- TODO create custom message UI -->
        @if (events().length && !filteredEvents().length) {
          <ng-container *ngTemplateOutlet="emptySearch" />
        }

        <!-- TODO create custom message UI -->
        @if (!events().length) {
          <app-message
            [title]="'No upcoming event tracked, see you later!'"
            severity="warn"
          />
        }
      </section>
    </div>

    <p-sidebar
      styleClass="h-full"
      [(visible)]="sidebarVisible"
      position="bottom"
    >
      <ng-template pTemplate="headless">
        <div class="flex items-center min-h-20 py-4 pl-12 gap-2 text-xl">
          <i class="pi pi-filter"></i>
          Filters
        </div>
        <div class="text-center mb-4">
          {{ filteredEvents().length }} upcoming events found
        </div>
        <p-button
          class="close-button"
          type="button"
          (click)="closeCallback($event)"
          icon="pi pi-times"
          rounded="true"
          outlined="true"
          severity="secondary"
          styleClass="h-2rem w-2rem"
          title="Close filters"
        ></p-button>
        <div role="search" class="flex flex-col gap-6 items-center">
          <ng-container *ngTemplateOutlet="filters" />
          <div class="flex gap-2">
            <p-button
              outlined="true"
              severity="secondary"
              label="reset"
              (click)="resetFilters()"
            />
          </div>
        </div>
      </ng-template>
    </p-sidebar>

    <ng-template #emptySearch>
      <app-message
        [title]="
          'No event found with these criteria, update or reset the filters'
        "
        severity="warn"
      />
    </ng-template>

    <ng-template #filters>
      <!-- TODO highlight selection -->
      <p-calendar
        class="max-w-full"
        name="date"
        [ngModel]="date()"
        (ngModelChange)="date.set($event)"
        [inline]="true"
        [showWeek]="true"
      >
        <ng-template pTemplate="date" let-date>
          <span [class.activeDate]="hasActiveEvent(date)">
            {{ date.day }}
          </span>
        </ng-template>
      </p-calendar>
      <!-- todo hide if only 1 language -->
      <p-dropdown
        ariaLabel="Select a language"
        name="language"
        [style]="{ width: '100%' }"
        [options]="languages()"
        [showClear]="true"
        [ngModel]="selectedLanguage()"
        (ngModelChange)="selectedLanguage.set($event)"
        placeholder="Select a language"
      />
      <!-- hide if remote events only -->
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
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: stretch;
      }

      .activeDate {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #00b8e6;
        color: black;
      }

      .close-button {
        position: absolute;
        right: 1rem;
        top: 1rem;
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
    SidebarModule,
    NgTemplateOutlet,
    MessagesModule,
    EventSectionComponent,
    MessageComponent,
  ],
})
export default class EventsComponent {
  events = toSignal(injectLoad<typeof load>(), { requireSync: true });
  date = signal(undefined);
  selectedLanguage = signal(null);
  isRemote = signal(false);

  sidebarVisible = signal(false);

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

  isTodayEvents = computed(() =>
    this.filteredEvents().filter((event) => isToday(new Date(event.date))),
  );
  isWeekEvents = computed(() =>
    this.filteredEvents().filter(
      (event) =>
        isThisISOWeek(new Date(event.date)) && !isToday(new Date(event.date)),
    ),
  );
  isNotWeekEvents = computed(() =>
    this.filteredEvents().filter(
      (event) => !isThisISOWeek(new Date(event.date)),
    ),
  );
  languages = computed(() =>
    Array.from(new Set(this.events().map((event) => event.language))),
  );
  hasFilters = computed(
    () => !!this.date() || !!this.selectedLanguage() || this.isRemote(),
  );

  sidebarRef = viewChild.required(Sidebar);

  constructor(
    private title: Title,
    private jsonldService: JsonLdService,
  ) {
    this.title.setTitle('Angular HUB - Events');
    this.jsonldService.updateJsonLd(this.setJsonLd());
  }

  protected hasActiveEvent(date: {
    year: number;
    month: number;
    day: number;
  }): boolean {
    return this.events().some((event) => {
      if (!event.endDate) {
        return isSameDay(
          new Date(event.date),
          new Date(date.year, date.month, date.day),
        );
      } else {
        return isWithinInterval(new Date(date.year, date.month, date.day), {
          start: new Date(event.date),
          end: new Date(event.endDate),
        });
      }
    });
  }

  protected resetFilters(): void {
    this.date.set(undefined);
    this.selectedLanguage.set(null);
    this.isRemote.set(false);
  }

  protected closeCallback(e: Event): void {
    this.sidebarRef().close(e);
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
          'https://twitter.com/GeromeDEV',
          'https://www.linkedin.com/in/gerome-grignon/',
          'https://github.com/geromegrignon',
        ],
      },
      mainEntity: [
        {
          '@type': 'ItemList',
          name: 'Angular Events',
          itemListElement: this.events().map((event, index) => ({
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
