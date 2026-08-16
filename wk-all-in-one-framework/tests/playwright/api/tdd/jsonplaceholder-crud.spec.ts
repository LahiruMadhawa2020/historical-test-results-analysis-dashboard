import { test, expect } from '@playwright/test';

const apiUrl = process.env.WK_API_URL ?? 'https://jsonplaceholder.typicode.com/';

test.describe('WK Playwright TS API CRUD', () => {
  test('1. Create Post', async ({ request }) => {
    const create = await request.post(`${apiUrl}posts/`, {
      data: { title: 'wk', body: 'create', userId: 1 }
    });
    expect(create.status()).toBe(201);
    expect(await create.json()).toMatchObject({ id: expect.any(Number) });
  });

  test('2. Get Post', async ({ request }) => {
    const read = await request.get(`${apiUrl}posts/1`);
    expect(read.status()).toBe(200);
    expect(await read.json()).toMatchObject({ id: 1 });
  });

  test('3. Update Post', async ({ request }) => {
    const update = await request.put(`${apiUrl}posts/1`, {
      data: { id: 1, title: 'wk-updated', body: 'update', userId: 1 }
    });
    expect(update.status()).toBe(200);
    expect(await update.json()).toMatchObject({ title: 'wk-updated' });
  });

  test('4. Delete Post', async ({ request }) => {
    const remove = await request.delete(`${apiUrl}posts/1`);
    expect(remove.status()).toBe(200);
  });
});
