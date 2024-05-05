import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { PodcastCardComponent } from '../../components/cards/podcast-card.component';
import { injectLoad, RouteMeta } from '@analogjs/router';
import { HeaderService } from '../../services/header.service';

import { load } from './index.server';

export const routeMeta: RouteMeta = {
  meta: [
    {
      name: 'description',
      content: 'Curated list of Angular Talks',
    },
  ],
  data: {
    header: 'Podcasts',
  },
};

@Component({
  selector: 'app-podcasts',
  standalone: true,
  imports: [PodcastCardComponent, FormsModule],
  template: `
    <aside
      class="h-36 w-full flex flex-col justify-center items-center mb-8"
      style="background-image: url(/assets/images/img.png); background-repeat: no-repeat; background-size: cover;"
    >
      <h1 class="title text-5xl">ANGULAR HUB</h1>
      <h2 class="text-2xl">Curated list of Angular Podcasts</h2>
    </aside>

    <ul class="flex flex-wrap justify-center gap-x-8 gap-y-4 px-8">
      @for (podcast of podcasts(); track podcast.name) {
        <li>
          <app-podcast-card [podcast]="podcast"></app-podcast-card>
        </li>
      }
    </ul>
  `,
  styles: `
    .active {
      background-color: #BF25B9;
      color: white;
      border-radius: 0.5rem;
    }
  `,
})
export default class PodcastsComponent {
  podcasts = toSignal(injectLoad<typeof load>(), { requireSync: true });

  @Input() set header(header: string) {
    this.headerService.setHeaderTitle(header);
  }

  constructor(private headerService: HeaderService) {}
}
