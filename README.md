# DemoQA Book Store — Playwright Tests

End-to-end tests for the [DemoQA Book Store](https://demoqa.com/books), written in JavaScript with Playwright Test.

## Test coverage

| Test file | What it verifies |
| --- | --- |
| `tests/search-books.spec.js` | Runs two tests, one for `Design` and one for `design`. Both matching titles appear and an unrelated title is filtered out. |
| `tests/add-book-to-collection.spec.js` | Adds *Git Pocket Guide*, checks the success alert and the Profile entry, then removes the test book. |
| `tests/delete-book-from-collection.spec.js` | Prepares *Learning JavaScript Design Patterns* independently, deletes it from Profile, and verifies the `Book deleted.` alert and removal. |

## Setup

1. Install Node.js 22 or 24 LTS and Git. Open a terminal in the project folder after cloning or downloading the repository.
2. Install the project dependencies and Chromium.

   ```sh
   npm ci
   npx playwright install chromium
   ```

3. For the Add and Delete tests, create a `.env` file next to `package.json` with the credentials for a dedicated DemoQA test account. Replace both example values.

   ```dotenv
   DEMOQA_USERNAME="your_test_username"
   DEMOQA_PASSWORD="your_test_password"
   ```

   Keep `.env` local and out of Git. These tests modify the account's book collection. Search can run without signing in.

## Run the tests

Run all three spec files on Chromium with one worker. Add and Delete use the same account, so running sequentially avoids overlapping sign-ins.

```sh
node --env-file=.env node_modules/@playwright/test/cli.js test search-books.spec.js add-book-to-collection.spec.js delete-book-from-collection.spec.js --project=chromium --workers=1
```

Expected result: **4 passed** (two Search tests, one Add test, and one Delete test). To run a single spec, keep only its filename in the command. Add `--headed` to see the browser while the tests run.

To run Search without `.env`:

```sh
npx playwright test search-books.spec.js --project=chromium
```

## Open the HTML report

After the run, open the latest report from the project folder:

```sh
npx playwright show-report
```

Select a test to view its result and steps. Press `Ctrl+C` in the terminal to stop the report server.

## Project layout

- `tests/` contains the test scenarios and assertions.
- `pages/` contains the Book Store, Login, and Profile page objects.
- `helpers/` contains shared logic for accepting alerts and reading their messages.
- `playwright.config.js` defines the Playwright configuration.

## Troubleshooting

- **`.env: not found`** — Create the file in the project root and check that it is named `.env`, not `.env.txt`.
- **`User not authorized!`** — Verify the test account can sign in to DemoQA, then rerun with `--workers=1` and check that no other test run is using the same account.
- **Browser executable missing** — Run `npx playwright install chromium` and retry.
