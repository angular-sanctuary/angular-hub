import { Component, input } from '@angular/core';

@Component({
  selector: 'app-banner',
  template: `
    <aside
      class="h-20 sm:h-36 flex flex-col justify-center items-center mb-4 m-6 rounded-2xl bg-no-repeat bg-auto md:bg-cover"
      style="background-image: url(/assets/images/hero.webp);"
    >
      <h1 class="title text-5xl hidden sm:block">ANGULAR HUB</h1>
      <h2 class="text-2xl text-center">
        {{ description() }}
      </h2>
    </aside>
  `,
  standalone: true,
})
export class BannerComponent {
  description = input.required<string>();
}
