import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-tag',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="inline-block px-2 text-sm font-semibold rounded-md text-white"
      [style.background]="color()"
    >
      {{ title() }}
    </div>
  `,
})
export class TagComponent {
  title = input.required<string>();
  color = input<string>('#963296');
}
