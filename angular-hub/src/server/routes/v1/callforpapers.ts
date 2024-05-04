import { defineEventHandler, getQuery } from 'h3';
import communities from '../../../public/assets/data/community.json';

export default defineEventHandler((event) => {
  const { type } = getQuery(event);

  const filteredCommunities = communities.filter((community) => {
    if (!type) {
      return community.callForPapers;
    }

    if (type === 'meetup') {
      return community.callForPapers && community.type === 'meetup';
    }

    if (type === 'conference' || type === 'workshop') {
      const openCFP = community.events.find(
        (event) => new Date(event.callForPapersEndDate) > new Date(),
      );
      return community.type === type && openCFP;
    }
  });

  return filteredCommunities;
});
