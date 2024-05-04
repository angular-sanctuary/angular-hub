import { defineEventHandler } from 'h3';
import communities from '../../../../../public/assets/data/community.json';

export default defineEventHandler(() => {
  // return upcoming events
  const upcomingEvents = communities.filter((community) => {
    return community.events.find((event) => new Date(event.date) > new Date());
  });

  return upcomingEvents;
});
