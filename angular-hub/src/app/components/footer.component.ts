import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer
      class="flex justify-center items-center gap-4 mt-16"
      [ngClass]="{ 'flex-col-reverse pb-4': !isHandset }"
    >
      <a class="underline bold" href="https://analogjs.org/" target="_blank"
        >Powered by Analog</a
      >
      <a
        class="contribute-btn bg-secondary text-black font-bold rounded-lg px-6 py-2"
        href="https://github.com/angular-sanctuary/angular-hub"
        target="_blank"
        >Contribute</a
      >
    </footer>
  `,
  imports: [NgClass],
})
export class FooterComponent {
  @Input() isHandset = true;
}
