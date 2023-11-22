import {Component } from '@angular/core';
import {EventCardComponent} from "../../components/event-card.component";
import {ContentFile, injectContentFiles} from "@analogjs/content";
import {AsyncPipe, NgForOf} from "@angular/common";
import {Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {CallForPapers} from "../../models/call-for-papers.model";
import {CfpCardComponent} from "../../components/call-for-paper-card.component";
import {SearchComponent} from "../../components/search.component";
import {debounceTime, distinctUntilChanged, map, startWith} from "rxjs";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
        <li><a class="py-2 px-4" routerLink="." routerLinkActive="active" [queryParams]="{state: 'all'}" [queryParamsHandling]="'merge'">All</a></li>
        <li><a class="py-2 px-4" routerLink="." routerLinkActive="active" [queryParams]="{state: 'conferences'}" [queryParamsHandling]="'merge'">Conferences</a></li>
        <li><a class="py-2 px-4" routerLink="." routerLinkActive="active" [queryParams]="{state: 'meetups'}" [queryParamsHandling]="'merge'">Meetups</a></li>
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

  cfps$ = this.route.queryParams.pipe(
    map(({q: searchTerm = '', state}) => {
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
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    title.setTitle('ANGULAR HUB - Curated list of Angular Call For Papers');
    meta.updateTag({name: 'description', content: 'Curated list of Angular Call For Papers'});

    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed()
      )
      .subscribe((value) => {
        this.router.navigate(['.'], { 
          queryParams: { q: value || null },
          queryParamsHandling: 'merge',
          relativeTo: this.route 
        });
      });
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
