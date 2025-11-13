import { faker } from '@faker-js/faker';
import test from '@playwright/test';

import { PostsRequest } from '@/resources/requests/typicode/posts.request';

test.describe('Typicode - /posts', { tag: '@typicode' }, () => {
  let postsRequest: PostsRequest;

  test.beforeEach(({ request }) => {
    postsRequest = new PostsRequest(request);
  });

  test('GET - index posts', async () => {
    const response = await postsRequest.performIndex();

    await postsRequest.assertIndex(response);
  });

  test('POST - store post', async () => {
    const data = {
      title: faker.lorem.text(),
      body: faker.lorem.paragraph(),
      userId: faker.number.int(),
    };

    const response = await postsRequest.performStore({ data });

    await postsRequest.assertStore(response, { data });
  });

  test('PUT - update post', async () => {
    const data = {
      title: faker.lorem.text(),
      body: faker.lorem.paragraph(),
      userId: faker.number.int(),
    };

    const response = await postsRequest.performUpdate(1, { data });

    await postsRequest.assertUpdate(response, { data });
  });

  test('DELETE - delete post', async () => {
    const response = await postsRequest.performDestroy(1);

    postsRequest.assertDestroy(response);
  });
});
