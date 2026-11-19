import { clickAndAcceptAlert } from '../helpers/click-and-accept-alert.js';

export class BookStorePage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Type to search', { exact: true });
  }

  async open() {
    await this.page.goto('https://demoqa.com/books');
  }

  async searchFor(keyword) {
    await this.searchInput.fill(keyword);
  }

  bookTitle(title) {
    return this.page.getByText(title, { exact: true });
  }

  async addToCollection(title) {
    await this.open();
    await this.bookTitle(title).click();

    const addButton = this.page.getByRole('button', {
      name: 'Add To Your Collection',
      exact: true,
    });

    return clickAndAcceptAlert(this.page, addButton);
  }
}