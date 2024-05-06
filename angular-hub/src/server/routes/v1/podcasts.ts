import { defineEventHandler } from 'h3';
import podcasts from '../../../public/assets/data/podcast.json';
import { parse } from 'valibot';
import { PodcastListSchema } from '../../schemas/podcast.schema';

export default defineEventHandler(() => {
  try {
    parse(PodcastListSchema, podcasts);
    return podcasts;
  } catch (error) {
    throw new Error('Invalid podcast data format');
  }
});
