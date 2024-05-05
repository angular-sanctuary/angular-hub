import { Event } from '../models/event.model';
import { CallForPapers } from '../models/call-for-papers.model';
import { Community } from '../models/community.model';
import { Podcast } from '../models/podcast.model';

export type FilterCriterias = {
  event: Array<keyof Pick<Event, 'name' | 'location'>>;
  cfp: Array<keyof Pick<CallForPapers, 'title' | 'location'>>;
  community: Array<keyof Pick<Community, 'title' | 'location'>>;
  podcast: Array<keyof Pick<Podcast, 'name'>>;
};

export const FILTER_CRITERIAS: FilterCriterias = {
  event: ['name', 'location'],
  cfp: ['title', 'location'],
  community: ['title', 'location'],
  podcast: ['name'],
};
