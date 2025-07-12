import { Component, input } from '@angular/core';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-message',
  template: ` <p-message [severity]="severity()" [text]="title()" /> `,
  imports: [MessageModule],
})
export class Message {
  title = input.required<string>();
  severity = input.required<string>();
}

@Component({
  selector: 'app-empty-search-message',
  template: `
    <div
      class="flex flex-col items-center justify-center py-12 px-6 text-center max-w-md mx-auto"
    >
      <div class="w-16 h-16 mb-4 text-gray-400">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
          <path d="M16 11a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"></path>
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ title() }}</h3>
      <p class="text-gray-600 mb-4">{{ description() }}</p>
      <div class="flex flex-col sm:flex-row gap-2 text-sm text-gray-500">
        <span i18n>Try adjusting your search terms</span>
        <span class="hidden sm:inline">•</span>
        <span i18n>or browse all events above</span>
      </div>
    </div>
  `,
  standalone: true,
})
export class EmptySearchMessage {
  title = input.required<string>();
  description = input.required<string>();
}

@Component({
  selector: 'app-no-events-message',
  template: `
    <div
      class="flex flex-col items-center justify-center py-16 px-6 text-center max-w-md mx-auto"
    >
      <div class="w-20 h-20 mb-4 text-gray-400">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ title() }}</h3>
      <p class="text-gray-600 mb-4">{{ description() }}</p>
      <div class="text-sm text-gray-500">
        <span>Check back soon for upcoming Angular events!</span>
      </div>
    </div>
  `,
  standalone: true,
})
export class NoEventsMessage {
  title = input.required<string>();
  description = input.required<string>();
}

@Component({
  selector: 'app-empty-search-communities-message',
  template: `
    <div
      class="flex flex-col items-center justify-center py-12 px-6 text-center max-w-md mx-auto"
    >
      <div class="w-16 h-16 mb-4 text-gray-400">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
          <path d="M16 11a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"></path>
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ title() }}</h3>
      <p class="text-gray-600 mb-4">{{ description() }}</p>
      <div class="flex flex-col sm:flex-row gap-2 text-sm text-gray-500">
        <span>Try adjusting your search terms</span>
        <span class="hidden sm:inline">•</span>
        <span>or browse all communities above</span>
      </div>
    </div>
  `,
  standalone: true,
})
export class EmptySearchCommunitiesMessage {
  title = input.required<string>();
  description = input.required<string>();
}
