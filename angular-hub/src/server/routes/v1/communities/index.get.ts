import { defineEventHandler } from 'h3';
import communities from '../../../../public/assets/data/community.json';
import { parse } from 'valibot';
import { CommunityListSchema } from '../../../schemas/community.schema';

export default defineEventHandler(() => {
  try {
    parse(CommunityListSchema, communities);
    return communities.filter(
      (community) =>
        community.type !== 'workshop' && community.type !== 'other',
    );
  } catch (error) {
    throw new Error('Invalid community data format');
  }
});
