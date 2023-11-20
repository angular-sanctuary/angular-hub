import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {NgOptimizedImage} from "@angular/common";
import {ContentFile} from "@analogjs/content";
import {Talk} from "../models/talk.model";

@Component({
  selector: 'app-talk-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgOptimizedImage
  ],
  template: `
    <article class="flex w-full items-center gap-2 border-b-2 border-gray-300 pb-4">
        <img class="rounded-xl" [ngSrc]="'/org/angular-wroclaw.jpeg'" height="80" width="80" priority alt="">
        <div>
          <h3 class="text-start font-bold" itemprop="title">{{talk.attributes.title}}</h3>
          <p class="text-start">{{talk.attributes.author.name}}</p>
        </div>
      </article>
`
})
export class TalkCardComponent {
  @Input({required: true}) talk!: ContentFile<Talk>;
}
