import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CallForPapers } from '../../models/call-for-papers.model';
import { DatePipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-cfp-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, DatePipe],
  template: `
    <article class="flex w-full items-center gap-4">
      <img
        class="rounded-xl"
        [ngSrc]="cfp.logo"
        height="80"
        width="80"
        alt=""
      />
      <div class="text-start">
        @if (cfp.deadline) {
          <span class="font-bold text-primary" itemprop="date"
            >Until {{ cfp.deadline | date }}</span
          >
        }
        <h3 [attr.id]="cfp.title" class="text-xl font-bold" itemprop="title">
          {{ cfp.title }}
        </h3>
        <span class="text-gray-500 dark:text-gray-400" itemprop="location">{{
          cfp.location
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
export class CfpCardComponent {
  @Input({ required: true }) cfp!: CallForPapers;
}
