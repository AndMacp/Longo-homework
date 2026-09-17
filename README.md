# Longo QA homework

## Stack choice

JavaScript and Playwright were chosen for browser automation, retrying assertions, network-response checks, and HTML reporting. Page objects keep selectors and UI actions separate from test scenarios.

## Install and run

Requires Node.js and npm. From the project root:

```sh
npm install
npx playwright install chromium
npm test
```

`npm test` runs Chromium. `npm run test:list` lists tests without opening a browser. `npm run report` opens the HTML report. Firefox and WebKit can be run with `npx playwright test --project=firefox` or `--project=webkit` after installing the relevant browser.

## Configuration

`playwright.config.js` contains the approved staging `BASE_URL`, a maximum of two workers, and browser `LOCALE` options: `lv-LV`, `en-GB`, and `ru-RU`. Tests use Latvian routes as their starting point. Do not override the worker limit or run suites concurrently.

## Coverage

- Catalogue make, body type, and price filtering; make and price assertions on result cards.
- Empty catalogue state.
- First card to detail-page comparison of model, year, mileage, and price.
- Language switching between LV, EN, and RU, including URL and visible-content checks.
- Catalogue API response status, content type, and basic JSON checks.

## Deliberate omissions and known limitations

- No automated login/OTP flow, form submissions, crawling, load testing, CI, Docker, visual checks, or accessibility checks.
- API checks do not yet validate the returned car schema or prove that the selected filter was applied.
- Changing staging stock can affect the empty-result combination. Overlapping catalogue API requests may affect the current wait strategy.
- Runtime protection against external links and redirects is not implemented; only the configured base URL is validated.
- The latest verification was offline test discovery, not a full staging pass.
