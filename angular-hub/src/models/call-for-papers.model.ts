export interface CallForPapers {
  name: string;
  type: 'workshop' | 'conference' | 'meetup' | 'other';
  logo: string | null;
  location: string | null;
  url: string;
  callForPapersUrl: string;
}

export type EventCallForPapers = CallForPapers & {
  date: string;
  callForPapersDueDate: string | null;
  isRemote: boolean;
  isOnsite: boolean;
};
