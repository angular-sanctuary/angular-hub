import { LanguageTag } from './language.model';

export type EventTag = 'On-Site' | 'Online' | 'Free';

export interface Event {
  name: string;
  description: string;
  date: string;
  url: string;
  logo: string;
  location: string;
  tags: EventTag[];
  language: LanguageTag;
  community: {
    name: string;
    logo: string;
  };
}
