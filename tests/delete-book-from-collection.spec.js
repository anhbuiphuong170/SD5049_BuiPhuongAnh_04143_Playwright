import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';
import { BookStorePage } from '../pages/book-store.page.js';
import { ProfilePage } from '../pages/profile.page.js';

test('Delete a book from the collection', async ({ page }) => {
  const title = 'Learning JavaScript Design Patterns';
  const login = new LoginPage(page);
  const store = new BookStorePage(page);
  const profile = new ProfilePage(page);

  await login.signIn();

  await test.step('Ensure the book is in the collection', async () => {
    const message = await store.addToCollection(title);
    expect(message).toMatch(/book added to your collection|already.*collection/i);

    await profile.findBook(title);
    await expect(profile.bookTitle(title)).toBeVisible();
  });

  const message = await profile.deleteBook(title);

  expect(message).toBe('Book deleted.');
  await expect(profile.bookTitle(title)).toHaveCount(0);
});