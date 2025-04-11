import { Event } from './event';

export interface Community {
  name: string;
  type: 'workshop' | 'conference' | 'meetup' | 'other';
  location?: string;
  url?: string;
  logo?: string;
  bluesky?: string;
  x?: string;
  linkedin?: string;
  callForPapers?: string;
  events: Event[];
}
