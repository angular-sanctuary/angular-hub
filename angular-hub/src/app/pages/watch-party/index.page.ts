import { Component } from '@angular/core';
import { RouteMeta } from '@analogjs/router';
import { BannerComponent } from '../../components/banner.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

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
        <button
          class="highlighted-btn rounded py-2 px-4 text-slate-100 w-48"
          (click)="showDialog()"
        >
          Share your party!
        </button>
        <span>
          Hosting a watch party for the Angular release? Share it with the
          community! Announce your event here and connect with fellow Angular
          enthusiasts.
        </span>
      </aside>

      <div class="card">
        <p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }">
          <ng-template pTemplate="header">
            <tr>
              <th>Location</th>
              <th>Host</th>
              <th>Organizer</th>
              <th></th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-product>
            <tr>
              <td>{{ product.code }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.category }}</td>
              <td>
                <button
                  type="button"
                  class="rounded py-2 px-4 bg-slate-500 w-48"
                >
                  Join
                </button>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </div>
    </div>
    <p-dialog
      header="Edit Profile"
      [modal]="true"
      [(visible)]="visible"
      [style]="{ width: '25rem' }"
    >
      <form name="watch-party-event" method="POST" netlify>
        <span class="p-text-secondary block mb-5"
          >Update your information.</span
        >
        <div class="flex align-items-center gap-3 mb-3">
          <label for="username" class="font-semibold w-6rem">Organizer</label>
          <input
            pInputText
            id="username"
            class="flex-auto"
            name="organizer"
            autocomplete="off"
          />
        </div>
        <div class="flex align-items-center gap-3 mb-5">
          <label for="email" class="font-semibold w-6rem">Host</label>
          <input
            pInputText
            id="email"
            class="flex-auto"
            name="host"
            autocomplete="off"
          />
        </div>
        <div class="flex justify-content-end gap-2">
          <p-button
            typeof="button"
            label="Cancel"
            severity="secondary"
            (onClick)="visible = false"
          />
          <p-button type="submit" label="Save" (onClick)="visible = false" />
        </div>
      </form>
    </p-dialog>
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
  visible = false;

  showDialog() {
    this.visible = true;
  }

  products = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
  ];
}
