import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Podcast } from '../../../models/podcast.model';

@Component({
  selector: 'app-podcast-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article
      class="bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl p-6 text-white shadow-lg h-full"
    >
      <div class="flex items-start gap-4 mb-4">
        <img
          class="rounded-xl flex-shrink-0"
          [src]="podcast().logo"
          height="64"
          width="64"
          alt=""
        />
        <div class="flex-1 min-w-0">
          <h3
            [attr.id]="podcast().name"
            class="text-xl font-bold text-white mb-1"
            itemprop="title"
          >
            {{ podcast().name }}
          </h3>
          <span
            class="inline-flex items-center justify-center gap-1 bg-purple-800/50 border-purple-600 border rounded px-2 py-1 text-xs text-purple-200"
          >
            <i class="pi pi-language text-xs" aria-hidden="true"></i>
            {{
              podcast().language !== 'English' ? podcast().language : 'English'
            }}
          </span>
        </div>
      </div>

      <p class="text-purple-100 text-sm mb-4 leading-relaxed">
        A weekly podcast dedicated to the Angular JavaScript framework and
        related technologies.
      </p>

      <button
        class="flex items-center justify-between w-full text-left group"
        (click)="openPodcast($event)"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center group-hover:bg-purple-500 transition-colors"
          >
            <i class="pi pi-play text-white text-xs"></i>
          </div>
          <span
            class="font-medium text-purple-100 group-hover:text-white transition-colors"
            >Listen Now</span
          >
        </div>
      </button>
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
        margin-bottom: 1rem;
        height: 100%;
      }
    `,
  ],
})
export class PodcastCard {
  podcast = input.required<Podcast>();

  openPodcast(event: Event) {
    event.preventDefault();
    globalThis.window?.open(this.podcast().url, '_blank');
  }
}
