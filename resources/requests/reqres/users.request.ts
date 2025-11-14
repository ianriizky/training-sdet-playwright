import test, {
  type APIResponse as BaseAPIResponse,
  expect,
} from '@playwright/test';

import { AbstractRequest } from './abstract.request';

interface RequestBody {
  name: string;
  job: string;
}

interface ResponseBody {
  id: string;
  name: string;
  job: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ListResponseBody {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ResponseBody[];
}

interface APIResponse<TJson> extends BaseAPIResponse {
  json(): Promise<TJson>;
}

export class UsersRequest extends AbstractRequest {
  performIndex(options?: {
    params?: {
      page?: number;
    };
  }): Promise<APIResponse<ListResponseBody>> {
    return test.step('Index users', async () => {
      return this.request.get(`${this.config.baseURL}/users`, {
        headers: {
          'x-api-key': this.config.apiKey,
        },
        params: {
          page: options?.params?.page ?? 1,
        },
      });
    });
  }

  performStore(options: {
    data: RequestBody;
  }): Promise<APIResponse<ResponseBody>> {
    return test.step('Store user', async () => {
      return this.request.post(`${this.config.baseURL}/users`, {
        headers: {
          'x-api-key': this.config.apiKey,
        },
        data: {
          name: options.data.name ?? this.faker.person.fullName(),
          job: options.data.job ?? this.faker.person.jobTitle(),
        },
      });
    });
  }

  performShow(
    id: string | number,
  ): Promise<APIResponse<{ data: ResponseBody }>> {
    return test.step('Show user', async () => {
      return this.request.get(`${this.config.baseURL}/users/${id}`, {
        headers: {
          'x-api-key': this.config.apiKey,
        },
      });
    });
  }

  performUpdate(
    id: string | number,
    options: {
      data: RequestBody;
    },
  ): Promise<APIResponse<ResponseBody>> {
    return test.step('Update user', async () => {
      return this.request.put(`${this.config.baseURL}/users/${id}`, {
        headers: {
          'x-api-key': this.config.apiKey,
        },
        data: options.data,
      });
    });
  }

  performDestroy(id: string | number): Promise<APIResponse<void>> {
    return test.step('Destroy user', async () => {
      return this.request.delete(`${this.config.baseURL}/users/${id}`, {
        headers: {
          'x-api-key': this.config.apiKey,
        },
      });
    });
  }

  async assertIndex(actual: APIResponse<ListResponseBody>): Promise<void> {
    expect(actual.status()).toBe(200);

    const body = await actual.json();

    expect(body.data).toBeDefined();
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
  }

  async assertStore(
    actual: APIResponse<ResponseBody>,
    expected: { data: RequestBody },
  ): Promise<void> {
    expect(actual.status()).toBe(201);

    const body = await actual.json();

    expect(body.name).toBe(expected.data.name);
    expect(body.job).toBe(expected.data.job);
    expect(body.id).toBeDefined();
    expect(body.createdAt).toBeDefined();
  }

  async assertShow(
    actual: APIResponse<{ data: ResponseBody }>,
    expected?: { data: RequestBody },
  ): Promise<void> {
    expect(actual.status()).toBe(200);

    const body = await actual.json();

    expect(body.data).toBeDefined();
    expect(body.data.id).toBeDefined();

    if (expected) {
      expect(body.data.name).toBe(expected.data.name);
      expect(body.data.job).toBe(expected.data.job);
    }
  }

  async assertUpdate(
    actual: APIResponse<ResponseBody>,
    expected: { data: RequestBody },
  ): Promise<void> {
    expect(actual.status()).toBe(200);

    const body = await actual.json();

    expect(body.name).toBe(expected.data.name);
    expect(body.job).toBe(expected.data.job);
    expect(body.updatedAt).toBeDefined();
  }

  assertDestroy(actual: APIResponse<void>): void {
    expect(actual.status()).toBe(204);
  }
}
