import test, {
  type APIResponse as BaseAPIResponse,
  expect,
} from '@playwright/test';

import env from '@/resources/env';

import { AbstractRequest } from './abstract.request';

interface RequestBody {
  title: string;
  body: string;
  userId: number;
}

interface ResponseBody {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface APIResponse<TJson> extends BaseAPIResponse {
  json(): Promise<TJson>;
}

export class PostsRequest extends AbstractRequest {
  performIndex(): Promise<APIResponse<ResponseBody[]>> {
    return test.step('Index posts', async () => {
      return this.request.get(`${this.config.baseURL}/posts`);
    });
  }

  performStore(options: {
    data: RequestBody;
  }): Promise<APIResponse<ResponseBody>> {
    return test.step('Store post', async () => {
      return this.request.post(`${env.TYPICODE_BASE_URL}/posts`, {
        data: {
          title: options.data.title ?? this.faker.lorem.text(),
          body: options.data.body ?? this.faker.lorem.paragraph(),
          userId: options.data.userId ?? this.faker.number.int(),
        },
      });
    });
  }

  performShow(id: string | number): Promise<APIResponse<ResponseBody>> {
    return test.step('Show post', async () => {
      return this.request.get(`${this.config.baseURL}/posts/${id}`);
    });
  }

  performUpdate(
    id: string | number,
    options: {
      data: RequestBody;
    },
  ): Promise<APIResponse<ResponseBody>> {
    return test.step('Update post', async () => {
      return this.request.put(`${this.config.baseURL}/posts/${id}`, {
        data: options.data,
      });
    });
  }

  performDestroy(id: string | number): Promise<APIResponse<ResponseBody>> {
    return test.step('Destroy post', async () => {
      return this.request.delete(`${this.config.baseURL}/posts/${id}`);
    });
  }

  async assertIndex(actual: APIResponse<ResponseBody[]>): Promise<void> {
    expect(actual.status()).toBe(200);

    const body = await actual.json();

    expect(body.length).toBeGreaterThan(0);
  }

  async assertStore(
    actual: APIResponse<ResponseBody>,
    expected: { data: RequestBody },
  ): Promise<void> {
    expect(actual.status()).toBe(201);

    const body = await actual.json();

    expect(body.title).toBe(expected.data.title);
    expect(body.body).toBe(expected.data.body);
    expect(body.userId).toBe(expected.data.userId);
  }

  async assertShow(
    actual: APIResponse<ResponseBody>,
    expected?: { data: RequestBody },
  ): Promise<void> {
    expect(actual.status()).toBe(200);

    const body = await actual.json();

    if (expected) {
      expect(body.title).toBe(expected.data.title);
      expect(body.body).toBe(expected.data.body);
      expect(body.userId).toBe(expected.data.userId);
    }
  }

  async assertUpdate(
    actual: APIResponse<ResponseBody>,
    expected: { data: RequestBody },
  ): Promise<void> {
    expect(actual.status()).toBe(200);

    const body = await actual.json();

    expect(body.title).toBe(expected.data.title);
    expect(body.body).toBe(expected.data.body);
    expect(body.userId).toBe(expected.data.userId);
  }

  assertDestroy(actual: APIResponse<ResponseBody>): void {
    expect(actual.status()).toBe(200);
  }
}
