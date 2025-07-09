import { Community } from './community.model';

export type Event = {
  name: string | null;
  type: 'workshop' | 'conference' | 'meetup' | 'other';
  location: string | null;
  url: string | null;
  date: string;
  endDate?: string;
  language: string;
  isFree: boolean;
  isRemote: boolean;
  isOnsite: boolean;
  callForPapersUrl: string | null;
  callForPapersDueDate: string | null;
  community?: Community;
  toBeAnnounced?: boolean;
  organizerId: string;
  startingPrice?: number | null;
  attendeesCount?: number | null;
  isSoldOut?: boolean;
  description?: string | null;
};
