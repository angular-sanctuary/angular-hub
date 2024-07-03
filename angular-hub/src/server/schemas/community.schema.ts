import { array, nullable, object, picklist, string } from 'valibot';
import { EventSchema } from './event.schema';

export const CommunitySchema = object({
  name: string(),
  type: picklist(['workshop', 'conference', 'meetup', 'other']),
  location: nullable(string()),
  url: nullable(string()),
  logo: nullable(string()),
  twitter: nullable(string()),
  linkedin: nullable(string()),
  callForPapers: nullable(string()),
  events: array(EventSchema),
  language: string(),
  mediaChannels: nullable(
    array(
      object({
        platform: string(),
        url: string(),
      }),
    ),
  ),
});

export const CommunityListSchema = array(CommunitySchema);
