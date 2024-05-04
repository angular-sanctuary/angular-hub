import { defineEventHandler } from 'h3';
import communities from '../../../../../public/assets/data/community.json';

export default defineEventHandler(() => {
  // return all events
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
    .filter((event) => new Date(event.date).getTime() < Date.now())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return events;
});
