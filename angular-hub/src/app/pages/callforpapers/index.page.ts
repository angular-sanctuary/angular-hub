import { Component } from '@angular/core';
import { load } from './index.server';
import { toSignal } from '@angular/core/rxjs-interop';
import { injectLoad, RouteMeta } from '@analogjs/router';
import { DividerModule } from 'primeng/divider';
import { Title } from '@angular/platform-browser';
import { JsonLdService } from '../../services/json-ld.service';
import { BannerComponent } from '../../components/banner.component';
import { DatePipe } from '@angular/common';

export const routeMeta: RouteMeta = {
  meta: [
    {
      name: 'description',
      content: 'Curated list of Angular Calls for papers',
    },
  ],
};

@Component({
  selector: 'app-callforpapers',
  standalone: true,
  template: `
    <app-banner description="Curated list of Angular Calls for Papers" />
    <div class="px-6">
      <h3 class="text-2xl font-bold mb-6 pl-4">Events</h3>
      <ul
        class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-center gap-8"
      >
        @for (event of callForPapers().events; track event.name) {
          <li class="group min-w-80">
            <a
              class="flex flex-col bg-gray-800 p-4 rounded-xl"
              [href]="event.callForPapersUrl"
              target="_blank"
            >
              <h4 class="text-xl font-bold mb-4 group-hover:text-secondary">
                {{ event.name }}
              </h4>
              <div class="flex items-start gap-4">
                <img
                  class="rounded-xl"
                  [src]="event.logo"
                  height="100"
                  width="100"
                  alt=""
                />
                <div>
                  <dl>
                    <dt><i class="pi pi-calendar-clock"></i> Date</dt>
                    <dd class="ml-5 opacity-65">{{ event.date ?? 'TBD' }}</dd>
                    <!--
                    <dt><i class="pi pi-calendar-clock"></i> End date</dt>
                    <dd class="ml-5 opacity-65">{{ event.date }}</dd>
                    -->
                    <dt><i class="pi pi-map-marker"></i> Location</dt>
                    <dd class="ml-5 opacity-65">
                      {{ event.location ?? 'Online' }}
                    </dd>
                  </dl>
                </div>
              </div>
              <p-divider />
              <div class="text-center">
                <div class="opacity-65">CFP due date</div>
                <div class="text-2xl font-bold">
                  {{ event.callForPapersDueDate | date: 'dd MMM' : 'en-US' }}
                </div>
              </div>
            </a>
          </li>
        } @empty {
          <li>No open call for papers found</li>
        }
      </ul>
      <p-divider />
      <h3 class="text-2xl font-bold my-6 pl-4">Communities</h3>
      <ul
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center gap-8"
      >
        @for (community of callForPapers().communities; track community.name) {
          <li class="group min-w-80">
            <a
              class="flex flex-col bg-gray-800 p-4 rounded-xl"
              [href]="community.callForPapersUrl"
              target="_blank"
            >
              <h4 class="text-xl font-bold mb-4 group-hover:text-secondary">
                {{ community.name }}
              </h4>
              <div class="flex items-start gap-4">
                <img
                  class="rounded-xl"
                  [src]="community.logo"
                  height="100"
                  width="100"
                  alt=""
                />
                <div class="flex items-center gap-2">
                  <i class="pi pi-map-marker"></i>
                  <div class="opacity-65">
                    {{ community.location ?? 'Online' }}
                  </div>
                </div>
              </div>
            </a>
          </li>
        } @empty {
          <li>No open call for papers found</li>
        }
      </ul>
    </div>
  `,
  imports: [DividerModule, BannerComponent, DatePipe],
})
export default class CallForPapersComponent {
  callForPapers = toSignal(injectLoad<typeof load>(), { requireSync: true });

  constructor(
    private title: Title,
    private jsonldService: JsonLdService,
  ) {
    this.title.setTitle('Angular HUB - Call for papers');
    this.jsonldService.updateJsonLd(this.setJsonLd());
  }

  setJsonLd() {
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: [
        ...this.callForPapers().events.map((event, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Event',
            name: event.name,
            description: event.name,
            startDate: event.date,
            location: event.location,
            url: event.callForPapersUrl,
          },
        })),
        ...this.callForPapers().communities.map((community, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Organization',
            name: community.name,
            description: community.name,
            location: community.location,
            url: community.callForPapersUrl,
          },
        })),
      ],
    };
  }
}
