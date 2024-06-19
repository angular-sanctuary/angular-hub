import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Podcast } from '../../../models/podcast.model';
import { TagComponent } from '../tag.component';

@Component({
  selector: 'app-podcast-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article>
      <a
        [href]="podcast().url ?? '#'"
        target="_blank"
        class="flex items-start gap-4"
      >
        <img
          class="rounded-xl"
          [src]="podcast().logo"
          height="100"
          width="100"
          alt=""
        />
        <div class="text-start">
          <h3
            [attr.id]="podcast().name"
            class="text-xl font-bold"
            itemprop="title"
          >
            {{ podcast().name }}
          </h3>
          @if (podcast().language !== 'English') {
            <span
              class="inline-flex items-center justify-center gap-1 bg-[#20212C] border-[#3e4056] border-2 rounded px-2 py-1 mt-1 text-sm"
            >
              <i class="pi pi-language text-sm" aria-hidden="true"></i>
              {{ podcast().language }}
            </span>
          }
        </div>
      </a>
    </article>
  `,
  imports: [NgOptimizedImage, TagComponent],
  styles: [
    `
      :host {
        display: block;
        padding-block: 0.5rem;
        cursor: pointer;

        &:hover {
          h3 {
            @apply text-secondary underline;
          }
        }
      }
    `,
  ],
})
export class PodcastCardComponent {
  podcast = input.required<Podcast>();
}
