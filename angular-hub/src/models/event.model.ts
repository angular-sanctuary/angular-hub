export interface Community {
  title: string;
  type: 'meetup' | 'conference' | 'workshop' | 'other';
  location: string;
  date: string;
  url: string;
  tags: string[];
  language: string;
  cfpDeadline?: string;
}
