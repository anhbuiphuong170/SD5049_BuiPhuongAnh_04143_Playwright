import { test, expect } from '@playwright/test';
import { BookStorePage } from '../pages/book-store.page.js';

const expectedTitles = [
  'Learning JavaScript Design Patterns',
  'Designing Evolvable Web APIs with ASP.NET',
];

for (const keyword of ['Design', 'design']) {
  test(`Search returns matching books for "${keyword}"`, async ({ page }) => {
    const store = new BookStorePage(page);
    const unrelatedBook = store.bookTitle('Git Pocket Guide');

    await store.open();
    await expect(unrelatedBook).toBeVisible();

    await store.searchFor(keyword);

    for (const title of expectedTitles) {
      await expect(store.bookTitle(title)).toBeVisible();
    }

    await expect(unrelatedBook).toBeHidden();
  });
}