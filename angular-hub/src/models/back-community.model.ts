import { BackEvent } from './back-event.model';

export interface BackCommunity {
  name: string;
  type: 'workshop' | 'conference' | 'meetup' | 'other';
  location: string | null;
  url: string | null;
  logo: string | null;
  twitter: string | null;
  linkedin: string | null;
  callForPapers: string | null;
  events: BackEvent[];
}
