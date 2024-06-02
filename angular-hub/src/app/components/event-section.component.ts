import { Component, input } from '@angular/core';
import { Event } from '../../models/event.model';
import { EventCardComponent } from './cards/event-card.component';

@Component({
  selector: 'app-event-section',
  template: `
    <h3 class="mb-4">{{ title() }}</h3>
    <ul class="flex flex-col gap-4 justify-start items-stretch w-full">
      @for (event of events(); track event.url) {
        <li
          class="flex flex-col gap-2 bg-[#20212C] px-2 rounded-xl md:min-w-[400px]"
        >
          <a [attr.href]="event.url" target="_blank">
            <app-event-card [event]="event" />
          </a>
        </li>
      }
    </ul>
  `,
  styles: [
    `
      h3 {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        text-align: center;
      }

      h3:before,
      h3:after {
        content: '';
        border-top: 2px solid;
        margin: 0 20px 0 0;
        flex: 1 0 20px;
      }

      h3:after {
        margin: 0 0 0 20px;
      }
    `,
  ],
  imports: [EventCardComponent],
  standalone: true,
})
export class EventSectionComponent {
  events = input.required<Event[]>();
  title = input.required<string>();
}
