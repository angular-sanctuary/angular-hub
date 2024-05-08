import { boolean, nullable, object, picklist, string } from 'valibot';

export const EventSchema = object({
  name: nullable(string()),
  type: picklist(['workshop', 'conference', 'meetup', 'other']),
  location: nullable(string()),
  url: nullable(string()),
  date: string(),
  language: string(),
  isFree: boolean(),
  isRemote: boolean(),
  isOnsite: boolean(),
  callForPapers: nullable(string()),
  callForPapersDueDate: nullable(string()),
});
