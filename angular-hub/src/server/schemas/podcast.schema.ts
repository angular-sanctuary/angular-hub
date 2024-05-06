import { array, object, string } from 'valibot';

export const PodcastSchema = object({
  name: string(),
  url: string(),
  logo: string(),
  language: string(),
});

export const PodcastListSchema = array(PodcastSchema);
