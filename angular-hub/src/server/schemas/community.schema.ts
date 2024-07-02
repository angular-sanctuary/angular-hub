import { array, nullable, object, picklist, string } from 'valibot';
import { EventSchema } from './event.schema';

export const CommunitySchema = object({
  name: string(),
  type: picklist(['workshop', 'conference', 'meetup', 'other']),
  location: nullable(string()),
  url: nullable(string()),
  mediaChannel: nullable(
    object({
      url: string(),
      language: string(),
    }),
  ),
  logo: nullable(string()),
  twitter: nullable(string()),
  linkedin: nullable(string()),
  callForPapers: nullable(string()),
  events: array(EventSchema),
});

export const CommunityListSchema = array(CommunitySchema);
