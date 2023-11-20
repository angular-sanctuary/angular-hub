import {ChangeDetectionStrategy, Component} from "@angular/core";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-search',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgOptimizedImage
  ],
  template: `
    <div class="flex justify-between border-2 border-gray-500 rounded-lg p-1 mb-6">
      <input type="text">
      <img ngSrc="/icons/search.svg" height="20" width="20" alt="">
    </div>
  `
})
export class SearchComponent {
  // TODO : implement search
}
