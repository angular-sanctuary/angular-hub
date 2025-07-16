import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { CommunityEvent } from '../../../models/community-event.model';

@Component({
  selector: 'app-event-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article
      class="rounded-2xl drop-shadow-xl p-6 bg-white dark:bg-gray-800 h-full flex flex-col gap-4"
    >
      <header class="flex items-start justify-between gap-2">
        <h2 class="text-lg font-bold">{{ event().name }}</h2>
        <span
          class="text-sm bg-[#26A0D9] text-white dark:text-gray-900 px-2 py-1 rounded-lg"
          >{{ event().type }}</span
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
      <p class="text-sm flex-1">{{ event().description }}</p>
      <footer class="flex flex-col gap-2">
        <div
          class="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-2xl"
        >
          @if (!event().isFree) {
            <div class="flex flex-col">
              <div class="text-sm text-gray-500 dark:text-gray-200" i18n="@@event-card.starting-from">
                Starting from
              </div>
              <div class="font-bold text-[#26A0D9] flex items-end gap-1">
                @if (event().startingPrice) {
                  <span class="text-sm pb-1">
                    {{ event().currency }}
                  </span>
                  <span class="text-2xl"> {{ event().startingPrice }}* </span>
                } @else {
                  <ng-container i18n="@@event-card.tba">
                    To be announced
                  </ng-container>
                }
              </div>
            </div>
          } @else {
            <div class="flex flex-col">
              <div class="text-sm text-gray-500 dark:text-gray-200" i18n="@@event-card.registration">
                Registration
              </div>
              <div class="font-bold text-2xl text-[#26A0D9]" i18n="@@event-card.fee">Free</div>
            </div>
          }
          @if (event().attendeesCount) {
            <div class="flex flex-col items-center">
              <div class="text-sm text-gray-500" i18n="@@event-card.attendees">Attendees</div>
              <div class="text-sm font-bold">{{ event().attendeesCount }}</div>
            </div>
          }
        </div>
        @if (event().url) {
          <a
            [href]="event().url"
            target="_blank"
            class="w-full flex items-center justify-center text-sm bg-[#26A0D9] text-white p-2 rounded-lg"
            i18n="@@event-card.register-now"
          >
            Register now
          </a>
        } @else {
          <div
            class="w-full flex items-center justify-center text-sm bg-gray-200 p-2 rounded-lg dark:text-gray-900"
            i18n="@@event-card.no-registration"
          >
            No registration available
          </div>
        }
        <a
          [href]="event().organizer.url"
          target="_blank"
          class="flex items-center gap-2 text-xs hover:underline hover:text-[#26A0D9]"
        >
          <span i18n="@@event-card.organized-by">Organized by</span>
          <div
            class="w-6 h-6 rounded-full p-1 bg-gray-100 flex items-center justify-center"
          >
            <img
              [ngSrc]="event().organizer.logo"
              class="w-6"
              alt=""
              width="24"
              height="24"
            />
          </div>
          <span>{{ event().organizer.name }}</span>
        </a>
      </footer>
    </article>
  `,
  imports: [DatePipe, NgOptimizedImage],
})
export class EventCard {
  event = input.required<CommunityEvent>();

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
