import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Input,
  signal,
  isDevMode,
} from '@angular/core';
import { Tag, TAG_COLORS_MAP } from '../consts/tag-colors.const';

@Component({
  selector: 'app-event-tag',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="inline-block px-2 text-sm font-semibold rounded-md text-white"
      [style.background]="tagColor()"
      itemprop="tag"
    >
      {{ tag() }}
    </div>
  `,
})
export class EventTagComponent {
  tag = signal<Tag | null>(null);
  tagColor = computed(() => {
    const tag = this.tag();
    if (tag && TAG_COLORS_MAP[tag]) {
      return TAG_COLORS_MAP[tag];
    }
    if (isDevMode()) {
      console.warn(`
        ${tag} tag is not supported and will return the default color.
        If you wanna change the color, add a new record in TAG_COLORS_MAP
      `);
    }
    return '#3f3f3f';
  });

  @Input({ required: true })
  set name(value: Tag) {
    this.tag.set(value);
  }
}
