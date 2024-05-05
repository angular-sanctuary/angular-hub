import { Component, Input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { SearchBarComponent } from '../../components/search-bar.component';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Podcast } from '../../models/podcast.model';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatListModule } from '@angular/material/list';
import { PodcastCardComponent } from '../../components/cards/podcast-card.component';
import { injectLoad, RouteMeta } from '@analogjs/router';
import { HeaderService } from '../../services/header.service';

import { load } from './index.server';

export const routeMeta: RouteMeta = {
  meta: [
    {
      name: 'description',
      content: 'Curated list of Angular Talks',
    },
  ],
  data: {
    header: 'Podcasts',
  },
};

@Component({
  selector: 'app-podcasts',
  standalone: true,
  imports: [
    RouterLink,
    SearchBarComponent,
    RouterLinkActive,
    AsyncPipe,
    ReactiveFormsModule,
    MatListModule,
    PodcastCardComponent,
  ],
  template: `
    <!--
    <app-search-bar [formControl]="searchControl"></app-search-bar>
    -->
    <mat-nav-list>
      @for (podcast of podcasts$ | async; track podcast.name) {
        <a
          mat-list-item
          [attr.aria-labelledby]="podcast.name"
          [href]="podcast.url"
          target="_blank"
        >
          <app-podcast-card [podcast]="podcast"></app-podcast-card>
        </a>
      } @empty {
        <span>No Podcasts found!</span>
      }
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
export default class PodcastsComponent {
  searchControl = new FormControl<string>('', { nonNullable: true });

  podcasts = toSignal(injectLoad<typeof load>(), { requireSync: true });

  podcasts$ = this.route.queryParams.pipe(
    tap(({ search = '' }) =>
      this.searchControl.setValue(search, { emitEvent: false }),
    ),
    map(({ search: searchTerm = '' }) => {
      return this.podcasts().filter((podcast) =>
        this.filterPredicate(podcast, searchTerm),
      );
    }),
  );

  @Input() set header(header: string) {
    this.headerService.setHeaderTitle(header);
  }

  constructor(
    private headerService: HeaderService,
    private router: Router,
    private route: ActivatedRoute,
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

  filterPredicate(podcast: Podcast, searchTerm: string): boolean {
    if (searchTerm === '') {
      return true;
    }

    return podcast.name.toLowerCase().includes(searchTerm.toLowerCase());
  }
}
