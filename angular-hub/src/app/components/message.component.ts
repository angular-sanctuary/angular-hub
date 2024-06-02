import { Component, computed, input } from '@angular/core';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-message',
  template: `
    <p-messages
      [value]="message()"
      [enableService]="false"
      [closable]="false"
    />
  `,
  imports: [MessagesModule],
  standalone: true,
})
export class MessageComponent {
  title = input.required<string>();
  severity = input.required<string>();

  message = computed(() => [
    { severity: this.severity(), detail: this.title() },
  ]);
}
