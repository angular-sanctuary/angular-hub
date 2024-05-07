import { Event } from './event.model';

export interface Community {
  name: string;
  type: 'workshop' | 'conference' | 'meetup' | 'other';
  location: string | null;
  url: string | null;
  logo: string | null;
  twitter: string | null;
  linkedin: string | null;
  callForPapers: string | null;
  events: Event[];
}
