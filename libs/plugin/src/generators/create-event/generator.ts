import { Tree, logger, readJson, updateJson } from '@nx/devkit';
import { CreateEventGeneratorSchema } from './schema';
import { exit } from 'node:process';
import { Community } from '../models/community';

const COMMUNITIES_PATH = 'angular-hub/src/public/assets/data/community.json';

export async function createEventGenerator(
  tree: Tree,
  options: CreateEventGeneratorSchema,
) {
  if (!options.communityName) {
    logger.error('[angular-hub] Community name is missing');
    return exit(1);
  }

  if (!options.type) {
    logger.error('[angular-hub] Type is missing');
    return exit(1);
  }

  if (!options.date) {
    logger.error('[angular-hub] Date is missing');
    return exit(1);
  }

  if (!options.language) {
    logger.error('[angular-hub] Language is missing');
    return exit(1);
  }

  if (options.isFree === null || options.isFree === undefined) {
    logger.error('[angular-hub] isFree is missing');
    return exit(1);
  }

  if (options.isRemote === null || options.isRemote === undefined) {
    logger.error('[angular-hub] isRemote is missing');
    return exit(1);
  }

  if (options.isOnsite === null || options.isOnsite === undefined) {
    logger.error('[angular-hub] isOnsite is missing');
    return exit(1);
  }

  const communities: Community[] = readJson(tree, COMMUNITIES_PATH);
  const selectedCommunity = communities.find(
    (community) =>
      community.name.toLowerCase() == options.communityName.toLowerCase(),
  );

  if (!selectedCommunity) {
    logger.error(
      `[angular-hub] ${options.communityName} Community does not exists`,
    );
    return exit(1);
  }

  if (isEventExisting(selectedCommunity, options)) {
    logger.error(`[angular-hub] ${options.name} Event already exists`);
    return exit(1);
  }

  updateJson(tree, COMMUNITIES_PATH, (communities: Community[]) => {
    const communityToUpdateIdx = communities.findIndex(
      (community) => community.name == selectedCommunity.name,
    );

    if (communityToUpdateIdx != -1) {
      communities[communityToUpdateIdx].events.push({
        name: options.name ?? '',
        type: options.type,
        location: options.location ?? '',
        date: options.date,
        language: options.language,
        isFree: options.isFree,
        isRemote: options.isRemote,
        isOnsite: options.isOnsite,
        callForPapers: options.callForPapers ?? '',
        callForPapersDueDate: options.callForPapersDueDate ?? '',
        url: options.url ?? '',
      });
    }

    return communities;
  });

  logger.info(
    `[angular-hub] Event is added successfully. You can manually update the data if needed afterwards`,
  );
}

function isEventExisting(
  community: Community,
  {
    name,
    date,
    type,
  }: Pick<CreateEventGeneratorSchema, 'name' | 'date' | 'type'>,
): boolean {
  return !!community.events.find(
    (event) =>
      event.type == type &&
      event.date == date &&
      event.name.toLowerCase() == name.toLowerCase(),
  );
}

export default createEventGenerator;
