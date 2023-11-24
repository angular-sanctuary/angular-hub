import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ContentFile } from '@analogjs/content';
import { Community } from '../models/community.model';

@Component({
  selector: 'app-community-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  template: `
    <article class="flex w-full items-center gap-4">
      <img
        class="rounded-xl"
        [ngSrc]="community.attributes.logo"
        height="80"
        width="80"
        alt=""
      />
      <div class="text-start">
        <span class="font-bold text-[#BF25B9]" itemprop="type">{{
          community.attributes.type
        }}</span>
        <h3
          [attr.aria-labelledby]="community.attributes.title"
          class="text-xl font-bold"
          itemprop="title"
        >
          {{ community.attributes.title }}
        </h3>
        <span class="text-gray-500" itemprop="location">{{
          community.attributes.location
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
  @Input({ required: true }) community!: ContentFile<Community>;
}
