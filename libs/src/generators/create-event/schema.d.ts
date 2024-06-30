export interface CreateEventGeneratorSchema {
  name?: string;
  type: 'workshop' | 'conference' | 'meetup' | 'other';
  location?: string | null;
  date: string;
  language: string;
  isFree: boolean;
  isRemote: boolean;
  isOnsite: boolean;
  callForPapers?: string | null;
  callForPapersDueDate?: string | null;
  url?: string;
  communityName: string;
}
