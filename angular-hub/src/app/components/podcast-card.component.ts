import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ContentFile } from '@analogjs/content';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { EventTagComponent } from './event-tag.component';
import { Podcast } from '../models/podcast.model';

@Component({
  selector: 'app-podcast-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="flex w-full items-center gap-4">
      <img
        class="rounded-xl"
        [ngSrc]="podcast.attributes.logo"
        height="80"
        width="80"
        alt=""
      />
      <div class="text-start">
        <h3
          [attr.id]="podcast.attributes.title"
          class="text-xl font-bold"
          itemprop="title"
        >
          {{ podcast.attributes.title }}
        </h3>
        <app-event-tag [name]="podcast.attributes.language" />
      </div>
    </article>
  `,
  imports: [NgOptimizedImage, NgIf, NgForOf, EventTagComponent],
  styles: [
    `
      :host {
        display: block;
        padding-block: 0.5rem;
      }
    `,
  ],
})
export class PodcasttCardComponent {
  @Input({ required: true }) podcast!: ContentFile<Podcast>;
}
