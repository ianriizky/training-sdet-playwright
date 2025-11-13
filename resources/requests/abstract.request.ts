import { faker } from '@faker-js/faker';

import env from '../env';

import type { APIRequestContext } from '@playwright/test';

interface RequestConfig {
  baseURL: string;
}

export abstract class AbstractRequest<
  TConfig extends RequestConfig = RequestConfig,
> {
  protected readonly env: typeof env;
  protected readonly faker: typeof faker;

  constructor(
    protected readonly request: APIRequestContext,
    protected readonly config: TConfig,
  ) {
    this.env = env;
    this.faker = faker;
  }
}
