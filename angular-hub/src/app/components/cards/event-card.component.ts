import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Event } from '../../../models/event.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col sm:flex-row items-start sm:items-center">
      <div
        class="flex sm:flex-col font-bold text-primary sm:min-w-28 gap-4 sm:gap-0"
        itemprop="date"
      >
        <span>{{ formatDate(event().date) }}</span>
        @let endDate = event().endDate;
        @if (endDate) {
          <span>{{ formatDate(endDate) }}</span>
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
          <!--
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
        -->
        </div>
      </div>
    </div>
  `,
  imports: [DatePipe],
})
export class EventCardComponent {
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
