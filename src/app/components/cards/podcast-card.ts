import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Podcast } from '../../../models/podcast.model';

@Component({
  selector: 'app-podcast-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article
      class="rounded-2xl drop-shadow-xl p-6 bg-white h-full flex flex-col gap-4"
    >
      <div class="flex items-start gap-4">
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
            class="text-lg font-bold mb-1"
            itemprop="title"
          >
            {{ podcast().name }}
          </h3>
          <span
            class="inline-flex items-center justify-center gap-1 bg-gray-100 rounded px-2 py-1 text-xs"
          >
            <i class="pi pi-language text-xs" aria-hidden="true"></i>
            {{
              podcast().language !== 'English' ? podcast().language : 'English'
            }}
          </span>
        </div>
      </div>

      <p class="text-sm leading-relaxed flex-1">
        {{ podcast().description }}
      </p>

      <a
        [href]="podcast().url"
        class="flex items-center justify-between w-full hover:text-purple-100"
        target="_blank"
      >
        <div class="flex items-center gap-3">
          <i class="pi pi-play-circle text-purple-600 text-2xl"></i>
          <span class="font-medium text-purple-600">Listen Now</span>
        </div>
      </a>
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
}
