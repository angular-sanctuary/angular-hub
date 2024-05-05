import { Component, Input } from '@angular/core';
import { CommunityCardComponent } from '../../components/cards/community-card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { injectLoad, RouteMeta } from '@analogjs/router';
import { HeaderService } from '../../services/header.service';
import { load } from './index.server';

export const routeMeta: RouteMeta = {
  title: 'ANGULAR HUB - Curated list of Angular communities',
  meta: [
    {
      name: 'description',
      content: 'Curated list of Angular communities',
    },
  ],
  data: {
    header: 'Communities',
  },
};

@Component({
  selector: 'app-communities',
  standalone: true,
  imports: [CommunityCardComponent],
  template: `
    <aside
      class="h-36 w-full flex flex-col justify-center items-center mb-8"
      style="background-image: url(/assets/images/img.png); background-repeat: no-repeat; background-size: cover;"
    >
      <h1 class="title text-5xl">ANGULAR HUB</h1>
      <h2 class="text-2xl">Curated list of Angular Communities</h2>
    </aside>

    <ul class="flex flex-wrap justify-center gap-x-8 gap-y-4 px-8">
      @for (community of communities(); track community.name) {
        <li>
          <app-community-card [community]="community"></app-community-card>
        </li>
      }
    </ul>
  `,
  styles: ``,
})
export default class EvenementsComponent {
  communities = toSignal(injectLoad<typeof load>(), { requireSync: true });

  @Input() set header(header: string) {
    this.headerService.setHeaderTitle(header);
  }

  constructor(private readonly headerService: HeaderService) {}
}
