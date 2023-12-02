import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Community } from '../../models/community.model';

@Component({
  selector: 'app-community-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  template: `
    <article class="flex w-full items-center gap-4">
      <img
        class="rounded-xl"
        [ngSrc]="community.logo"
        height="80"
        width="80"
        alt=""
      />
      <div class="text-start">
        <span class="font-bold text-primary" itemprop="type">{{
          community.type
        }}</span>
        <h3
          [attr.aria-labelledby]="community.title"
          class="text-xl font-bold"
          itemprop="title"
        >
          {{ community.title }}
        </h3>
        <span class="text-gray-500 dark:text-gray-400" itemprop="location">{{
          community.location
        }}</span>
      </div>
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
        padding-block: 0.5rem;
      }
    `,
  ],
})
export class CommunityCardComponent {
  @Input({ required: true }) community!: Community;
}
