import { defineEventHandler } from 'h3';
import communities from '../../../../../public/assets/data/community.json';
import { parse } from 'valibot';
import { CommunityListSchema } from '../../../../schemas/community.schema';
import { isPast, isToday } from 'date-fns';

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
        return isToday(date) || isPast(date);
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return events;
  } catch (error) {
    throw new Error('Invalid community data format');
  }
});
