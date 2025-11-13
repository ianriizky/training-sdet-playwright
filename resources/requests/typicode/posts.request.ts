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

  async assertIndex(response: APIResponse<ResponseBody[]>): Promise<void> {
    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.length).toBeGreaterThan(0);
  }

  async assertStore(
    response: APIResponse<ResponseBody>,
    actual: { data: RequestBody },
  ): Promise<void> {
    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.title).toBe(actual.data.title);
    expect(body.body).toBe(actual.data.body);
    expect(body.userId).toBe(actual.data.userId);
  }

  async assertShow(
    response: APIResponse<ResponseBody>,
    actual?: { data: RequestBody },
  ): Promise<void> {
    expect(response.status()).toBe(200);

    const body = await response.json();

    if (actual) {
      expect(body.title).toBe(actual.data.title);
      expect(body.body).toBe(actual.data.body);
      expect(body.userId).toBe(actual.data.userId);
    }
  }

  async assertUpdate(
    response: APIResponse<ResponseBody>,
    actual: { data: RequestBody },
  ): Promise<void> {
    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.title).toBe(actual.data.title);
    expect(body.body).toBe(actual.data.body);
    expect(body.userId).toBe(actual.data.userId);
  }

  assertDestroy(response: APIResponse<ResponseBody>): void {
    expect(response.status()).toBe(200);
  }
}
