import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { createCommunityGenerator } from './generator';
import { CreateCommunityGeneratorSchema } from './schema';

describe('create-community generator', () => {
  let tree: Tree;
  const options: CreateCommunityGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await createCommunityGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
