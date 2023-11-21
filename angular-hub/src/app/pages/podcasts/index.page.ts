import {Component} from '@angular/core';
import {ContentFile, injectContentFiles} from "@analogjs/content";
import {AsyncPipe, NgForOf} from "@angular/common";
import {Meta, Title} from "@angular/platform-browser";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {SearchComponent} from "../../components/search.component";
import {map, startWith} from "rxjs";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Podcast} from "../../models/podcast.model";
import {PodcasttCardComponent} from "../../components/podcast-card.component";

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
        PodcasttCardComponent
    ],
    template: `
        <h1 class="text-3xl text-start sm:text-5xl font-bold mt-2 mb-6">Podcasts</h1>
        <app-search [formControl]="searchControl"></app-search>
        <ul class="flex flex-col gap-2">
            <li *ngFor="let podcast of podcasts$ | async; trackBy: trackbyFn">
                <app-podcast-card
                        class="border-2 border-transparent rounded-xl hover:border-gray-200"
                        [podcast]="podcast"
                ></app-podcast-card>
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
export default class PodcastsComponent {
    searchControl = new FormControl<string>('', {nonNullable: true});
    podcasts = injectContentFiles<Podcast>(({filename}) => filename.startsWith('/src/content/podcasts/'));

    podcasts$ = this.searchControl.valueChanges.pipe(
        startWith(''),
        map((searchTerm) => {
            return this.podcasts.filter(podcast => this.filterPredicate(podcast.attributes, searchTerm));
        })
    );

    constructor(
        private readonly title: Title,
        private readonly meta: Meta,
    ) {
        title.setTitle('ANGULAR HUB - Curated list of Angular podcasts');
        meta.updateTag({name: 'description', content: 'Curated list of Angular podcasts'});
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
