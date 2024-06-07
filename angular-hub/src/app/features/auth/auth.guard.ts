import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { inject, PLATFORM_ID } from '@angular/core';
import { REQUEST, RESPONSE } from '../../../request-response';
import { parseCookies } from 'h3';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom, lastValueFrom } from 'rxjs';

export function AuthGuard(): CanActivateFn {
  return async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    const req = inject(REQUEST, { optional: true });
    const res = inject(RESPONSE, { optional: true });
    const auth = inject(SupabaseService);
    const router = inject(Router);

    console.log('AuthGuard');

    if (isBrowser) {
      const browserSession = await auth.getSession();
      if (browserSession) {
        return true;
      }

      return firstValueFrom(auth.login(state.url));
    }

    console.log(!!req, !!res);

    if (!req || !res) return false;

    const cookies = parseCookies({ node: { req, res } } as any);

    const serverSession = await auth.supabase.auth.setSession({
      access_token: cookies['sb-comcbgptiwzdzqrbxulv-auth-token.0'].match(
        /"access_token":"(.*?)"/,
      )![1],
      refresh_token: cookies['sb-comcbgptiwzdzqrbxulv-auth-token.0'].match(
        /"refresh_token":"(.*?)"/,
      )![1],
    });

    console.log(serverSession);

    if (serverSession.data?.session) {
      console.log('true');
      return true;
    }

    console.log('false');

    return firstValueFrom(auth.login(state.url));

    // return inject(SupabaseService).login(state.url);
  };
}
