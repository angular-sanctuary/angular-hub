import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Event } from '../models/event.model';
import { ContentFile } from '@analogjs/content';
import { DatePipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { EventTagComponent } from './event-tag.component';

@Component({
  selector: 'app-event-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="flex w-full items-center gap-4">
      <img
        class="rounded-xl"
        [ngSrc]="event.attributes.logo"
        height="80"
        width="80"
        alt=""
      />
      <div class="text-start">
        <span class="font-bold text-primary" itemprop="date">{{
          event.attributes.date | date
        }}</span>
        <h3
          [attr.id]="event.attributes.title"
          class="text-xl font-bold"
          itemprop="title"
        >
          {{ event.attributes.title }}
        </h3>
        <span class="text-gray-500" itemprop="location">{{
          event.attributes.location
        }}</span>
        <ul class="flex gap-2">
          <li class="inline">
            <app-event-tag [name]="event.attributes.language" />
          </li>
          <li *ngFor="let tag of event.attributes.tags" class="inline">
            <app-event-tag [name]="tag" />
          </li>
        </ul>
      </div>
    </article>
  `,
  imports: [DatePipe, NgOptimizedImage, NgIf, NgForOf, EventTagComponent],
  styles: [
    `
      :host {
        display: block;
        padding-block: 0.5rem;
      }
    `,
  ],
})
export class EventCardComponent {
  @Input({ required: true }) event!: ContentFile<Event>;
}
