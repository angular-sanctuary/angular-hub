import {Component} from '@angular/core';
import {EventCardComponent} from "../../components/event-card.component";
import {ContentFile, injectContentFiles} from "@analogjs/content";
import {AsyncPipe, NgForOf} from "@angular/common";
import {Event} from "../../models/event.model";
import {Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import {combineLatest, map, startWith} from "rxjs";
import {SearchComponent} from "../../components/search.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

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
  ],
  template: `
    <h1 class="text-3xl text-start sm:text-5xl font-bold my-8">Agenda</h1>
    <app-search [formControl]="searchControl"></app-search>
    <nav>
      <ul class="flex gap-4 mb-8">
        <li><a class="py-2 px-4" routerLink="." routerLinkActive="active"
               [queryParams]="{state: 'upcoming'}">Upcoming</a></li>
        <li><a class="py-2 px-4" routerLink="." routerLinkActive="active" [queryParams]="{state: 'past'}">Past</a></li>
      </ul>
    </nav>
    <ul class="flex flex-col gap-2">
      <li *ngFor="let event of events$ | async; trackBy: trackbyFn">
        <app-event-card
          class="border-2 border-transparent rounded-xl hover:border-gray-200"
          [event]="event"
        ></app-event-card>
      </li>
      <!-- TODO : add empty control flow -->
    </ul>
  `,
  styles: `
    .active {
      background-color: #BF25B9;
      color: white;
      border-radius: 0.5rem;
    }
  `
})
export default class EvenementsComponent {
  searchControl = new FormControl<string>('', {nonNullable: true});

  evenements = injectContentFiles<Event>(({filename}) => filename.startsWith('/src/content/events/')).sort(
    (a, b) => new Date(a.attributes.date).getTime() - new Date(b.attributes.date).getTime()
  );
  pastEvents = this.evenements.filter(event => new Date(event.attributes.date).getTime() < Date.now());
  upcomingEvents = this.evenements.filter(event => new Date(event.attributes.date).getTime() > Date.now());

  events$ = combineLatest([
    this.searchControl.valueChanges.pipe(startWith('')),
    this.route.queryParamMap
  ]).pipe(
    map(([searchTerm, params]) => {
      const state = params.get('state');
      if (state === 'past') {
        return this.pastEvents.filter(event => this.filterPredicate(event.attributes, searchTerm));
      } else {
        return this.upcomingEvents.filter(event => this.filterPredicate(event.attributes, searchTerm));
      }
    })
  );

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    private route: ActivatedRoute
  ) {
    title.setTitle('ANGULAR HUB - Curated list of Angular events');
    meta.updateTag({name: 'description', content: 'Curated list of Angular events'});
  }

  filterPredicate(event: Event, searchTerm: string): boolean {
    if (searchTerm === '') {
      return true;
    }

    const isTitleMatching = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const isLocationMatching = event.location.toLowerCase().includes(searchTerm.toLowerCase());

    return isTitleMatching || isLocationMatching;
  }

  trackbyFn(index: number, event: ContentFile<Event>): string {
    return event.attributes.title;
  }
}
