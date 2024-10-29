import { defineEventHandler } from 'h3';
import communities from '../../../../../public/assets/data/community.json';
import { Community } from '../../../../../models/community.model';
import { CommunityListSchema } from '../../../../schemas/community.schema';
import { parse } from 'valibot';
import { Event } from '../../../../../models/event.model';
import { EventCallForPapers } from '../../../../../models/call-for-papers.model';

export default defineEventHandler((event) => {
  try {
    parse(CommunityListSchema, communities);

    return communities
      .reduce((acc: unknown[], community: Community) => {
        const events = community.events.reduce(
          (acc: EventCallForPapers[], event: Event) => {
            if (
              event.callForPapers &&
              new Date(event.callForPapersDueDate) > new Date()
            ) {
              acc.push({
                name: event.name ?? community.name,
                type: event.type,
                location: event.location,
                logo: community.logo,
                url: event.url,
                callForPapersUrl: event.callForPapers,
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
          new Date(a.callForPapersDueDate).getTime() -
          new Date(b.callForPapersDueDate).getTime(),
      );
  } catch (error) {
    console.error(error);
    throw new Error('Invalid community data format');
  }
});
