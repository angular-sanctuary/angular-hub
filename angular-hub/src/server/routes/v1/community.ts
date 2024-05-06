import { defineEventHandler } from 'h3';
import communities from '../../../public/assets/data/community.json';
import { parse } from 'valibot';
import { CommunityListSchema } from '../../schemas/community.schema';

// TODO duplicate to /communities, keep it as promoted on social media
export default defineEventHandler(() => {
  try {
    parse(CommunityListSchema, communities);
    return communities;
  } catch (error) {
    throw new Error('Invalid community data format');
  }
});
