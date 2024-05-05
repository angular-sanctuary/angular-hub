import { PageServerLoad } from '@analogjs/router';
import { Event } from '../models/event.model';

export const load = async ({ fetch }: PageServerLoad): Promise<Event[]> => {
  return await fetch<Event[]>('/api/v1/events/upcoming');
};
