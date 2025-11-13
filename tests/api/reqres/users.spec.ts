import { faker } from '@faker-js/faker';
import test from '@playwright/test';

import { UsersRequest } from '@/resources/requests/reqres/users.request';

test.describe('ReqRes - /users', { tag: '@reqres' }, () => {
  let usersRequest: UsersRequest;

  test.beforeEach(({ request }) => {
    usersRequest = new UsersRequest(request);
  });

  test('GET - index users', async () => {
    const response = await usersRequest.performIndex();

    await usersRequest.assertIndex(response);
  });

  test('POST - store user', async () => {
    const data = {
      name: faker.person.fullName(),
      job: faker.person.jobTitle(),
    };

    const response = await usersRequest.performStore({ data });

    await usersRequest.assertStore(response, { data });
  });

  test('PUT - update user', async () => {
    const data = {
      name: faker.person.fullName(),
      job: faker.person.jobTitle(),
    };

    const response = await usersRequest.performUpdate(2, { data });

    await usersRequest.assertUpdate(response, { data });
  });

  test('DELETE - delete user', async () => {
    const response = await usersRequest.performDestroy(2);

    usersRequest.assertDestroy(response);
  });
});
