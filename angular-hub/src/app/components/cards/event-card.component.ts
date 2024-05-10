import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Event } from '../../../models/event.model';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { TagComponent } from '../tag.component';

@Component({
  selector: 'app-event-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article>
      <a
        [href]="event().url ?? '#'"
        [title]="eventLinkTitle()"
        target="_blank"
        class="flex w-full items-start gap-4"
      >
        <img
          class="rounded-xl"
          [src]="event().community?.logo"
          aria-hidden="true"
          height="100"
          width="100"
          alt=""
        />

        <div class="text-start">
          <span class="font-bold text-primary" itemprop="date">{{
            event().date
          }}</span>
          <h3 class="text-xl font-bold">
            {{ event().name || event().community?.name }}
          </h3>
          <div
            class="text-gray-500 dark:text-gray-400 min-h-4"
            itemprop="location"
          >
            {{ event().location }}
          </div>
          <ul class="flex flex-wrap gap-2">
            <li class="inline">
              <app-tag [title]="event().language" />
            </li>
            @if (event().isFree) {
              <li class="inline">
                <app-tag [title]="'Free'" color="#629632" />
              </li>
            }
            @if (event().isRemote) {
              <li class="inline">
                <app-tag [title]="'Remote'" color="#328496" />
              </li>
            }
            @if (event().isOnsite) {
              <li class="inline">
                <app-tag [title]="'Onsite'" color="#ae6b09" />
              </li>
            }
          </ul>
        </div>
      </a>
    </article>
  `,
  imports: [DatePipe, NgOptimizedImage, TagComponent],
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
export class EventCardComponent {
  event = input.required<Event>();

  eventLinkTitle = computed(() => {
    return (this.event().name || this.event().community?.name) + 'event link';
  });
}
