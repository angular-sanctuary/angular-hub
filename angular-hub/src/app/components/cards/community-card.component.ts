import { DatePipe, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Community } from '../../../models/community.model';

@Component({
  selector: 'app-community-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, TitleCasePipe, DatePipe],
  template: `
    <article class="bg-[#20212C] px-6 pt-8 pb-4 rounded-xl relative">
      <div class="absolute type">
        <span
          class="font-medium text-sm text-black bg-slate-400 rounded p-1 mr-4"
          itemprop="type"
          >{{ community().type | titlecase }}</span
        >
        @if (upcomingEventLength() > 0) {
          <span
            class="font-medium text-sm text-black bg-green-100 rounded p-1"
            itemprop="type"
          >
            {{ upcomingEventLength() }} upcoming event(s)
          </span>
        }
        @if (inactive()) {
          <span
            class="font-medium text-sm text-black bg-orange-200 rounded p-1"
            itemprop="type"
          >
            inactive since {{ inactiveSince() | date: 'MMMM y' }}
          </span>
        }
      </div>
      <div class="flex items-start md:items-center gap-6">
        <img
          class="rounded-xl"
          [src]="community().logo"
          height="60"
          width="60"
          alt=""
        />
        <div class="flex-1">
          <h3 class="text-xl font-bold" itemprop="title">
            {{ community().name }}
          </h3>
          <span class="text-gray-500 dark:text-gray-400" itemprop="location">{{
            community().location
          }}</span>
        </div>
        <div class="hidden md:flex gap-4 ml-6">
          @if (community().eventsUrl) {
            <a
              class="rounded-xl bg-[#344255] hover:bg-[#4C5765] p-2"
              [attr.href]="community().eventsUrl"
              target="_blank"
              title="events URL"
            >
              <img
                ngSrc="/assets/icons/event-icon.svg"
                alt=""
                height="30"
                width="30"
              />
            </a>
          }
          @if (community().websiteUrl) {
            <a
              class="rounded-xl bg-[#344255] hover:bg-[#4C5765] p-2"
              [attr.href]="community().websiteUrl"
              target="_blank"
              title="website URL"
            >
              <img
                ngSrc="/assets/icons/website_link-icon.svg"
                alt=""
                height="30"
                width="30"
              />
            </a>
          }
          @if (community().organizersUrl) {
            <a
              class="rounded-xl bg-[#344255] hover:bg-[#4C5765] p-2"
              [attr.href]="community().organizersUrl"
              target="_blank"
              title="organizers URL"
            >
              <img
                ngSrc="/assets/icons/group-icon.svg"
                alt=""
                height="30"
                width="30"
              />
            </a>
          }
          @if (community().youtubeUrl) {
            <a
              class="rounded-xl bg-[#344255] hover:bg-[#4C5765] p-2"
              [attr.href]="community().youtubeUrl"
              target="_blank"
              title="YouTube URL"
            >
              <img
                ngSrc="/assets/icons/youtube-icon.svg"
                alt=""
                height="30"
                width="30"
              />
            </a>
          }
          @if (community().blueskyUrl) {
            <a
              class="rounded-xl bg-[#344255] hover:bg-[#4C5765] p-2"
              [attr.href]="community().blueskyUrl"
              target="_blank"
              title="Bluesky URL"
            >
              <img
                ngSrc="/assets/icons/bluesky-icon.svg"
                alt=""
                height="30"
                width="30"
              />
            </a>
          }
          @if (community().xUrl) {
            <a
              class="rounded-xl bg-[#344255] hover:bg-[#4C5765] p-2"
              [attr.href]="community().xUrl"
              target="_blank"
              title="X URL"
            >
              <img
                ngSrc="/assets/icons/x-twitter-icon.svg"
                alt=""
                height="30"
                width="30"
              />
            </a>
          }
          @if (community().linkedinUrl) {
            <a
              class="rounded-xl bg-[#344255] hover:bg-[#4C5765] p-2"
              [attr.href]="community().linkedinUrl"
              target="_blank"
              title="LinkedIn URL"
            >
              <img
                ngSrc="/assets/icons/linkedin-icon.svg"
                alt=""
                height="30"
                width="30"
              />
            </a>
          }
        </div>
      </div>
      <div class="flex justify-end md:hidden gap-4 mt-4">
        @if (community().eventsUrl) {
          <a
            class="rounded-xl bg-[#344255] p-2"
            [attr.href]="community().eventsUrl"
            target="_blank"
            title="events URL"
          >
            <img
              ngSrc="/assets/icons/event-icon.svg"
              alt=""
              height="20"
              width="20"
            />
          </a>
        }
        @if (community().websiteUrl) {
          <a
            class="rounded-xl bg-[#344255] p-2"
            [attr.href]="community().websiteUrl"
            target="_blank"
            title="website URL"
          >
            <img
              ngSrc="/assets/icons/website_link-icon.svg"
              alt=""
              height="20"
              width="20"
            />
          </a>
        }
        @if (community().organizersUrl) {
          <a
            class="rounded-xl bg-[#344255] p-2"
            [attr.href]="community().organizersUrl"
            target="_blank"
            title="organizers URL"
          >
            <img
              ngSrc="/assets/icons/group-icon.svg"
              alt=""
              height="20"
              width="20"
            />
          </a>
        }
        @if (community().youtubeUrl) {
          <a
            class="rounded-xl bg-[#344255] p-2"
            [attr.href]="community().youtubeUrl"
            target="_blank"
            title="YouTube URL"
          >
            <img
              ngSrc="/assets/icons/youtube-icon.svg"
              alt=""
              height="20"
              width="20"
            />
          </a>
        }
        @if (community().blueskyUrl) {
          <a
            class="rounded-xl bg-[#344255] p-2"
            [attr.href]="community().blueskyUrl"
            target="_blank"
            title="Bluesky URL"
          >
            <img
              ngSrc="/assets/icons/bluesky-icon.svg"
              alt=""
              height="20"
              width="20"
            />
          </a>
        }
        @if (community().xUrl) {
          <a
            class="rounded-xl bg-[#344255] p-2"
            [attr.href]="community().xUrl"
            target="_blank"
            title="events URL"
          >
            <img
              ngSrc="/assets/icons/x-twitter-icon.svg"
              alt=""
              height="20"
              width="20"
            />
          </a>
        }
        @if (community().linkedinUrl) {
          <a
            class="rounded-xl bg-[#344255] p-2"
            [attr.href]="community().linkedinUrl"
            target="_blank"
          >
            <img
              ngSrc="/assets/icons/linkedin-icon.svg"
              alt=""
              height="20"
              width="20"
            />
          </a>
        }
      </div>
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
export class CommunityCardComponent {
  community = input.required<Community>();

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
}
