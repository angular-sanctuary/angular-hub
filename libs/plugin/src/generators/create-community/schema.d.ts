export interface CreateCommunityGeneratorSchema {
  name: string;
  type: 'workshop' | 'conference' | 'meetup' | 'other';
  location?: string;
  url?: string;
  logo?: string;
  bluesky?: string;
  x?: string;
  linkedin?: string;
  callForPapers?: string;
}
