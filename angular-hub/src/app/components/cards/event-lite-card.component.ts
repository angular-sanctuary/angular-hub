import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Event } from '../../models/event.model';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { EventTagComponent } from '../event-tag.component';

@Component({
  selector: 'app-event-lite-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="flex flex-col w-full">
      <div class="flex flex-wrap items-center">
        <h3
          [attr.id]="event.title"
          class="text-xl font-bold mr-2"
          itemprop="title"
        >
          {{ event.title }}
        </h3>
        <span class="text-gray-500 dark:text-gray-400" itemprop="location">{{
          event.location
        }}</span>
      </div>
      <div class="flex flex-wrap items-center">
        <span class="font-bold text-primary mr-4" itemprop="date">{{
          event.date | date
        }}</span>
        <ul class="flex flex-wrap gap-2">
          <li class="inline">
            <app-event-tag [name]="event.language" />
          </li>
          @for (tag of event.tags; track tag) {
            <li class="inline">
              <app-event-tag [name]="tag" />
            </li>
          }
        </ul>
      </div>
    </article>
  `,
  imports: [DatePipe, NgOptimizedImage, EventTagComponent],
  styles: [
    `
      :host {
        display: block;
        padding-block: 0.5rem;
      }
    `,
  ],
})
export class EventLiteCardComponent {
  @Input({ required: true }) event!: Event;
}
