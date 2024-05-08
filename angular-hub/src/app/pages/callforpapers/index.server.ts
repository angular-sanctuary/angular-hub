import { PageServerLoad } from '@analogjs/router';
import {
  CallForPapers,
  EventCallForPapers,
} from '../../../models/call-for-papers.model';

export const load = async ({
  fetch,
}: PageServerLoad): Promise<{
  events: EventCallForPapers[];
  communities: CallForPapers[];
}> => {
  return await Promise.all([
    fetch<EventCallForPapers[]>('/api/v1/events/callforpapers'),
    fetch<CallForPapers[]>('/api/v1/communities/callforpapers'),
  ]).then(([events, communities]) => ({ events, communities }));
};
