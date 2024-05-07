import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Podcast } from '../../../models/podcast.model';
import { TagComponent } from '../tag.component';

@Component({
  selector: 'app-podcast-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="flex flex-col max-w-36 items-start gap-1">
      <a [href]="podcast().url ?? '#'">
        <img
          class="rounded-xl"
          [src]="podcast().logo"
          height="200"
          width="2000"
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
          <app-tag [title]="podcast().language" />
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
            color: theme('colors.secondary');
          }
        }
      }
    `,
  ],
})
export class PodcastCardComponent {
  podcast = input.required<Podcast>();
}
