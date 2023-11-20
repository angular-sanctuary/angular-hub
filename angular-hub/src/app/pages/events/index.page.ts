import {Component } from '@angular/core';
import {EventCardComponent} from "../../components/event-card.component";
import {injectContentFiles} from "@analogjs/content";
import {AsyncPipe, NgForOf} from "@angular/common";
import {Event} from "../../models/event.model";
import {Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import {map} from "rxjs";
import {SearchComponent} from "../../components/search.component";

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
  ],
  template: `
    <h1 class="text-3xl text-start sm:text-5xl font-bold my-8">Agenda</h1>
    <!-- <app-search></app-search> -->
    <nav>
      <ul class="flex gap-4 mb-8">
        <li><a class="py-2 px-4" routerLink="." routerLinkActive="active" [queryParams]="{state: 'upcoming'}">Upcoming</a></li>
        <li><a class="py-2 px-4" routerLink="." routerLinkActive="active" [queryParams]="{state: 'past'}">Past</a></li>
      </ul>
    </nav>
    <ul class="flex flex-col gap-2">
      <li *ngFor="let event of events$ | async">
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

  evenements = injectContentFiles<Event>(({filename}) => filename.startsWith('/src/content/events/')).sort(
    (a, b) => new Date(a.attributes.date).getTime() - new Date(b.attributes.date).getTime()
  );
  pastEvents = this.evenements.filter(event => new Date(event.attributes.date).getTime() < Date.now());
  upcomingEvents = this.evenements.filter(event => new Date(event.attributes.date).getTime() > Date.now());

  events$ = this.route.queryParamMap.pipe(
    map(params => params.get('state') === 'past' ? this.pastEvents : this.upcomingEvents),
  );

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    private route: ActivatedRoute
  ) {
    title.setTitle('ANGULAR HUB - Curated list of Angular events');
    meta.updateTag({name: 'description', content: 'Curated list of Angular events'});
  }
}
