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
    <h4 class="text-xl font-bold my-1">
      {{ event().name }}
    </h4>
    <div class="flex gap-4 mb-2">
      <div class="flex justify-center items-center w-20 h-20">
        <img
          class="rounded-xl"
          [src]="event().community?.logo"
          aria-hidden="true"
          height="70"
          width="70"
          alt=""
        />
      </div>
      <div class="flex-1">
        <span class="font-bold text-primary" itemprop="date">
          {{ event().date }}
          {{ event().endDate ? '- ' + event().endDate : '' }}
        </span>
        <div
          class="flex-1 text-gray-500 dark:text-gray-400 min-h-4"
          itemprop="location"
        >
          {{ event().location ?? 'Online' }}
          @if (isRemoteFriendly() && event().location) {
            <span>- Online</span>
          }
        </div>
        <ul class="flex tags">
          @if (!event().isFree) {
            <li
              class="flex items-center justify-center gap-1 bg-[#20212C] border-[#3e4056] border-2 rounded px-2 py-1 text-sm"
            >
              <i class="pi pi-dollar text-sm" aria-hidden="true"></i>
              admission fee
            </li>
          }
          @if (event().language !== 'English') {
            <li
              class="flex items-center justify-center gap-1 bg-[#20212C] border-[#3e4056] border-2 rounded px-2 py-1 text-sm"
            >
              <i class="pi pi-language text-sm" aria-hidden="true"></i>
              {{ event().language }}
            </li>
          }
        </ul>
      </div>
    </div>
  `,
  imports: [DatePipe, NgOptimizedImage, TagComponent],
})
export class EventCardComponent {
  event = input.required<Event>();

  eventLinkTitle = computed(() => {
    return (this.event().name || this.event().community?.name) + 'event link';
  });

  isRemoteFriendly = computed(() => {
    return this.event().isRemote;
  });
}
