import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Event } from '../../models/event.model';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { EventTagComponent } from '../event-tag.component';

@Component({
  selector: 'app-event-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="flex w-full items-center gap-4">
      <img
        class="rounded-xl"
        [src]="event.community.logo"
        height="80"
        width="80"
        alt=""
      />
      <div class="text-start">
        <span class="font-bold text-primary" itemprop="date">{{
          event.date
        }}</span>
        <h3 [attr.id]="event.name" class="text-xl font-bold" itemprop="title">
          {{ event.name || event.community.name }}
        </h3>
        <span class="text-gray-500 dark:text-gray-400" itemprop="location">{{
          event.location
        }}</span>
        <ul class="flex gap-2">
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
export class EventCardComponent {
  @Input({ required: true }) event!: Event;
}
