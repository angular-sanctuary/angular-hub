import { Component } from '@angular/core';
import { ContentFile, injectContentFiles } from '@analogjs/content';
import { AsyncPipe, NgForOf } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { SearchComponent } from '../../components/search.component';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Podcast } from '../../models/podcast.model';
import { PodcasttCardComponent } from '../../components/podcast-card.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-podcasts',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    SearchComponent,
    RouterLinkActive,
    AsyncPipe,
    ReactiveFormsModule,
    PodcasttCardComponent,
    MatListModule,
  ],
  template: `
    <h1 class="text-3xl text-start sm:text-5xl font-bold mt-2 mb-6">
      Podcasts
    </h1>
    <app-search [formControl]="searchControl"></app-search>
    <mat-nav-list>
      <a
        mat-list-item
        *ngFor="let podcast of podcasts$ | async; trackBy: trackbyFn"
        [attr.aria-labelledby]="podcast.attributes.title"
        [href]="podcast.attributes.url"
        target="_blank"
      >
        <app-podcast-card [podcast]="podcast"></app-podcast-card>
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
export default class PodcastsComponent {
  searchControl = new FormControl<string>('', { nonNullable: true });
  podcasts = injectContentFiles<Podcast>(({ filename }) =>
    filename.startsWith('/src/content/podcasts/')
  );

  podcasts$ = this.route.queryParams.pipe(
    tap(({ search = '' }) =>
      this.searchControl.setValue(search, { emitEvent: false })
    ),
    map(({ search: searchTerm = '' }) => {
      return this.podcasts.filter((podcast) =>
        this.filterPredicate(podcast.attributes, searchTerm)
      );
    })
  );

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    private router: Router,
    private route: ActivatedRoute
  ) {
    title.setTitle('ANGULAR HUB - Curated list of Angular podcasts');
    meta.updateTag({
      name: 'description',
      content: 'Curated list of Angular podcasts',
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

  filterPredicate(podcast: Podcast, searchTerm: string): boolean {
    if (searchTerm === '') {
      return true;
    }

    return podcast.title.toLowerCase().includes(searchTerm.toLowerCase());
  }

  // TODO : to be removed with control flow update
  trackbyFn(index: number, podcast: ContentFile<Podcast>): string {
    return podcast.attributes.title;
  }
}
