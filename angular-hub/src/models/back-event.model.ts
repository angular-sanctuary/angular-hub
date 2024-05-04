export interface BackEvent {
  name: string | null;
  type: 'workshop' | 'conference' | 'meetup' | 'other';
  location: string | null;
  url: string | null;
  date: string;
  language: string;
  isFree: boolean;
  isRemote: boolean;
  isOnsite: boolean;
  callForPapers: string | null;
  callForPapersEndDate: string | null;
}
