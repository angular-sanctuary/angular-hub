import { boolean, nullable, object, picklist, string, optional } from 'valibot';

export const EventSchema = object({
  name: nullable(string()),
  type: picklist(['workshop', 'conference', 'meetup', 'other']),
  location: nullable(string()),
  url: nullable(string()),
  date: nullable(string()),
  language: string(),
  isFree: boolean(),
  isRemote: boolean(),
  isOnsite: boolean(),
  callForPapersUrl: nullable(string()),
  callForPapersDueDate: nullable(string()),
  toBeAnnounced: optional(boolean()),
});
