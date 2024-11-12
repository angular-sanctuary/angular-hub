import { afterNextRender, Component, signal } from '@angular/core';
import { RouteMeta } from '@analogjs/router';
import { BannerComponent } from '../../components/banner.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

type WatchParty = {
  location: string;
  host: string;
  organizer: string;
  link: string;
};

export const routeMeta: RouteMeta = {
  meta: [
    {
      name: 'description',
      content: 'Curated list of Angular Events',
    },
    {
      property: 'og:title',
      content: 'Curated list of Angular Events',
    },
    {
      property: 'og:image',
      content: '/api/v1/og-image',
    },
    {
      name: 'twitter:image',
      content: '/api/v1/og-image',
    },
  ],
};

@Component({
  selector: 'app-events',
  standalone: true,
  template: `
    <app-banner
      title="Watch parties"
      description="Find Angular release watch parties near you and join the community for the latest updates!"
    />
    <!-- TODO add scrollbar-gutter stable for md + -->
    <div class="flex flex-col px-6 gap-6">
      <aside class="rounded-md bg-[#20212C] p-4 flex items-center gap-6 w-full">
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

      @if (show()) {
        <div class="card">
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
  imports: [
    BannerComponent,
    TableModule,
    DialogModule,
    Button,
    InputTextModule,
  ],
})
export default class EventsComponent {
  show = signal(false);
  // TODO: Replace with proper json file
  parties: WatchParty[] = [
    {
      location: 'Nantes, France',
      host: 'SFEIR',
      organizer: 'Angular Devs France',
      link: 'https://www.eventbrite.fr/e/watch-party-release-angular-19-nantes-tickets-1077228512479',
    },
    {
      location: 'Tours, France',
      host: 'APSIDE',
      organizer: 'Angular Devs France',
      link: 'https://www.eventbrite.com/e/watch-party-release-angular-19-tours-tickets-1077229665929',
    },
    {
      location: 'Paris, France',
      host: 'Akur8',
      organizer: 'William Marques',
      link: 'https://www.eventbrite.fr/e/billets-watch-party-release-angular-19-paris-1076981654119',
    },
    {
      location: 'Online',
      host: '',
      organizer: 'Buenos Aires GDG',
      link: 'https://gdg.community.dev/events/details/google-gdg-buenos-aires-presents-watch-party-angular-v19/',
    },
    {
      location: 'Singapore',
      host: 'Ascenda',
      organizer: 'Angular Singapore',
      link: 'https://docs.google.com/forms/d/e/1FAIpQLSd8FH1RvB-f9NuxCb8JADgg2Fpd22kaQvtsGCIC8UVfiQJxoQ/viewform',
    },
  ];

  constructor() {
    afterNextRender(() => {
      this.show.set(true);
    });
  }
}
