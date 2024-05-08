import { defineEventHandler } from 'h3';
import communities from '../../../../public/assets/data/community.json';
import { Community } from '../../../../models/community.model';
import { CommunityListSchema } from '../../../schemas/community.schema';
import { parse } from 'valibot';

export default defineEventHandler((event) => {
  try {
    parse(CommunityListSchema, communities);

    return communities
      .filter(
        (community: Community) =>
          community.callForPapers && community.type === 'meetup',
      )
      .map(({ events, ...community }) => ({ ...community }));
  } catch (error) {
    throw new Error('Invalid community data format');
  }
});
