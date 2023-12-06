import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CallForPapers } from '../../models/call-for-papers.model';
import { DatePipe, NgIf, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-cfp-lite-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, DatePipe, NgIf],
  template: `
    <article class="flex flex-col w-full">
      <div class="flex flex-wrap items-center">
        <h3
          [attr.id]="cfp.title"
          class="text-xl font-bold mr-2"
          itemprop="title"
        >
          {{ cfp.title }}
        </h3>
        <span class="text-gray-500 dark:text-gray-400" itemprop="location">{{
          cfp.location
        }}</span>
      </div>
      <span *ngIf="cfp.deadline" class="font-bold text-primary" itemprop="date"
        >Until {{ cfp.deadline | date }}</span
      >
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
export class CfpLiteCardComponent {
  @Input({ required: true }) cfp!: CallForPapers;
}
