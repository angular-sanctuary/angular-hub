import { Community } from './community.model';
import { Event } from './event.model';

export type CommunityEvent = Event & {
  organizer: {
    name: string;
    url: string;
    logo: string;
  }
}
