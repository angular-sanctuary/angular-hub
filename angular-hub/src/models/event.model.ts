import { Community } from './community.model';

export interface Event {
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
}
