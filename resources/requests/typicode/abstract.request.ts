import env from '@/resources/env';

import { AbstractRequest as BaseAbstractRequest } from '../abstract.request';

import type { APIRequestContext } from '@playwright/test';

export abstract class AbstractRequest extends BaseAbstractRequest {
  constructor(protected override readonly request: APIRequestContext) {
    super(request, { baseURL: env.TYPICODE_BASE_URL });
  }
}
