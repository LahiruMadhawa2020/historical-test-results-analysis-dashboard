import { test, expect } from '@playwright/test';

const apiUrl = process.env.SR_LINK_API_URL ?? 'https://jsonplaceholder.typicode.com/';

test('Sr Link Playwright TS API CRUD', async ({ request }) => {
  const create = await request.post(`${apiUrl}posts/`, {
    data: { title: 'sr-link', body: 'create', userId: 1 }
  });
  expect(create.status()).toBe(201);

  const read = await request.get(`${apiUrl}posts/1`);
  expect(read.status()).toBe(200);
  expect(await read.json()).toMatchObject({ id: 1 });

  const update = await request.put(`${apiUrl}posts/1`, {
    data: { id: 1, title: 'sr-link-updated', body: 'update', userId: 1 }
  });
  expect(update.status()).toBe(200);

  const remove = await request.delete(`${apiUrl}posts/1`);
  expect(remove.status()).toBe(200);
});
