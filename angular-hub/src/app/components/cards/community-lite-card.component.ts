import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { Community } from '../../models/community.model';

@Component({
  selector: 'app-community-lite-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, TitleCasePipe],
  template: `
    <article class="flex flex-col w-full">
      <div class="flex flex-wrap items-center">
        <h3
          [attr.aria-labelledby]="community.title"
          class="text-xl font-bold mr-2"
          itemprop="title"
        >
          {{ community.title }}
        </h3>
        <span class="text-gray-500 dark:text-gray-400" itemprop="location">{{
          community.location
        }}</span>
      </div>
      <div>
        <span class="font-bold text-primary" itemprop="type">{{
          community.type | titlecase
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
export class CommunityLiteCardComponent {
  @Input({ required: true }) community!: Community;
}
