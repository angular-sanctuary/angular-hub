import {
  defineEventHandler,
  getQuery,
  sendRedirect,
  setCookie,
  parseCookies,
  deleteCookie,
} from 'h3';
import { createServerClient } from '@supabase/ssr';

export default defineEventHandler(async (event) => {
  try {
    const { code, next }: { code: string; next: string } = getQuery(event);
    const cookies = parseCookies(event);

    if (code) {
      const supabase = createServerClient(
        process.env['SUPABASE_URL'] as string,
        process.env['SUPABASE_KEY'] as string,
        {
          cookies: {
            get: (name) => {
              return cookies[name];
            },
            set: async (name, value, options) => {
              setCookie(event, name, value, options);
            },
            remove: (name) => {
              deleteCookie(event, name);
            },
          },
        },
      );

      await supabase.auth.exchangeCodeForSession(code);
    }

    return sendRedirect(event, next || '/', 302);
  } catch (e) {
    // TODO to be handled properly
    console.error('callback error', e);
  }
});
