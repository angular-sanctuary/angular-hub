import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {ContentFile} from "@analogjs/content";
import {CallForPapers} from "../models/call-for-papers.model";
import {DatePipe, NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-cfp-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgOptimizedImage,
    DatePipe,
    NgIf
  ],
  template: `
    <a class="flex w-full items-center gap-4" [href]="cfp.attributes.url" target="_blank" [attr.aria-labelledby]="cfp.attributes.title">
      <img class="rounded-xl" [ngSrc]="cfp.attributes.logo" height="80" width="80" alt="">
      <div class="text-start">
        <span *ngIf="cfp.attributes.deadline" class="font-bold text-[#BF25B9]" itemprop="date">until {{cfp.attributes.deadline | date}}</span>
        <h3 [attr.id]="cfp.attributes.title" class="text-xl font-bold" itemprop="title">{{cfp.attributes.title}}</h3>
        <span class="text-gray-500" itemprop="location">{{cfp.attributes.location}}</span>
      </div>
    </a>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        padding: 0.25rem;
      }
    `
  ]
})
export class CfpCardComponent {
  @Input({required: true}) cfp!: ContentFile<CallForPapers>;
}
