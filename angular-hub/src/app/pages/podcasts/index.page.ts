import {Component, Input, computed, signal} from '@angular/core';
import {ContentFile, injectContentFiles} from "@analogjs/content";
import {AsyncPipe, NgForOf} from "@angular/common";
import {Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {SearchComponent} from "../../components/search.component";
import {debounceTime, distinctUntilChanged, map} from "rxjs";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Podcast} from "../../models/podcast.model";
import {PodcasttCardComponent} from "../../components/podcast-card.component";
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

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

    q = signal('');
    filterOptions = computed(() => ({searchTerm: this.q()}));

    podcasts$ = toObservable(this.filterOptions).pipe(
        map(({searchTerm}) => {
            return this.podcasts.filter(podcast => this.filterPredicate(podcast.attributes, searchTerm));
        })
    );

    @Input({alias: 'q', transform: (value: string) => value ?? ''})
    set searchTerm(term: string) {
        this.q.set(term);
    }

    constructor(
        private readonly title: Title,
        private readonly meta: Meta,
        private router: Router,
        private route: ActivatedRoute
    ) {
        title.setTitle('ANGULAR HUB - Curated list of Angular podcasts');
        meta.updateTag({name: 'description', content: 'Curated list of Angular podcasts'});


        this.searchControl.valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                takeUntilDestroyed()
            )
            .subscribe(value => {
                this.router.navigate(['.'], { 
                    queryParams: { q: value || null }, 
                    queryParamsHandling: 'merge', 
                    relativeTo: this.route 
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
