import { defineEventHandler, getQuery } from 'h3';
import communities from '../../../../public/assets/data/community.json';
import { Event } from '../../../../models/event.model';
import { Community } from '../../../../models/community.model';
import { CommunityListSchema } from '../../../schemas/community.schema';
import { parse } from 'valibot';

export default defineEventHandler((evt) => {
  try {
    parse(CommunityListSchema, communities);
    return communities
      .map((community: Community) => {
        const { events, ...communityMeta } = community;
        return community.events
          .map((event: Event) => {
            return {
              ...event,
              community: communityMeta,
            };
          })
          .flat();
      })
      .flat()
      .filter((event: Event) => applyQueryFilter(event, getQuery(evt)))
      .sort(
        (a: Event, b: Event) =>
          new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
  } catch (error) {
    throw new Error('Invalid community data format');
  }
});

function applyQueryFilter(event: Event, query): boolean {
  for (const key in query) {
    if (event[key] !== Boolean(query[key])) {
      return false;
    }
  }
  return true;
}
