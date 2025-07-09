import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { isMainModule } from '@angular/ssr/node';
import { Elysia } from 'elysia';
import { staticPlugin } from '@elysiajs/static';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'valibot';
import podcasts from '../public/assets/data/podcast.json';
import { PodcastListSchema } from './server/schemas/podcast.schema';
import { CommunityListSchema } from './server/schemas/community.schema';
import organizers from '../public/assets/data/organizers.json';
import events from '../public/assets/data/events.json';
import { Community } from './models/community.model';
import { Podcast } from './models/podcast.model';
import { isFuture, isToday } from 'date-fns';
import { EventCallForPapers } from './models/call-for-papers.model';
import { Event } from './models/event.model';
import { CommunityEvent } from './models/community-event.model';

export function app() {
  const server = new Elysia();
  const angularAppEngine = new AngularAppEngine();

  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');

  server.use(
    staticPlugin({
      prefix: '',
      assets: browserDistFolder,
      alwaysStatic: true,
    }),
  );

  server
    .get('/*', async (c) => {
      const res = await angularAppEngine.handle(c.request, {
        server: 'elysia',
      });
      return res || undefined;
    })
    .get(
      '/api/v1/podcasts',
      async ({
        query: { order = 'DESC' },
      }: {
        query: { order: 'ASC' | 'DESC' };
      }) => {
        try {
          parse(PodcastListSchema, podcasts);

          return podcasts.sort((a: Podcast, b: Podcast) =>
            orderPredicate(order, a.name, b.name),
          );
        } catch (error) {
          throw new Error('Invalid podcast data format');
        }
      },
    )
    .get(
      '/api/v1/communities',
      async ({
        query: { order = 'DESC' },
      }: {
        query: { order: 'ASC' | 'DESC' };
      }) => {
        try {
          // parse(CommunityListSchema, communities);
          return (organizers as Community[]).filter(
            (community) =>
              community.type !== 'workshop' && community.type !== 'other',
          );
        } catch (error) {
          throw new Error('Invalid community data format');
        }
      },
    )
    .get('/api/v1/communities/callforpapers', async () => {
      try {
        return [];
      } catch (error) {
        throw new Error('Invalid community data format');
      }
    })
    .get('/api/v1/events', async ({ query }) => {
      try {
        return [];
      } catch (error) {
        throw new Error('Invalid community data format');
      }
    })
    .get('/api/v1/events/callforpapers', async () => {
      try {
        return [];
      } catch (error) {
        console.error(error);
        throw new Error('Invalid community data format');
      }
    })
    .get('/api/v1/events/upcoming', async () => {
      try {
        const communityEvents: CommunityEvent[] = (events as Event[])
          .filter((event) => {
            const date = new Date(event.date);
            return isToday(date) || isFuture(date) || event.toBeAnnounced;
          })
          .map((event) => {
            const organizer = organizers.find(
              (organizer) => organizer.id === event.organizerId,
            );
            return {
              ...event,
              name: event.name ?? organizer?.name ?? '',
              organizer: {
                name: organizer?.name ?? '',
                url: organizer?.eventsUrl ?? '',
                logo: organizer?.logo ?? '',
              },
            };
          })
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          );

        return communityEvents;
      } catch (error) {
        throw new Error(error as string);
      }
    });

  console.warn('Elysia server started');

  return server;
}

const server = app();
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;

  server.listen(port, () => {
    console.log(`Elysia server listening on http://localhost:${port}`);
  });
}

function orderPredicate(order: 'ASC' | 'DESC' = 'DESC', a: string, b: string) {
  if (order === 'DESC') {
    return a.localeCompare(b);
  } else {
    return b.localeCompare(a);
  }
}

function applyQueryFilter(event: any, query: Record<string, any>): boolean {
  for (const key in query) {
    if (event[key] !== Boolean(query[key])) {
      return false;
    }
  }
  return true;
}

export const reqHandler = createRequestHandler(server.fetch);
