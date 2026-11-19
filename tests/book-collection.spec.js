import { test, expect } from '@playwright/test';
import { BookStorePage } from '../pages/book-store.page.js';

const bookTitle = 'Learning JavaScript Design Patterns';

async function clickAndAcceptAlert(page, button) {
  const [message] = await Promise.all([
    page.waitForEvent('dialog').then(async (dialog) => {
      const message = dialog.message();
      await dialog.accept();
      return message;
    }),
    button.click(),
  ]);

  return message;
}

test('Add a book to the collection and delete it successfully', async ({ page }) => {
  const { DEMOQA_USERNAME: username, DEMOQA_PASSWORD: password } = process.env;

  if (!username || !password) {
    throw new Error('Set DEMOQA_USERNAME and DEMOQA_PASSWORD in the .env file.');
  }

  const bookStore = new BookStorePage(page);
  const profileBook = page.getByRole('link', { name: bookTitle, exact: true });

  async function addBook() {
    await bookStore.open();
    await bookStore.bookTitle(bookTitle).click();

    return clickAndAcceptAlert(
      page,
      page.getByRole('button', { name: 'Add To Your Collection', exact: true }),
    );
  }

  async function openProfileAndFindBook() {
    await page.goto('https://demoqa.com/profile');
    await page.getByPlaceholder('Type to search', { exact: true }).fill(bookTitle);
    await expect(profileBook).toBeVisible();
  }

  async function deleteBook() {
    const bookRow = page.getByRole('row').filter({ has: profileBook });
    await bookRow.locator('[id^="delete-record"], [title="Delete"]').first().click();

    const message = await clickAndAcceptAlert(
      page,
      page.getByRole('button', { name: 'OK', exact: true }),
    );

    expect(message).toBe('Book deleted.');
    await expect(profileBook).toHaveCount(0);
  }

  await test.step('Log in to DemoQA', async () => {
    await page.goto('https://demoqa.com/login');
    await page.locator('#userName').fill(username);
    await page.locator('#password').fill(password);
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    await expect(page).toHaveURL(/\/profile\/?$/);
  });

  await test.step('Add the book and verify it appears in Profile', async () => {
    let message = await addBook();

    if (/already.*collection/i.test(message)) {
      await openProfileAndFindBook();
      await deleteBook();
      message = await addBook();
    }

    expect(message).toMatch(/book added to your collection/i);
    await openProfileAndFindBook();
  });

  await test.step('Delete the book and verify it is removed from Profile', async () => {
    await deleteBook();
  });
});