import { Component, Input } from '@angular/core';
import { EventCardComponent } from '../../components/cards/event-card.component';
import { ContentFile, injectContentFiles } from '@analogjs/content';
import { AsyncPipe, NgForOf } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { CallForPapers } from '../../models/call-for-papers.model';
import { CfpCardComponent } from '../../components/cards/call-for-paper-card.component';
import { SearchBarComponent } from '../../components/search-bar.component';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatListModule } from '@angular/material/list';
import { RouteMeta } from '@analogjs/router';
import { HeaderService } from '../../services/header.service';

export const routeMeta: RouteMeta = {
  title: 'ANGULAR HUB - Curated list of Angular Call For Papers',
  meta: [
    {
      name: 'description',
      content: 'Curated list of Angular Call For Papers',
    },
  ],
  data: {
    header: 'Call for papers',
  },
};

@Component({
  selector: 'app-cfps',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    CfpCardComponent,
    SearchBarComponent,
    RouterLinkActive,
    AsyncPipe,
    EventCardComponent,
    ReactiveFormsModule,
    MatListModule,
  ],
  template: `
    <p class="text-start border-l-4 border-l-primary pl-3 mb-4 max-w-screen-lg">
      Welcome to our Call for Papers (CFP) page! Whether you're a seasoned
      speaker or new to presenting, we encourage you to share your knowledge and
      engage our community. Submit your proposals to these communities!
    </p>
    <app-search-bar [formControl]="searchControl"></app-search-bar>
    <nav>
      <ul class="flex gap-2 mb-4">
        <li>
          <a
            class="py-2 px-4"
            routerLink="."
            routerLinkActive="active"
            [queryParams]="{ state: 'all' }"
            [queryParamsHandling]="'merge'"
            >All</a
          >
        </li>
        <li>
          <a
            class="py-2 px-4"
            routerLink="."
            routerLinkActive="active"
            [queryParams]="{ state: 'conferences' }"
            [queryParamsHandling]="'merge'"
            >Conferences</a
          >
        </li>
        <li>
          <a
            class="py-2 px-4"
            routerLink="."
            routerLinkActive="active"
            [queryParams]="{ state: 'meetups' }"
            [queryParamsHandling]="'merge'"
            >Meetups</a
          >
        </li>
      </ul>
    </nav>
    <mat-nav-list>
      <a
        mat-list-item
        *ngFor="let cfp of cfps$ | async; trackBy: trackbyFn"
        [attr.aria-labelledby]="cfp.attributes.title"
        [href]="cfp.attributes.url"
        target="_blank"
      >
        <app-cfp-card [cfp]="cfp.attributes"></app-cfp-card>
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
export default class CallForPapersComponent {
  searchControl = new FormControl<string>('', { nonNullable: true });
  cfps = injectContentFiles<CallForPapers>(({ filename }) =>
    filename.startsWith('/src/content/cfp/')
  );

  cfps$ = this.route.queryParams.pipe(
    tap(({ search = '' }) =>
      this.searchControl.setValue(search, { emitEvent: false })
    ),
    map(({ search: searchTerm = '', state }) => {
      let cfps: ContentFile<CallForPapers>[] = this.cfps;

      if (state === 'meetups') {
        cfps = this.cfps.filter(
          ({ attributes }) => attributes.type === 'meetup'
        );
      }

      if (state === 'conferences') {
        cfps = this.cfps.filter(
          ({ attributes }) => attributes.type === 'conference'
        );
      }
      return cfps.filter((cfp) =>
        this.filterPredicate(cfp.attributes, searchTerm)
      );
    })
  );

  @Input() set header(header: string) {
    this.headerService.setHeaderTitle(header);
  }

  constructor(
    private readonly headerService: HeaderService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((value) => {
        void this.router.navigate(['.'], {
          queryParams: { search: value || null },
          queryParamsHandling: 'merge',
          relativeTo: this.route,
        });
      });
  }

  filterPredicate(cfp: CallForPapers, searchTerm: string): boolean {
    if (searchTerm === '') {
      return true;
    }

    const isTitleMatching = cfp.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const isLocationMatching = cfp.location
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return isTitleMatching || isLocationMatching;
  }

  // TODO : to be removed with control flow update
  trackbyFn(index: number, cfp: ContentFile<CallForPapers>): string {
    return cfp.attributes.title;
  }
}
