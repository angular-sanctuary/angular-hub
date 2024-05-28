import { defineEventHandler, getQuery, sendRedirect } from 'h3';
import { nitroServerClient } from '../../../auth';

export default defineEventHandler(async (event) => {
  try {
    const { code, next }: { code: string; next: string } = getQuery(event);

    if (code) {
      const serverClient = nitroServerClient(event);
      await serverClient.auth.exchangeCodeForSession(code);
    }

    return sendRedirect(event, next || '/', 302);
  } catch (e) {
    // TODO to be handled properly
    console.error('callback error', e);
  }
});
