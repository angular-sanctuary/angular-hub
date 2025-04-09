import { array, nullable, object, picklist, string } from 'valibot';
import { EventSchema } from './event.schema';

export const CommunitySchema = object({
  name: string(),
  type: picklist(['workshop', 'conference', 'meetup', 'other']),
  location: nullable(string()),
  logo: nullable(string()),
  eventsUrl: nullable(string()),
  websiteUrl: nullable(string()),
  organizersUrl: nullable(string()),
  blueskyUrl: nullable(string()),
  twitterUrl: nullable(string()),
  linkedinUrl: nullable(string()),
  youtubeUrl: nullable(string()),
  twitchUrl: nullable(string()),
  callForPapersUrl: nullable(string()),
  events: array(EventSchema),
});

export const CommunityListSchema = array(CommunitySchema);
