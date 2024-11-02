import { Event } from './event.model';
import { EventType } from './event-type.model';

export interface Community {
  name: string;
  type: 'workshop' | 'conference' | 'meetup' | 'other';
  // change to nested 2 properties (city / country) || Online
  location: string | null;
  logo: string | null;
  eventsUrl: string | null;
  websiteUrl: string | null;
  organizersUrl: string | null;
  twitterUrl: string | null;
  linkedinUrl: string | null;
  youtubeUrl: string | null;
  twitchUrl: string | null;
  callForPapersUrl: string | null;
  events: Event[];
}
