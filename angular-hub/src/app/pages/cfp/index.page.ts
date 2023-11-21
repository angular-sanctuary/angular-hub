import {Component } from '@angular/core';
import {EventCardComponent} from "../../components/event-card.component";
import {ContentFile, injectContentFiles} from "@analogjs/content";
import {AsyncPipe, NgForOf} from "@angular/common";
import {Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import {CallForPapers} from "../../models/call-for-papers.model";
import {CfpCardComponent} from "../../components/call-for-paper-card.component";
import {SearchComponent} from "../../components/search.component";
import {combineLatest, map, startWith} from "rxjs";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

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
    EventCardComponent,
    ReactiveFormsModule
  ],
  template: `
    <h1 class="text-3xl text-start sm:text-5xl font-bold mt-2 mb-6">Call For Papers</h1>
    <app-search [formControl]="searchControl"></app-search>
    <nav>
      <ul class="flex gap-2 mb-4">
        <li><a class="py-2 px-4" routerLink="." routerLinkActive="active" [queryParams]="{state: 'all'}">All</a></li>
        <li><a class="py-2 px-4" routerLink="." routerLinkActive="active" [queryParams]="{state: 'conferences'}">Conferences</a></li>
        <li><a class="py-2 px-4" routerLink="." routerLinkActive="active" [queryParams]="{state: 'meetups'}">Meetups</a></li>
      </ul>
    </nav>
    <ul class="flex flex-col gap-2">
      <li *ngFor="let cfp of cfps$ | async; trackBy: trackbyFn">
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
  searchControl = new FormControl<string>('', {nonNullable: true});
  cfps = injectContentFiles<CallForPapers>(({filename}) => filename.startsWith('/src/content/cfp/'));


  cfps$ = combineLatest([
    this.searchControl.valueChanges.pipe(startWith('')),
    this.route.queryParams.pipe(map(({state}) => state))
  ]).pipe(
    map(([searchTerm, state]) => {
      let cfps: ContentFile<CallForPapers>[] = this.cfps;
      if (state === 'meetups') {
        cfps = this.cfps.filter(({attributes}) => attributes.type === 'meetup');
      }
      if (state === 'conferences') {
        cfps = this.cfps.filter(({attributes}) => attributes.type === 'conference');
      }
      return cfps.filter(cfp => this.filterPredicate(cfp.attributes, searchTerm));
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

  filterPredicate(cfp: CallForPapers, searchTerm: string): boolean {
    if (searchTerm === '') {
      return true;
    }

    const isTitleMatching = cfp.title.toLowerCase().includes(searchTerm.toLowerCase());
    const isLocationMatching = cfp.location.toLowerCase().includes(searchTerm.toLowerCase());

    return isTitleMatching || isLocationMatching;
  }

  // TODO : to be removed with control flow update
  trackbyFn(index: number, cfp: ContentFile<CallForPapers>): string {
    return cfp.attributes.title;
  }
}
