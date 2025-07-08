import { afterNextRender, Component, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Banner } from '../components/banner';

type WatchParty = {
  location: string;
  host: string;
  organizer: string;
  link: string;
};

export const routeMeta = {
  meta: [
    {
      name: 'description',
      content: 'Angular release watch parties',
    },
    {
      property: 'og:title',
      content: 'Angular release watch parties',
    },
    {
      property: 'og:image',
      content: '/assets/images/og-image.webp',
    },
    {
      name: 'twitter:image',
      content: '/assets/images/og-image.webp',
    },
  ],
};

@Component({
  template: `
    <app-banner
      title="Watch parties"
      description="Angular release watch parties around the world"
    />
    <!-- TODO add scrollbar-gutter stable for md + -->
    <div class="flex flex-col px-6 gap-6">
      <aside
        class="rounded-md bg-[#20212C] p-4 flex flex-col-reverse md:flex-row items-center gap-6 w-full"
      >
        <a
          target="_blank"
          href="https://github.com/angular-sanctuary/angular-hub/issues/384"
          class="highlighted-btn rounded py-2 px-4 text-slate-100 w-48"
        >
          Share your party!
        </a>
        <span>
          Hosting a watch party for the Angular release? Share it with the
          community! Announce your event here and connect with fellow Angular
          enthusiasts.
        </span>
      </aside>

      <ul class="md:hidden flex flex-col gap-2">
        @for (party of parties; track party.link) {
          <li class="bg-[#20212C] px-6 pt-8 pb-4 rounded-xl">
            <a [href]="party.link">
              <h3 class="text-xl font-bold mb-2">{{ party.location }}</h3>
              @if (party.host) {
                <p class="pl-2">hosted by {{ party.host }}</p>
              }
              <p class="pl-2">organized by {{ party.organizer }}</p>
            </a>
          </li>
        }
      </ul>

      @if (show()) {
        <div class="card hidden md:block">
          <p-table [value]="parties" [tableStyle]="{ 'min-width': '50rem' }">
            <ng-template pTemplate="header">
              <tr>
                <th>Location</th>
                <th>Host</th>
                <th>Organizer</th>
                <th></th>
              </tr>
            </ng-template>
            <ng-template pTemplate="body" let-party>
              <tr>
                <td>{{ party.location }}</td>
                <td>{{ party.host }}</td>
                <td>{{ party.organizer }}</td>
                <td>
                  <a
                    type="button"
                    target="_blank"
                    [href]="party.link"
                    class="rounded py-2 px-4 bg-slate-500 w-48"
                  >
                    Join
                  </a>
                </td>
              </tr>
            </ng-template>
          </p-table>
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: stretch;
      }

      .highlighted-btn {
        background: rgb(191, 37, 185);
      }
    `,
  ],
  imports: [Banner, TableModule, DialogModule, InputTextModule],
})
export default class WatchPartiesPage {
  show = signal(false);
  // TODO: Replace with proper json file
  parties: WatchParty[] = [
    {
      location: 'Roma, Italy',
      host: 'David Passafaro',
      organizer: 'NG Rome',
      link: 'https://www.eventbrite.it/e/biglietti-angular-v20-release-watch-party-1370987904729',
    },
    {
      location: 'Online',
      host: '',
      organizer: 'Angular Community Meetup',
      link: 'https://www.meetup.com/angularcommunity/events/307613608',
    },
    {
      location: 'Online (Spanish)',
      host: '',
      organizer: 'Angular Community Meetup',
      link: 'https://www.meetup.com/angularcommunity/events/307613725',
    },
    {
      location: 'Online',
      host: '',
      organizer: 'Santosh Yadav',
      link: 'https://www.youtube.com/watch?v=spiuVrYa7v8',
    },
    {
      location: 'Online',
      host: '',
      organizer: 'Muhammad Ahsan Ayaz',
      link: 'https://www.youtube.com/watch?v=zlCGsg7FgIY',
    },
  ];

  constructor() {
    afterNextRender(() => {
      this.show.set(true);
    });
  }
}
