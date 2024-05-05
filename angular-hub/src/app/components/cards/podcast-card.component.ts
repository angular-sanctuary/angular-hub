import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { EventTagComponent } from '../event-tag.component';
import { Podcast } from '../../models/podcast.model';

@Component({
  selector: 'app-podcast-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="flex w-full items-center gap-4">
      <img
        class="rounded-xl"
        [src]="podcast.logo"
        height="80"
        width="80"
        alt=""
      />
      <div class="text-start">
        <h3 [attr.id]="podcast.name" class="text-xl font-bold" itemprop="title">
          {{ podcast.name }}
        </h3>
        <app-event-tag [name]="podcast.language" />
      </div>
    </article>
  `,
  imports: [NgOptimizedImage, EventTagComponent],
  styles: [
    `
      :host {
        display: block;
        padding-block: 0.5rem;
      }
    `,
  ],
})
export class PodcastCardComponent {
  @Input({ required: true }) podcast!: Podcast;
}
