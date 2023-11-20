import {ChangeDetectionStrategy, Component} from "@angular/core";

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="flex justify-center items-center gap-4 mt-16">
      <a class="underline bold" href="https://analogjs.org/" target="_blank">Powered by Analog</a>
      <a class="contribute-btn" href="https://github.com/angular-sanctuary/angular-hub" target="_blank">Contribute</a>
    </footer>
  `,
  styles: [
    `
      .contribute-btn {
        background-color: #00BEE0;
        color: black;
        font-weight: bold;
        border-radius: 0.5rem;
        padding: 0.5rem 1.5rem;
      }
    `,
  ],
})
export class FooterComponent {
}
