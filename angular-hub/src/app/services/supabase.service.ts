import { Injectable } from '@angular/core';
import { AuthSession, SupabaseClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  public supabase: SupabaseClient = createBrowserClient(
    import.meta.env['VITE_SUPABASE_URL'],
    import.meta.env['VITE_SUPABASE_KEY'],
  );
  _session: AuthSession | null = null;

  init(): void {
    this.supabase.auth.onAuthStateChange((event, session) => {
      this._session = session;
    });
  }

  async signInWithGithub(): Promise<void> {
    await this.supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.location.origin + '/api/v1/auth/callback',
      },
    });
  }
}
