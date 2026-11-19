import { test, expect } from '@playwright/test';
import { BookStorePage } from '../pages/book-store.page.js';

const searchKeywords = ['Design', 'design'];
const expectedTitles = [
  'Learning JavaScript Design Patterns',
  'Designing Evolvable Web APIs with ASP.NET',
];
const unrelatedTitle = 'Git Pocket Guide';

for (const keyword of searchKeywords) {
  test(`Search returns matching books for "${keyword}"`, async ({ page }) => {
    const bookStore = new BookStorePage(page);

    await bookStore.open();
    await expect(bookStore.bookTitle(unrelatedTitle)).toBeVisible();

    await bookStore.searchFor(keyword);

    for (const title of expectedTitles) {
      await expect(bookStore.bookTitle(title)).toBeVisible();
    }

    await expect(bookStore.bookTitle(unrelatedTitle)).toBeHidden();
  });
}