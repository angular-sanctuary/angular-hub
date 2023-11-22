import {Component} from '@angular/core';
import {ContentFile, injectContentFiles} from "@analogjs/content";
import {AsyncPipe, NgForOf} from "@angular/common";
import {Meta, Title} from "@angular/platform-browser";
import {Community} from "../../models/community.model";
import {CommunityCardComponent} from "../../components/community-card.component";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {SearchComponent} from "../../components/search.component";
import {debounceTime, distinctUntilChanged, map} from "rxjs";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    ReactiveFormsModule
  ],
  template: `
    <h1 class="text-3xl text-start sm:text-5xl font-bold mt-2 mb-6">Communities</h1>
    <app-search [formControl]="searchControl"></app-search>
    <nav>
      <ul class="flex gap-2 mb-4">
        <li><a class="py-2 px-4" routerLink="." routerLinkActive="active" [queryParams]="{state: 'all'}" [queryParamsHandling]="'merge'">All</a></li>
        <li><a class="py-2 px-4" routerLink="." routerLinkActive="active" [queryParams]="{state: 'conferences'}" [queryParamsHandling]="'merge'">Conferences</a>
        </li>
        <li><a class="py-2 px-4" routerLink="." routerLinkActive="active" [queryParams]="{state: 'meetups'}" [queryParamsHandling]="'merge'">Meetups</a>
        </li>
      </ul>
    </nav>
    <ul class="flex flex-col gap-2">
      <li *ngFor="let community of communities$ | async; trackBy: trackbyFn">
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
  searchControl = new FormControl<string>('', {nonNullable: true});
  communities = injectContentFiles<Community>(({filename}) => filename.startsWith('/src/content/communities/'));

  communities$ = this.route.queryParams.pipe(
    map(({q: searchTerm = '', state}) => {
      let communities: ContentFile<Community>[] = this.communities;

      if (state === 'meetups') {
        communities = this.communities
          .filter(({attributes}) => attributes.type === 'meetup');
      }

      if (state === 'conferences') {
        communities = this.communities
          .filter(({attributes}) => attributes.type === 'conference');
      }

      return communities.filter(community => this.filterPredicate(community.attributes, searchTerm));
    })
  );

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    title.setTitle('ANGULAR HUB - Curated list of Angular communities');
    meta.updateTag({name: 'description', content: 'Curated list of Angular communities'});

    this.searchControl.valueChanges
      .pipe(
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

  filterPredicate(community: Community, searchTerm: string): boolean {
    if (searchTerm === '') {
      return true;
    }

    const isTitleMatching = community.title.toLowerCase().includes(searchTerm.toLowerCase());
    const isLocationMatching = community.location.toLowerCase().includes(searchTerm.toLowerCase());

    return isTitleMatching || isLocationMatching;
  }

  // TODO : to be removed with control flow update
  trackbyFn(index: number, community: ContentFile<Community>): string {
    return community.attributes.title;
  }
}
