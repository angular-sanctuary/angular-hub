import {ChangeDetectionStrategy, Component, forwardRef, signal} from "@angular/core";
import {NgClass, NgOptimizedImage} from "@angular/common";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-search',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgOptimizedImage,
    FormsModule,
    NgClass
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchComponent),
      multi: true
    }
  ],
  template: `
    <div
      class="flex justify-between border-2 border-gray-500 rounded-lg gap-4 p-1 mb-6 max-w-md"
      [ngClass]="{'!border-[#BF25B9]': isFocused()}"
    >
      <img ngSrc="/assets/icons/search.svg" height="20" width="20" alt="">
      <input class="flex-1 outline-0 bg-transparent"
             type="text"
             aria-label="Search"
             [(ngModel)]="searchTerm"
             (ngModelChange)="onChange($event)"
             (blur)="onBlur()"
             (focus)="onFocus()"
      >
      <button
        type="button"
        aria-label="Reset search"
        [style.visibility]="searchTerm.length ? 'visible' : 'hidden'"
        [attr.aria-hidden]="!searchTerm.length"
        (click)="reset()">
        <img ngSrc="/assets/icons/cancel.svg" height="20" width="20" alt="">
      </button>
    </div>
  `
})
export class SearchComponent implements ControlValueAccessor {
  isFocused = signal(false);
  searchTerm: string = '';
  onChange: unknown = () => {
  }
  onTouch: unknown = () => {
  }

  writeValue(searchTerm: string): void {
    this.searchTerm = searchTerm;
  }

  registerOnChange(fn: unknown): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: unknown): void {
    this.onTouch = fn;
  }

  onFocus(): void {
    this.isFocused.set(true);
  }

  onBlur(): void {
    this.isFocused.set(false);
    // @ts-expect-error ControlValueAccessor API
    this.onTouch();
  }

  reset(): void {
    this.searchTerm = '';
    // @ts-expect-error ControlValueAccessor API
    this.onChange(this.searchTerm);
  }
}
