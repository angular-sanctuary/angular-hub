import { PageServerLoad } from '@analogjs/router';
import { Podcast } from '../../models/podcast.model';

export const load = async ({ fetch }: PageServerLoad): Promise<Podcast[]> => {
  return await fetch<Podcast[]>('/api/v1/podcast');
};
