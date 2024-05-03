import { defineEventHandler } from 'h3';
import communities from '../../../public/assets/data/community.json';

export default defineEventHandler((event) => {
  const searchParams = event.path.split('?')[1];
  const urlParams = new URLSearchParams(searchParams);
  const type = urlParams.get('type');

  const filteredCommunities = communities.filter((community) => {
    if (!type) {
      return community.callForPapers;
    }

    if (type === 'meetup') {
      return community.callForPapers && community.type === 'meetup';
    }

    if (type === 'conference') {
      const openCFP = community.events.find(
        (event) => new Date(event.callForPapersEndDate) > new Date(),
      );
      return community.type === 'conference' && openCFP;
    }
  });

  return filteredCommunities;
});
