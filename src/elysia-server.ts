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
import communities from '../public/assets/data/community.json';
import { Community } from './models/community.model';
import { Podcast } from './models/podcast.model';
import { isFuture, isToday } from 'date-fns';
import { EventCallForPapers } from './models/call-for-papers.model';
import { Event } from './models/event.model';

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
          parse(CommunityListSchema, communities);
          return (communities as Community[]).filter(
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
        parse(CommunityListSchema, communities);

        return (communities as Community[])
          .filter(
            (community: Community) =>
              community.callForPapersUrl && community.type === 'meetup',
          )
          .map(({ events, ...community }) => ({ ...community }));
      } catch (error) {
        throw new Error('Invalid community data format');
      }
    })
    .get('/api/v1/events', async ({ query }) => {
      try {
        parse(CommunityListSchema, communities);
        return (communities as Community[])
          .map((community: Community) => {
            const { events, ...communityMeta } = community;
            return community.events
              .map((event: Event) => {
                return {
                  ...event,
                  name: event.name ?? communityMeta.name,
                  community: communityMeta,
                };
              })
              .flat();
          })
          .flat()
          .filter((event) => applyQueryFilter(event, query))
          .sort(
            (a: any, b: any) =>
              new Date(a.date).getTime() - new Date(b.date).getTime(),
          );
      } catch (error) {
        throw new Error('Invalid community data format');
      }
    })
    .get('/api/v1/events/callforpapers', async () => {
      try {
        parse(CommunityListSchema, communities);

        return (communities as Community[])
          .reduce((acc: any[], community: Community) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const events = community.events.reduce(
              (acc: EventCallForPapers[], event: Event) => {
                if (event.callForPapersUrl) {
                  if (
                    event.callForPapersDueDate &&
                    new Date(event.callForPapersDueDate) < new Date()
                  ) {
                    return acc;
                  }

                  if (event.date && new Date(event.date) < new Date()) {
                    return acc;
                  }

                  acc.push({
                    name: event.name ?? community.name,
                    type: event.type,
                    location: event.location,
                    logo: community.logo,
                    callForPapersUrl: event.callForPapersUrl,
                    date: event.date,
                    callForPapersDueDate: event.callForPapersDueDate,
                    isRemote: event.isRemote,
                    isOnsite: event.isOnsite,
                  });
                }
                return acc;
              },
              [],
            );
            return [...acc, events];
          }, [])
          .flat()
          .sort(
            (a, b) =>
              new Date(a.callForPapersDueDate ?? '').getTime() -
              new Date(b.callForPapersDueDate ?? '').getTime(),
          );
      } catch (error) {
        console.error(error);
        throw new Error('Invalid community data format');
      }
    })
    .get('/api/v1/events/upcoming', async () => {
      try {
        const parsed = parse(CommunityListSchema, communities);
        const events = (communities as Community[])
          .map((community) => {
            const { events, ...communityMeta } = community;
            return community.events
              .map((event) => {
                return {
                  ...event,
                  name: event.name ?? communityMeta.name,
                  community: communityMeta,
                };
              })
              .flat();
          })
          .flat()
          .filter((event) => {
            const date = new Date(event.date);
            return isToday(date) || isFuture(date) || event.toBeAnnounced;
          })
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          );

        return events;
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
