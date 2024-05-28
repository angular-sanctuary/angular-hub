import { deleteCookie, H3Event, parseCookies, setCookie } from 'h3';
import { createServerClient } from '@supabase/ssr';

export function nitroServerClient(event: H3Event) {
  const cookies = parseCookies(event);

  return createServerClient(
    import.meta.env['VITE_SUPABASE_URL'],
    import.meta.env['VITE_SUPABASE_KEY'],
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
}
