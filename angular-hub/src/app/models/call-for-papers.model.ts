import { EventType } from './event-type.model';

export interface CallForPapers {
  title: string;
  logo: string;
  type: EventType;
  url: string;
  deadline: string;
  eventDate: string;
  location: string;
}
