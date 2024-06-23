import { logger, readJson, Tree, updateJson } from '@nx/devkit';
import { CreatePodcastGeneratorSchema } from './schema';
import { exit } from 'node:process';
import { Podcast } from '../models/podcast';

const PODCASTS_PATH = 'angular-hub/src/public/assets/data/podcast.json';

export async function createPodcastGenerator(
  tree: Tree,
  options: CreatePodcastGeneratorSchema,
) {
  const { name, logo, language, url } = options;

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

  if (!logo) {
    logger.error('[angular-hub] Logo is missing');
    return exit(1);
  }

  if (!url) {
    logger.error('[angular-hub] Url is missing');
    return exit(1);
  }

  if (!language) {
    logger.error('[angular-hub] Language is missing');
    return exit(1);
  }

  const existingPodcasts: Podcast[] = readJson(tree, PODCASTS_PATH);

  if (isPodcastExisting(existingPodcasts, name)) {
    logger.error(`[angular-hub] ${name} Podcast already exists`);
    return exit(1);
  }

  updateJson(tree, PODCASTS_PATH, (podcasts: Podcast[]) => {
    podcasts.push({
      name,
      language,
      url,
      logo,
    });

    return podcasts;
  });

  logger.info(
    `[angular-hub] Podcast is added successfully. You can manually update the data if needed afterwards`,
  );
}

function isPodcastExisting(podcasts: Podcast[], name: string): boolean {
  return podcasts
    .map((podcast) => podcast.name.toLowerCase())
    .includes(name.toLowerCase());
}

export default createPodcastGenerator;
