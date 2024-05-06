import { defineEventHandler, getQuery } from 'h3';
import communities from '../../../../public/assets/data/community.json';
import { BackEvent } from '../../../../models/back-event.model';
import { BackCommunity } from '../../../../models/back-community.model';
import { CommunityListSchema } from '../../../schemas/community.schema';
import { parse } from 'valibot';

export default defineEventHandler((evt) => {
  try {
    parse(CommunityListSchema, communities);
    return communities
      .map((community: BackCommunity) => {
        const { events, ...communityMeta } = community;
        return community.events
          .map((event: BackEvent) => {
            return {
              ...event,
              community: communityMeta,
            };
          })
          .flat();
      })
      .flat()
      .filter((event: BackEvent) => applyQueryFilter(event, getQuery(evt)))
      .sort(
        (a: BackEvent, b: BackEvent) =>
          new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
  } catch (error) {
    throw new Error('Invalid community data format');
  }
});

function applyQueryFilter(event: BackEvent, query): boolean {
  for (const key in query) {
    if (event[key] !== Boolean(query[key])) {
      return false;
    }
  }
  return true;
}
