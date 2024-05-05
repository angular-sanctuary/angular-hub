import { EventType } from './event-type.model';

export interface Community {
  name: string;
  location: string;
  logo: string;
  url: string;
  type: EventType;
}
