import env from '@/resources/env';

import { AbstractRequest as BaseAbstractRequest } from '../abstract.request';

import type { APIRequestContext } from '@playwright/test';

interface RequestConfig {
  baseURL: string;
  apiKey: string;
}

export abstract class AbstractRequest extends BaseAbstractRequest<RequestConfig> {
  constructor(protected override readonly request: APIRequestContext) {
    super(request, {
      baseURL: env.REQRES_BASE_URL,
      apiKey: env.REQRES_API_KEY,
    });
  }
}
