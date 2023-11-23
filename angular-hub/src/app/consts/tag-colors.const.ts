import { EventTag } from '../models/event.model';
import { LanguageTag } from '../models/language.model';

export type Tag = EventTag | LanguageTag;

export const TAG_COLORS_MAP: Record<Tag, string> = {
  'On-Site': '#963232',
  Online: '#328496',
  Free: '#629632',
  English: '#323296',
  Spanish: '#963296',
};
