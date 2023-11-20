import {Component } from '@angular/core';
import {EventCardComponent} from "../../components/event-card.component";
import {injectContentFiles} from "@analogjs/content";
import {AsyncPipe, NgForOf, NgOptimizedImage} from "@angular/common";
import {Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import {CallForPapers} from "../../models/call-for-papers.model";
import {checkForPrivateExports} from "@angular/compiler-cli/src/ngtsc/entry_point";
import {CfpCardComponent} from "../../components/call-for-paper-card.component";
import {SearchComponent} from "../../components/search.component";
import {map} from "rxjs";

@Component({
  selector: 'app-cfps',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    CfpCardComponent,
    SearchComponent,
    RouterLinkActive,
    AsyncPipe,
    EventCardComponent
  ],
  template: `
    <h1 class="text-3xl text-start sm:text-5xl font-bold my-8">Call For Papers</h1>
    <nav>
      <ul class="flex gap-4 mb-4">
        <li><a class="py-2 px-4" routerLink="." routerLinkActive="active" [queryParams]="{state: 'all'}">All</a></li>
        <li><a class="py-2 px-4" routerLink="." routerLinkActive="active" [queryParams]="{state: 'conferences'}">Conferences</a></li>
        <li><a class="py-2 px-4" routerLink="." routerLinkActive="active" [queryParams]="{state: 'meetups'}">Meetups</a></li>
      </ul>
    </nav>
    <!-- <app-search></app-search> -->
    <ul class="flex flex-col gap-2">
      <li *ngFor="let cfp of cfps$ | async">
        <app-cfp-card
          class="border-2 border-transparent rounded-xl hover:border-gray-200"
          [cfp]="cfp"
        ></app-cfp-card>
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
export default class CallForPapersComponent {
  cfps = injectContentFiles<CallForPapers>(({filename}) => filename.startsWith('/src/content/cfp/'));
  cfps$ = this.route.queryParams.pipe(
    map(({state}) => {
      if (state === 'meetups') {
        return this.cfps.filter(({attributes}) => attributes.type === 'meetup');
      }
      if (state === 'conferences') {
        return this.cfps.filter(({attributes}) => attributes.type === 'conference');
      }
      return this.cfps;
    })
  );

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    private readonly route: ActivatedRoute
  ) {
    title.setTitle('ANGULAR HUB - Curated list of Angular Call For Papers');
    meta.updateTag({name: 'description', content: 'Curated list of Angular Call For Papers'});
  }
}
