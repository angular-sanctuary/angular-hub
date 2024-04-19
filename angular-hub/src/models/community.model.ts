import { Event } from '../app/models/event.model';

export interface Community {
  title: string;
  type: Array<'meetup' | 'conference' | 'workshop' | 'other'>;
  location: string;
  url: string;
  logo: string;
  twitter?: string;
  linkedin?: string;
  event: Event[];
  cfp?: string;
}
