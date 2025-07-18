import { Event } from './event.model';

export type Community = {
  name: string;
  type: 'company' | 'community' | 'angular-community';
  // change to nested 2 properties (city / country) || Online
  location: string | null;
  logo: string | null;
  eventsUrl: string | null;
  websiteUrl: string | null;
  organizersUrl: string | null;
  blueskyUrl: string | null;
  xUrl: string | null;
  linkedinUrl: string | null;
  youtubeUrl: string | null;
  twitchUrl: string | null;
  callForPapersUrl: string | null;
};
