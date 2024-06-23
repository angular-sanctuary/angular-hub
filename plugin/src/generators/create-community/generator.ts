import { logger, readJson, Tree, updateJson } from '@nx/devkit';
import { CreateCommunityGeneratorSchema } from './schema';
import { exit } from 'node:process';
import { Community } from '../models/community';

const COMMUNITIES_PATH = 'angular-hub/src/public/assets/data/community.json';

export async function createCommunityGenerator(
  tree: Tree,
  options: CreateCommunityGeneratorSchema,
) {
  const { name, type } = options;

  const packageJson = readJson(tree, 'package.json');
  const angularCorePackage = packageJson['dependencies']['@angular/core'];

  if (!angularCorePackage) {
    logger.error(`[angular-hub] No @angular/core detected`);
    return exit(1);
  }

  if (!name) {
    logger.error('[angular-hub] Name is missing');
    return exit(1);
  }

  if (!type) {
    logger.error('[angular-hub] Type is missing');
    return exit(1);
  }

  const existingCommunities: Community[] = readJson(tree, COMMUNITIES_PATH);

  if (isCommunityExisting(existingCommunities, name)) {
    logger.error(`[angular-hub] ${name} Community already exists`);
    return exit(1);
  }

  updateJson(tree, COMMUNITIES_PATH, (communities: Community[]) => {
    communities.push({
      name,
      type,
      url: options.url ?? '',
      location: options.location ?? '',
      logo: options.logo ?? '',
      twitter: options.twitter ?? '',
      linkedin: options.linkedin ?? '',
      callForPapers: options.callForPapers ?? '',
      events: [],
    });

    return communities;
  });

  logger.info(
    `[angular-hub] Community is added successfully. You can manually update the data if needed afterwards`,
  );
}

function isCommunityExisting(communities: Community[], name: string): boolean {
  return communities
    .map((community) => community.name.toLowerCase())
    .includes(name.toLowerCase());
}

export default createCommunityGenerator;
