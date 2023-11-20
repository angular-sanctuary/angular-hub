export type EventTag = 'On-Site' | 'Online' | 'Free';

export interface Event {
  title: string;
  description: string;
  date: string;
  url: string;
  logo: string;
  location: string;
  tags: EventTag[];
}
