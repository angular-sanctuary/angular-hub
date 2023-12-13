import { Component } from '@angular/core';
import { injectContentFiles } from '@analogjs/content';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe } from '@angular/common';
import { Podcast } from '../models/podcast.model';
import { Event } from '../models/event.model';
import { CallForPapers } from '../models/call-for-papers.model';
import { Community } from '../models/community.model';
import { FILTER_CRITERIAS } from '../consts/filter-criterias.const';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogContainer, MatDialogContent } from '@angular/material/dialog';
import { EventLiteCardComponent } from './cards/event-lite-card.component';
import { CommunityLiteCardComponent } from './cards/community-lite-card.component';
import { CfpLiteCardComponent } from './cards/call-for-paper-lite-card.component';
import { PodcastLiteCardComponent } from './cards/podcast-lite-card.component';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { shareReplay, startWith } from 'rxjs/operators';
import { map, Observable } from 'rxjs';

type SearchResults = {
  events: Event[];
  cfp: CallForPapers[];
  communities: Community[];
  podcasts: Podcast[];
};

@Component({
  selector: 'app-search-modal',
  template: `
    @if (results$ | async; as results) {
    <mat-dialog-content class="!pt-0">
      <mat-form-field
        class="sticky w-full z-10 search-field pt-5"
        appearance="outline"
        subscriptSizing="dynamic"
      >
        <mat-icon matPrefix svgIcon="search"></mat-icon>
        <input
          [formControl]="searchControl"
          matInput
          type="text"
          placeholder="Search"
          aria-label="Search activities across the whole application"
        />
        @if (searchControl.value) {
        <button type="button" mat-icon-button matSuffix (click)="reset()">
          <mat-icon svgIcon="cancel"></mat-icon>
        </button>
        }
      </mat-form-field>
      @if (results.events.length) {
      <div class="mt-2">Events</div>
      <mat-nav-list>
        @for (event of results.events; track event.title) {
        <a
          mat-list-item
          [attr.aria-labelledby]="event.title"
          [href]="event.url"
          target="_blank"
        >
          <app-event-lite-card [event]="event"></app-event-lite-card>
        </a>
        }
      </mat-nav-list>
      } @if (results.cfp.length) {
      <div class="mt-2">Call for papers</div>
      <mat-nav-list>
        @for (cfp of results.cfp; track cfp.title) {
        <a
          mat-list-item
          [attr.aria-labelledby]="cfp.title"
          [href]="cfp.url"
          target="_blank"
        >
          <app-cfp-lite-card [cfp]="cfp"></app-cfp-lite-card>
        </a>
        }
      </mat-nav-list>
      } @if (results.communities.length) {
      <div class="mt-2">Communities</div>
      <mat-nav-list>
        @for (community of results.communities; track community.title) {
        <a
          mat-list-item
          [attr.aria-labelledby]="community.title"
          [href]="community.url"
          target="_blank"
        >
          <app-community-lite-card
            [community]="community"
          ></app-community-lite-card>
        </a>
        }
      </mat-nav-list>
      } @if (results.podcasts.length) {
      <div class="mt-2">Podcasts</div>
      <mat-nav-list>
        @for (podcast of results.podcasts; track podcast.title) {
        <a
          mat-list-item
          [attr.aria-labelledby]="podcast.title"
          [href]="podcast.url"
          target="_blank"
        >
          <app-podcast-lite-card [podcast]="podcast"></app-podcast-lite-card>
        </a>
        }
      </mat-nav-list>
      }
    </mat-dialog-content>
    }
  `,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    AsyncPipe,
    MatListModule,
    MatIconModule,
    MatDialogContent,
    MatDialogContainer,
    EventLiteCardComponent,
    CommunityLiteCardComponent,
    CfpLiteCardComponent,
    PodcastLiteCardComponent,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  styles: [
    `
      .search-field {
        top: 0;
      }
    `,
  ],
})
export class SearchModalComponent {
  searchControl = new FormControl('', { nonNullable: true });

  events = injectContentFiles<Event>(({ filename }) =>
    filename.startsWith('/src/content/events/')
  ).map((event) => event.attributes);

  callForPapers = injectContentFiles<CallForPapers>(({ filename }) =>
    filename.startsWith('/src/content/cfp/')
  ).map((cfp) => cfp.attributes);

  communities = injectContentFiles<Community>(({ filename }) =>
    filename.startsWith('/src/content/communities/')
  ).map((community) => community.attributes);

  podcasts = injectContentFiles<Podcast>(({ filename }) =>
    filename.startsWith('/src/content/podcasts/')
  ).map((podcast) => podcast.attributes);

  results$: Observable<SearchResults> = this.searchControl.valueChanges.pipe(
    map((searchTerm: string) => this.filter(searchTerm)),
    startWith(this.setDefaultResults()),
    shareReplay()
  );

  filter(searchTerm: string): SearchResults {
    const formattedTerm = searchTerm.trim().toLowerCase();
    if (formattedTerm.length > 2 && !'angular'.includes(formattedTerm)) {
      return {
        events: this.events.filter((event: Event) => {
          for (const key of FILTER_CRITERIAS.event) {
            if (event[key]?.toLowerCase().includes(formattedTerm)) {
              return true;
            }
          }
          return false;
        }),
        cfp: this.callForPapers.filter((cfp: CallForPapers) => {
          for (const key of FILTER_CRITERIAS.cfp) {
            if (cfp[key]?.toLowerCase().includes(formattedTerm)) {
              return true;
            }
          }
          return false;
        }),
        communities: this.communities.filter((community: Community) => {
          for (const key of FILTER_CRITERIAS.community) {
            if (community[key]?.toLowerCase().includes(formattedTerm)) {
              return true;
            }
          }
          return false;
        }),
        podcasts: this.podcasts.filter((podcast: Podcast) => {
          for (const key of FILTER_CRITERIAS.podcast) {
            if (podcast[key]?.toLowerCase().includes(formattedTerm)) {
              return true;
            }
          }
          return false;
        }),
      };
    }
    return this.setDefaultResults();
  }

  setDefaultResults(): SearchResults {
    return {
      events: [],
      cfp: [],
      communities: [],
      podcasts: [],
    };
  }

  reset(): void {
    this.searchControl.reset();
  }
}
