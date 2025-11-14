import type { FullConfig } from '@playwright/test';

export default async function globalSetup(config: FullConfig) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.info('Global setup executed in 2 seconds');
  console.info('Config: ', JSON.stringify(config));
}
