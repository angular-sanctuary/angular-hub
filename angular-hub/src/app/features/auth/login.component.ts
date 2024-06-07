import { Component, inject } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { ButtonModule } from 'primeng/button';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-login',
  template: `
    <div class="relative foo">
      <p-button label="Login" icon="pi pi-github" (click)="login()" />
      <p-button
        class="close-button"
        type="button"
        (click)="close($event)"
        icon="pi pi-times"
        rounded="true"
        outlined="true"
        styleClass="h-2rem w-2rem"
        severity="secondary"
        title="Close navigation"
      ></p-button>
    </div>
  `,
  imports: [ButtonModule],
  standalone: true,
  styles: [
    `
      .foo {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #20212c;
        height: 100%;
      }

      .close-button {
        position: absolute;
        top: 1rem;
        right: 1rem;
      }
    `,
  ],
})
export class LoginComponent {
  readonly #supabaseService = inject(SupabaseService);
  readonly #data = inject(DIALOG_DATA);
  readonly #dialogRef = inject(DialogRef);

  login(): void {
    void this.#supabaseService.signInWithGithub(this.#data);
  }

  close(event: any) {
    this.#dialogRef.close();
  }
}
