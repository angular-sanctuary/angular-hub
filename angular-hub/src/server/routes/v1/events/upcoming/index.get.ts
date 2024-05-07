import { defineEventHandler } from 'h3';
import communities from '../../../../../public/assets/data/community.json';
import { CommunityListSchema } from '../../../../schemas/community.schema';
import { parse } from 'valibot';
import { isFuture, isToday } from 'date-fns';

export default defineEventHandler(() => {
  try {
    parse(CommunityListSchema, communities);
    const events = communities
      .map((community) => {
        const { events, ...communityMeta } = community;
        return community.events
          .map((event) => {
            return {
              ...event,
              community: communityMeta,
            };
          })
          .flat();
      })
      .flat()
      .filter((event) => {
        const date = new Date(event.date);
        return isToday(date) || isFuture(date);
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return events;
  } catch (error) {
    throw new Error('Invalid community data format');
  }
});
