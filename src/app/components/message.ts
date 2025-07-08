import { Component, input } from '@angular/core';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-message',
  template: `
    <p-message
      [severity]="severity()"
      [text]="title()"
    />
  `,
  imports: [MessageModule],
})
export class Message {
  title = input.required<string>();
  severity = input.required<string>();
}
