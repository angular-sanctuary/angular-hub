import { Component, Input } from '@angular/core';
import { ContentFile, injectContentFiles } from '@analogjs/content';
import { AsyncPipe } from '@angular/common';
import { Community } from '../../models/community.model';
import { CommunityCardComponent } from '../../components/cards/community-card.component';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { SearchBarComponent } from '../../components/search-bar.component';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatListModule } from '@angular/material/list';
import { RouteMeta } from '@analogjs/router';
import { HeaderService } from '../../services/header.service';

export const routeMeta: RouteMeta = {
  title: 'ANGULAR HUB - Curated list of Angular communities',
  meta: [
    {
      name: 'description',
      content: 'Curated list of Angular communities',
    },
  ],
  data: {
    header: 'Communities',
  },
};

@Component({
  selector: 'app-communities',
  standalone: true,
  imports: [
    CommunityCardComponent,
    RouterLink,
    SearchBarComponent,
    RouterLinkActive,
    AsyncPipe,
    ReactiveFormsModule,
    MatListModule,
  ],
  template: `
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
      @for (
        community of communities$ | async;
        track community.attributes.title
      ) {
        <a
          mat-list-item
          [attr.aria-labelledby]="community.attributes.title"
          [href]="community.attributes.url"
          target="_blank"
        >
          <app-community-card
            [community]="community.attributes"
          ></app-community-card>
        </a>
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
export default class EvenementsComponent {
  searchControl = new FormControl<string>('', { nonNullable: true });
  communities = injectContentFiles<Community>(({ filename }) =>
    filename.startsWith('/src/content/communities/'),
  );

  communities$ = this.route.queryParams.pipe(
    tap(({ search = '' }) =>
      this.searchControl.setValue(search, { emitEvent: false }),
    ),
    map(({ search: searchTerm = '', state }) => {
      let communities: ContentFile<Community>[] = this.communities;

      if (state === 'meetups') {
        communities = this.communities.filter(
          ({ attributes }) => attributes.type === 'meetup',
        );
      }

      if (state === 'conferences') {
        communities = this.communities.filter(
          ({ attributes }) => attributes.type === 'conference',
        );
      }

      return communities.filter((community) =>
        this.filterPredicate(community.attributes, searchTerm),
      );
    }),
  );

  @Input() set header(header: string) {
    this.headerService.setHeaderTitle(header);
  }

  constructor(
    private readonly headerService: HeaderService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
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

  filterPredicate(community: Community, searchTerm: string): boolean {
    if (searchTerm === '') {
      return true;
    }

    const isTitleMatching = community.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const isLocationMatching = community.location
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return isTitleMatching || isLocationMatching;
  }
}
