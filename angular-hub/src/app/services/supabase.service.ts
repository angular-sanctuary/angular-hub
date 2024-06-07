import { inject, Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  Session,
  SupabaseClient,
} from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';
import { BehaviorSubject, from, map, Observable, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { LoginComponent } from '../features/auth/login.component';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  readonly #router = inject(Router);
  readonly #dialog = inject(Dialog);
  public supabase: SupabaseClient = createBrowserClient(
    import.meta.env['VITE_SUPABASE_URL'],
    import.meta.env['VITE_SUPABASE_KEY'],
  );

  session = new BehaviorSubject<AuthSession | null>(null);
  authEvent = new BehaviorSubject<AuthChangeEvent | null>(null);

  constructor() {
    this.supabase.auth.onAuthStateChange((event, session) => {
      this.session.next(session);
      this.authEvent.next(event);
    });
  }

  getSession(): Promise<Session | null> {
    return this.supabase.auth
      .getSession()
      .then((result) => result.data.session);
  }

  async signInWithGithub(redirectUrl: string): Promise<void> {
    await this.supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo:
          window.location.origin + `/api/v1/auth/callback?next=${redirectUrl}`,
      },
    });
  }

  login(redirectUrl: string): Observable<boolean> {
    console.log('login');
    return from(this.getSession()).pipe(
      switchMap((session) => {
        console.log('session', session);
        if (!session) {
          this.#dialog.open(LoginComponent, {
            height: '400px',
            width: '600px',
            data: redirectUrl,
            backdropClass: 'custom-backdrop',
          });
          return this.session.asObservable().pipe(map((session) => !!session));
        }
        return of(true);
      }),
    );
  }

  async logout(): Promise<void> {
    await this.supabase.auth.signOut();
    void this.#router.navigate(['/']);
  }
}
