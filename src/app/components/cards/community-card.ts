import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Community } from '../../../models/community.model';

@Component({
  selector: 'app-community-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article
      class="rounded-2xl drop-shadow-xl p-6 bg-white h-full flex flex-col gap-4"
    >
      <header class="flex items-start gap-4">
        <div class="flex items-center gap-2 bg-gray-100 p-2 rounded-lg">
          <img [src]="community().logo" class="w-10" alt="" />
        </div>
        <div class="flex flex-col gap-1">
          <h2 class="text-lg font-bold">{{ community().name }}</h2>
          <div class="flex items-center gap-1 text-sm text-gray-600">
            <i class="pi pi-globe" style="font-size: 0.8rem"></i>
            <span>{{ community().location ?? 'Online' }}</span>
          </div>
        </div>
      </header>
      <p class="text-sm">
        Europe's premier Angular conference with world-class speakers
      </p>
      <ul class="flex flex-col gap-2 flex-1">
        @if (community().eventsUrl) {
          <li>
            <a
              [href]="community().eventsUrl"
              target="_blank"
              class="text-sm hover:underline flex items-center gap-2"
            >
              <i class="pi pi-calendar text-2xl text-[#BF25B9]"></i>
              <span>Events</span>
            </a>
          </li>
        }
        @if (community().organizersUrl) {
          <li>
            <a
              [href]="community().organizersUrl"
              target="_blank"
              class="text-sm hover:underline flex items-center gap-2"
            >
              <i class="pi pi-users text-2xl text-[#0077B5]"></i>
              <span>Organizers</span>
            </a>
          </li>
        }
        @if (community().websiteUrl) {
          <li>
            <a
              [href]="community().websiteUrl"
              target="_blank"
              class="text-sm hover:underline flex items-center gap-2"
            >
              <i class="pi pi-globe text-2xl text-[#0077B5]"></i>
              <span>Website</span>
            </a>
          </li>
        }
        @if (community().linkedinUrl) {
          <li>
            <a
              [href]="community().linkedinUrl"
              target="_blank"
              class="text-sm hover:underline flex items-center gap-2"
            >
              <i class="pi pi-linkedin text-2xl text-[#0077B5]"></i>
              <span>LinkedIn</span>
            </a>
          </li>
        }
        @if (community().xUrl) {
          <li>
            <a
              [href]="community().xUrl"
              target="_blank"
              class="text-sm hover:underline flex items-center gap-2"
            >
              <i class="pi pi-twitter text-2xl text-[#000000]"></i>
              <span>Twitter</span>
            </a>
          </li>
        }
        @if (community().youtubeUrl) {
          <li>
            <a
              [href]="community().youtubeUrl"
              target="_blank"
              class="text-sm hover:underline flex items-center gap-2"
            >
              <i class="pi pi-youtube text-2xl text-[#FF0000]"></i>
              <span>YouTube</span>
            </a>
          </li>
        }
      </ul>

      <footer class="flex flex-col gap-2">
        <a
          [href]="community().eventsUrl"
          target="_blank"
          class="w-full flex items-center justify-center text-sm bg-[#26A0D9] text-white p-2 rounded-lg"
        >
          Join the community
        </a>
      </footer>
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
        padding-block: 0.5rem;
      }

      .type {
        top: -0.7rem;
        left: 1.2rem;
      }
    `,
  ],
})
export class CommunityCard {
  community = input.required<Community>();

  /*

  upcomingEventLength = computed(() => {
    return this.community().events?.filter(
      (event) => new Date(event.date).getTime() > new Date().getTime(),
    ).length;
  });

  inactive = computed(() => {
    const inactivityLimit = new Date();
    inactivityLimit.setMonth(inactivityLimit.getMonth() - 6);

    const newestEvent = this.community().events?.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )[0];

    return newestEvent
      ? new Date(newestEvent.date).getTime() < inactivityLimit.getTime() &&
          this.community().type === 'meetup'
      : false;
  });

  inactiveSince = computed(() => {
    const event = this.community().events?.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )[0];

    return event ? new Date(event.date) : null;
  });
  */
}
