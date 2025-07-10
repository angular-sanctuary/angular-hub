import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { parse } from 'valibot';
import podcasts from '../public/assets/data/podcast.json';
import { PodcastListSchema } from './server/schemas/podcast.schema';
import organizers from '../public/assets/data/organizers.json';
import events from '../public/assets/data/events.json';
import { Community } from './models/community.model';
import { Podcast } from './models/podcast.model';
import { isFuture, isToday } from 'date-fns';
import { Event } from './models/event.model';
import { CommunityEvent } from './models/community-event.model';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

// API Routes
app.get('/api/v1/podcasts', async (req, res) => {
  try {
    const order = (req.query['order'] as 'ASC' | 'DESC') || 'DESC';

    parse(PodcastListSchema, podcasts);

    const sortedPodcasts = podcasts.sort((a: Podcast, b: Podcast) =>
      orderPredicate(order, a.name, b.name),
    );

    res.json(sortedPodcasts);
  } catch (error) {
    res.status(500).json({ error: 'Invalid podcast data format' });
  }
});

app.get('/api/v1/communities', async (req, res) => {
  try {
    const order = (req.query['order'] as 'ASC' | 'DESC') || 'DESC';

    // parse(CommunityListSchema, communities);
    const communities = (organizers as Community[]).filter(
      (community) =>
        community.type !== 'workshop' && community.type !== 'other',
    );

    res.json(communities);
  } catch (error) {
    res.status(500).json({ error: 'Invalid community data format' });
  }
});

app.get('/api/v1/communities/callforpapers', async (req, res) => {
  try {
    res.json([]);
  } catch (error) {
    res.status(500).json({ error: 'Invalid community data format' });
  }
});

app.get('/api/v1/events', async (req, res) => {
  try {
    res.json([]);
  } catch (error) {
    res.status(500).json({ error: 'Invalid community data format' });
  }
});

app.get('/api/v1/events/callforpapers', async (req, res) => {
  try {
    res.json([]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Invalid community data format' });
  }
});

app.get('/api/v1/events/upcoming', async (req, res) => {
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
            url: organizer?.websiteUrl ?? '',
            logo: organizer?.logo ?? '',
          },
        };
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    res.json(communityEvents);
  } catch (error) {
    res.status(500).json({ error: error as string });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);

// Helper functions
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
