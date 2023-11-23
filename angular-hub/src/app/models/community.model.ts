import { EventType } from './event-type.model';

export interface Community {
  title: string;
  location: string;
  logo: string;
  url: string;
  type: EventType;
}
