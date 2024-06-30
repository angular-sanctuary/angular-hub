export interface CreateCommunityGeneratorSchema {
  name: string;
  type: 'workshop' | 'conference' | 'meetup' | 'other';
  location?: string;
  url?: string;
  logo?: string;
  twitter?: string;
  linkedin?: string;
  callForPapers?: string;
}
