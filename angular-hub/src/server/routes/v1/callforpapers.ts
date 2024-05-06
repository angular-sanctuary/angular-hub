import { defineEventHandler, getQuery } from 'h3';
import communities from '../../../public/assets/data/community.json';
import { BackCommunity } from '../../../models/back-community.model';
import { CommunityListSchema } from '../../schemas/community.schema';
import { parse } from 'valibot';

export default defineEventHandler((event) => {
  const { type }: { type: string } = getQuery(event);

  if (type && !['meetup', 'conference', 'workshop'].includes(type)) {
    throw new Error(
      `This endpoint only accepts "meetup", "conference" or "workshop" as type query parameter, not "${type}"`,
    );
  }

  try {
    parse(CommunityListSchema, communities);
    return communities.filter((community: BackCommunity) => {
      if (!type) {
        return community.callForPapers;
      }

      if (type === 'meetup') {
        return community.callForPapers && community.type === 'meetup';
      }

      if (type === 'conference' || type === 'workshop') {
        const openCFP = community.events.find(
          (event) => new Date(event.callForPapersEndDate) > new Date(),
        );
        return community.type === type && openCFP;
      }
    });
  } catch (error) {
    throw new Error('Invalid community data format');
  }
});
