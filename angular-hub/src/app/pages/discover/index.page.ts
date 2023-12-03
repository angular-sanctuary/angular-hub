import { Component, inject, Input } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { RouteMeta } from '@analogjs/router';
import { injectContentFiles } from '@analogjs/content';
import { NgForOf, NgOptimizedImage } from '@angular/common';
import { Event } from '../../models/event.model';
import isThisSOWeek from 'date-fns/isThisISOWeek';
import { EventCardComponent } from '../../components/cards/event-card.component';
import { MatListModule } from '@angular/material/list';
import { CallForPapers } from '../../models/call-for-papers.model';
import { CfpCardComponent } from '../../components/cards/call-for-paper-card.component';

export const routeMeta: RouteMeta = {
  title: 'ANGULAR HUB - Latest Angular community activities',
  meta: [
    {
      name: 'description',
      content: 'Discover latest Angular community activities',
    },
  ],
  data: {
    header: 'Discover',
  },
};

@Component({
  selector: 'app-discover',
  template: `
    <p class="text-start border-l-4 border-l-primary pl-3 mb-4 max-w-screen-lg">
      Explore upcoming events and latest call for papers in the Angular
      community.
    </p>

    <a
      class="flex gap-2 items-center bg-white rounded-lg w-fit p-2 mt-8 mb-8 border-primary border-2 dark:border-white"
      href="https://t.co/Ho7xL97EDq"
      target="_blank"
      aria-labelledby="christmas"
    >
      <img
        ngSrc="assets/logos/angular-space.webp"
        alt=""
        height="80"
        width="80"
      />
      <span id="christmas" class="christmas text-xl font-bold sm:text-4xl"
        >Angular Space Christmas Calendar</span
      >
    </a>
    <div class="flex flex-wrap gap-24">
      <section>
        <h2 class="text-2xl text-start sm:text-3xl font-bold mt-2 mb-4">
          Upcoming events this week
        </h2>
        <mat-nav-list>
          <a
            mat-list-item
            *ngFor="let event of currentWeekEvents"
            [attr.aria-labelledby]="event.attributes.title"
            [href]="event.attributes.url"
            target="_blank"
          >
            <app-event-card [event]="event.attributes"></app-event-card>
          </a>
        </mat-nav-list>
      </section>
      <section>
        <h2 class="text-2xl text-start sm:text-3xl font-bold mt-2 mb-4">
          Submit your talks!
        </h2>
        <mat-nav-list>
          <a
            mat-list-item
            *ngFor="let cfp of activeCallForPapers"
            [attr.aria-labelledby]="cfp.attributes.title"
            [href]="cfp.attributes.url"
            target="_blank"
          >
            <app-cfp-card [cfp]="cfp.attributes"></app-cfp-card>
          </a>
        </mat-nav-list>
      </section>
    </div>
  `,
  standalone: true,
  imports: [
    NgForOf,
    EventCardComponent,
    MatListModule,
    CfpCardComponent,
    NgOptimizedImage,
  ],
  styles: `
    .christmas {
      width: fit-content;
      background-size: 100%;
      background-repeat: repeat;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-image: linear-gradient( 90deg, #fa2c05 0%, #f637e3 50%, #8514f5 100% );
    }
  `,
})
export default class DiscoverComponent {
  #headerService = inject(HeaderService);

  currentWeekEvents = injectContentFiles<Event>(({ filename }) =>
    filename.startsWith('/src/content/events/')
  ).filter((event) => isThisSOWeek(new Date(event.attributes.date)));

  activeCallForPapers = injectContentFiles<CallForPapers>(({ filename }) =>
    filename.startsWith('/src/content/cfp/')
  ).filter((event) => new Date(event.attributes.deadline) > new Date());

  @Input() set header(header: string) {
    this.#headerService.setHeaderTitle(header);
  }
}
