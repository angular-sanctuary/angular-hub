import { Component } from '@angular/core';
import { EventCardComponent } from '../../components/event-card.component';
import { ContentFile, injectContentFiles } from '@analogjs/content';
import { AsyncPipe, NgForOf } from '@angular/common';
import { Event } from '../../models/event.model';
import { Meta, Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs';
import { SearchComponent } from '../../components/search.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-evenements',
  standalone: true,
  imports: [
    NgForOf,
    EventCardComponent,
    RouterLink,
    AsyncPipe,
    RouterLinkActive,
    SearchComponent,
    ReactiveFormsModule,
    MatListModule,
  ],
  template: `
    <h1 class="text-3xl text-start sm:text-5xl font-bold mt-2 mb-6">Agenda</h1>
    <app-search [formControl]="searchControl"></app-search>
    <nav>
      <ul class="flex gap-2 mb-8">
        <li>
          <a
            class="py-2 px-4"
            routerLink="."
            routerLinkActive="active"
            [queryParams]="{ state: 'upcoming' }"
            [queryParamsHandling]="'merge'"
            >Upcoming</a
          >
        </li>
        <li>
          <a
            class="py-2 px-4"
            routerLink="."
            routerLinkActive="active"
            [queryParams]="{ state: 'past' }"
            [queryParamsHandling]="'merge'"
            >Past</a
          >
        </li>
      </ul>
    </nav>

    <mat-nav-list>
      <a
        mat-list-item
        *ngFor="let event of events$ | async; trackBy: trackbyFn"
        [attr.aria-labelledby]="event.attributes.title"
        [href]="event.attributes.url"
        target="_blank"
      >
        <app-event-card [event]="event"></app-event-card>
      </a>
    </mat-nav-list>
  `,
  styles: `
    .active {
      background-color: #BF25B9;
      color: white;
      border-radius: 0.5rem;
    }
  `,
})
export default class EvenementsComponent {
  searchControl = new FormControl<string>('', { nonNullable: true });

  evenements = injectContentFiles<Event>(({ filename }) =>
    filename.startsWith('/src/content/events/')
  );
  pastEvents = this.evenements.filter(
    (event) => new Date(event.attributes.date) < this.today()
  );
  upcomingEvents = this.evenements.filter(
    (event) => new Date(event.attributes.date) >= this.today()
  );

  events$ = this.route.queryParams.pipe(
    tap(({ search = '' }) =>
      this.searchControl.setValue(search, { emitEvent: false })
    ),
    map(({ search: searchTerm = '', state }) => {
      if (state === 'past') {
        return this.pastEvents
          .filter((event) => this.filterPredicate(event.attributes, searchTerm))
          .sort((a, b) => {
            return (
              new Date(b.attributes.date).getTime() -
              new Date(a.attributes.date).getTime()
            );
          });
      }
      return this.upcomingEvents
        .filter((event) => this.filterPredicate(event.attributes, searchTerm))
        .sort((a, b) => {
          return (
            new Date(a.attributes.date).getTime() -
            new Date(b.attributes.date).getTime()
          );
        });
    })
  );

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    title.setTitle('ANGULAR HUB - Curated list of Angular events');
    meta.updateTag({
      name: 'description',
      content: 'Curated list of Angular events',
    });

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((value) => {
        this.router.navigate(['.'], {
          queryParams: { search: value || null },
          queryParamsHandling: 'merge',
          relativeTo: this.route,
        });
      });
  }

  filterPredicate(event: Event, searchTerm: string): boolean {
    if (searchTerm === '') {
      return true;
    }

    const isTitleMatching = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const isLocationMatching = event.location
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return isTitleMatching || isLocationMatching;
  }

  // TODO : to be removed with control flow update
  trackbyFn(index: number, event: ContentFile<Event>): string {
    return event.attributes.title;
  }

  today(): Date {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return currentDate;
  }
}
