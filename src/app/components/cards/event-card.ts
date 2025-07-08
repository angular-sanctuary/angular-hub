import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Event } from '../../../models/event.model';
import { DatePipe } from '@angular/common';

/*
<div class="flex flex-col sm:flex-row items-start sm:items-center">
      <div
        class="flex sm:flex-col font-bold text-primary sm:min-w-28 gap-4 sm:gap-0"
        itemprop="date"
      >
        @if (!event().toBeAnnounced) {
          <span>{{ formatDate(event().date) }}</span>
          @let endDate = event().endDate;
          @if (endDate) {
            <span>{{ formatDate(endDate) }}</span>
          }
        } @else {
          <span>TBA</span>
        }
      </div>
      <div class="flex-1 flex items-center">
        <div class="flex items-center w-20 h-20">
          <img
            class="rounded-xl"
            [src]="event().community?.logo"
            aria-hidden="true"
            height="50"
            width="50"
            alt=""
          />
        </div>
        <div class="flex-1">
          <h4 class="sm:text-xl font-bold my-1">
            {{ event().name }}
          </h4>

          <div
            class="flex-1 text-gray-500 dark:text-gray-400 min-h-4"
            itemprop="location"
          >
            {{ event().location ?? 'Online' }}
            @if (isRemoteFriendly() && event().location) {
              <span>- Online</span>
            }
          </div>
        </div>
      </div>
    </div>
    */

@Component({
  selector: 'app-event-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article
      class="rounded-2xl drop-shadow-xl p-6 bg-white h-full flex flex-col gap-4"
    >
      <header class="flex items-start justify-between">
        <h2 class="text-lg font-bold">{{ event().name }}</h2>
        <span class="text-sm bg-[#26A0D9] text-white px-2 py-1 rounded-lg"
          >Conference</span
        >
      </header>
      <ul class="flex flex-col gap-2">
        <li class="flex items-center gap-2">
          <i class="pi pi-calendar text-2xl text-[#BF25B9]"></i>
          <span class="text-sm">{{
            event().date | date: 'dd MMM' : 'en-US'
          }}</span>
          @if (event().endDate) {
            <span class="text-sm">{{
              event().endDate | date: 'dd MMM' : 'en-US'
            }}</span>
          }
        </li>
        <li class="flex items-center gap-2">
          <i class="pi pi-map-marker text-2xl text-[#BF25B9]"></i>
          <span class="text-sm">{{ event().location ?? 'Online' }}</span>
        </li>
      </ul>
      <p class="text-sm flex-1">
        Europe's premier Angular conference with world-class speakers
      </p>
      <footer class="flex flex-col gap-2">
        <div
          class="flex items-center justify-between bg-gray-50 p-4 rounded-2xl"
        >
          <div class="font-bold text-2xl text-[#26A0D9]">$200</div>
          <div class="flex flex-col items-center">
            <div class="text-sm text-gray-500">Attendees</div>
            <div class="text-sm font-bold">100</div>
          </div>
        </div>
        <a
          [href]="event().url"
          target="_blank"
          class="w-full flex items-center justify-center text-sm bg-[#26A0D9] text-white p-2 rounded-lg"
        >
          Register now
        </a>
        <a
          [href]="event().community?.xUrl"
          target="_blank"
          class="flex items-center gap-2 text-xs hover:underline hover:text-[#26A0D9]"
        >
          <span>Organized by</span>
          <div
            class="w-6 h-6 rounded-full p-1 bg-gray-100 flex items-center justify-center"
          >
            <img [src]="event().community?.logo" class="w-6" alt="" />
          </div>
          <span>{{ event().community?.name }}</span>
        </a>
      </footer>
    </article>
  `,
  imports: [DatePipe],
})
export class EventCard {
  event = input.required<Event>();

  eventLinkTitle = computed(() => {
    return (this.event().name || this.event().community?.name) + 'event link';
  });

  isRemoteFriendly = computed(() => {
    return this.event().isRemote;
  });

  formatDate(date: string): string | null {
    if (!date) return '';
    // Check if the date includes a day component (YYYY-MM-DD)
    if (date.length > 7) {
      return new DatePipe('en-US').transform(date, 'dd MMM');
    }
    // For YYYY-MM format, show only month
    return new DatePipe('en-US').transform(date + '-01', 'MMM');
  }
}
