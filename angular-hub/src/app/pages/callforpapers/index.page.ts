import { Component } from '@angular/core';
import { load } from './index.server';
import { toSignal } from '@angular/core/rxjs-interop';
import { injectLoad } from '@analogjs/router';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-callforpapers',
  standalone: true,
  template: `
    <aside
      class="h-36 w-full flex flex-col justify-center items-center mb-4 md:mb-8 bg-no-repeat bg-auto md:bg-cover px-4"
      style="background-image: url(/assets/images/hero.webp);"
    >
      <h1 class="title text-4xl sm:text-5xl">ANGULAR HUB</h1>
      <h2 class="text-2xl text-center">Curated list of Call for Papers</h2>
    </aside>

    <h3 class="text-2xl font-bold mb-6">Events</h3>
    <ul
      class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center gap-8"
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
                  <dt><i class="pi pi-calendar-clock"></i> Start date</dt>
                  <dd class="ml-5 opacity-65">{{ event.date }}</dd>
                  <dt><i class="pi pi-calendar-clock"></i> End date</dt>
                  <dd class="ml-5 opacity-65">{{ event.date }}</dd>
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
                {{ event.callForPapersDueDate }}
              </div>
            </div>
          </a>
        </li>
      } @empty {
        <li>No open call for papers found</li>
      }
    </ul>
    <p-divider />
    <h3 class="text-2xl font-bold my-6">Communities</h3>
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
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `,
  ],
  imports: [DividerModule],
})
export default class CallForPapersComponent {
  callForPapers = toSignal(injectLoad<typeof load>(), { requireSync: true });
}
