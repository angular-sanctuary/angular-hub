import { Event } from './event.model';
import { MediaChannel } from './media-channel.model';

export interface Community {
  name: string;
  type: 'workshop' | 'conference' | 'meetup' | 'other';
  location: string | null;
  url: string | null;
  mediaChannel: MediaChannel | null;
  logo: string | null;
  twitter: string | null;
  linkedin: string | null;
  callForPapers: string | null;
  events: Event[];
}
