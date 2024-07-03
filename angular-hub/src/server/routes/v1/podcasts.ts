import { defineEventHandler, getQuery } from 'h3';
import podcasts from '../../../public/assets/data/podcast.json';
import { parse } from 'valibot';
import { PodcastListSchema } from '../../schemas/podcast.schema';
import { CommunityListSchema } from '../../schemas/community.schema';
import communities from '../../../public/assets/data/community.json';

export default defineEventHandler((evt) => {
  const { order } = getQuery(evt);
  try {
    parse(PodcastListSchema, podcasts);
    parse(CommunityListSchema, communities);

    const communitiesMedia = communities
      .filter((community) => community.mediaChannels)
      .map((community) => ({
        name: community.name,
        logo: community.logo,
        mediaChannels: community.mediaChannels,
        language: community.language,
      }));

    return [...podcasts, ...communitiesMedia].sort((a, b) =>
      orderPredicate(order, a.name, b.name),
    );
  } catch (error) {
    throw new Error('Invalid podcast data format');
  }
});

function orderPredicate(order: 'ASC' | 'DESC' = 'DESC', a: string, b: string) {
  if (order === 'DESC') {
    return a.localeCompare(b);
  } else {
    return b.localeCompare(a);
  }
}
