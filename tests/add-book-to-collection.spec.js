import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';
import { BookStorePage } from '../pages/book-store.page.js';
import { ProfilePage } from '../pages/profile.page.js';

test('Add a book to the collection', async ({ page }) => {
  const title = 'Git Pocket Guide';
  const login = new LoginPage(page);
  const store = new BookStorePage(page);
  const profile = new ProfilePage(page);

  await login.signIn();

  let message = await store.addToCollection(title);

  if (/already.*collection/i.test(message)) {
    await profile.findBook(title);
    await profile.deleteBook(title);
    await expect(profile.bookTitle(title)).toHaveCount(0);

    message = await store.addToCollection(title);
  }

  expect(message).toMatch(/book added to your collection/i);

  await profile.findBook(title);
  await expect(profile.bookTitle(title)).toBeVisible();

  await test.step('Clean up the added book', async () => {
    await profile.deleteBook(title);
    await expect(profile.bookTitle(title)).toHaveCount(0);
  });
});