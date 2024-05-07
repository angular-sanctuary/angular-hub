import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { Community } from '../../../models/community.model';

@Component({
  selector: 'app-community-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, TitleCasePipe],
  template: `
    <article class="flex flex-col max-w-36 items-start gap-1">
      <a [href]="community().url ?? '#'">
        <img
          class="rounded-xl"
          [src]="community().logo"
          height="200"
          width="200"
          alt=""
        />
        <div class="text-start">
          <span class="font-bold text-primary" itemprop="type">{{
            community().type | titlecase
          }}</span>
          <h3
            [attr.aria-labelledby]="community().name"
            class="text-xl font-bold"
            itemprop="title"
          >
            {{ community().name }}
          </h3>
          <span class="text-gray-500 dark:text-gray-400" itemprop="location">{{
            community().location
          }}</span>
        </div>
      </a>
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
        padding-block: 0.5rem;
        cursor: pointer;

        &:hover {
          h3 {
            color: theme('colors.secondary');
            font-weight: 800;
          }
        }
      }
    `,
  ],
})
export class CommunityCardComponent {
  community = input.required<Community>();
}
