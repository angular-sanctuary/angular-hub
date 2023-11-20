import {Component } from '@angular/core';
import {injectContentFiles} from "@analogjs/content";
import {AsyncPipe, NgForOf, NgOptimizedImage} from "@angular/common";
import {Meta, Title} from "@angular/platform-browser";
import {Community} from "../../models/community.model";
import {CommunityCardComponent} from "../../components/community-card.component";
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import {SearchComponent} from "../../components/search.component";
import {map} from "rxjs";
import {EventCardComponent} from "../../components/event-card.component";

@Component({
  selector: 'app-communities',
  standalone: true,
  imports: [
    NgForOf,
    CommunityCardComponent,
    RouterLink,
    SearchComponent,
    RouterLinkActive,
    AsyncPipe,
    EventCardComponent
  ],
  template: `
    <h1 class="text-3xl text-start sm:text-5xl font-bold my-8">Communities</h1>
    <!-- <app-search></app-search> -->
    <nav>
      <ul class="flex gap-4 mb-4">
        <li><a class="py-2 px-4" routerLink="." routerLinkActive="active" [queryParams]="{state: 'all'}">All</a></li>
        <li><a class="py-2 px-4" routerLink="." routerLinkActive="active" [queryParams]="{state: 'conferences'}">Conferences</a></li>
        <li><a class="py-2 px-4" routerLink="." routerLinkActive="active" [queryParams]="{state: 'meetups'}">Meetups</a></li>
      </ul>
    </nav>
    <ul class="flex flex-col gap-2">
      <li *ngFor="let community of communities$ | async">
        <app-community-card
          class="border-2 border-transparent rounded-xl hover:border-gray-200"
          [community]="community"
        ></app-community-card>
      </li>
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
  communities = injectContentFiles<Community>(({filename}) => filename.startsWith('/src/content/communities/'));

  communities$ = this.route.queryParams.pipe(
    map(({state}) => {
      if (state === 'meetups') {
        return this.communities.filter(({attributes}) => attributes.type === 'meetup');
      }
      if (state === 'conferences') {
        return this.communities.filter(({attributes}) => attributes.type === 'conference');
      }
      return this.communities;
    })
  );

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    private readonly route: ActivatedRoute
  ) {
    title.setTitle('ANGULAR HUB - Curated list of Angular communities');
    meta.updateTag({name: 'description', content: 'Curated list of Angular communities'});
  }
}
