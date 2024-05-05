import { PageServerLoad } from '@analogjs/router';
import { Community } from '../../models/community.model';

export const load = async ({ fetch }: PageServerLoad): Promise<Community[]> => {
  return await fetch<Community[]>('/api/v1/communities');
};
