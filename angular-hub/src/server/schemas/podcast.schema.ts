import { array, nullable, object, string } from 'valibot';

export const PodcastSchema = object({
  name: string(),
  logo: string(),
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

export const PodcastListSchema = array(PodcastSchema);
