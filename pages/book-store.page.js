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
}