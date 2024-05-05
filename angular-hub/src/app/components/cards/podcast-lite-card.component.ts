import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { EventTagComponent } from '../event-tag.component';
import { Podcast } from '../../models/podcast.model';

@Component({
  selector: 'app-podcast-lite-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="flex flex-col w-full">
      <h3 [attr.id]="podcast.name" class="text-xl font-bold" itemprop="title">
        {{ podcast.name }}
      </h3>
      <app-event-tag [name]="podcast.language" />
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
export class PodcastLiteCardComponent {
  @Input({ required: true }) podcast!: Podcast;
}
