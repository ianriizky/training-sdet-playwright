import type { FullConfig } from '@playwright/test';

export default async function globalTeardown(config: FullConfig) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.info('Global teardown executed in 2 seconds');
  console.info('Config: ', JSON.stringify(config));
}
