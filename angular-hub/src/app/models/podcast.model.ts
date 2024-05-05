import { LanguageTag } from './language.model';

export interface Podcast {
  name: string;
  url: string;
  logo: string;
  language: LanguageTag;
}
