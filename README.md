# PNM — Playwright Automation Suite

End-to-end test suite for PNM built with **Playwright** and **JavaScript**.

---

## Project Structure

```
├── fixtures/
│   └── base.fixture.js      # Reusable authenticated page fixtures
├── pages/
│   └── LoginPage.js          # Page Object Model for the login screen
├── test-data/
│   └── index.js              # Centralised test data + env-var validation
├── tests/
│   └── login/
│       └── login.spec.js     # Login module test suite
├── utils/
│   ├── ApiHelper.js          # Network interception & assertions
│   ├── DateHelper.js         # Date generation helpers
│   └── index.js               # Barrel export
├── .env                       # Environment variable template
└── playwright.config.js       # Playwright configuration
```

---

## Prerequisites

- Node.js ≥ 18
- npm ≥ 9

---

## Setup

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium --with-deps

# Copy the env template and fill in real credentials
cp .env .env.local
# Edit .env.local with your BASE_URL, EMPLOYEE_ID, and PASSWORD
```

---

## Running Tests

| Command | Description |
|---|---|
| `npm test` | Run all tests (headless) |
| `npm run test:smoke` | Smoke tests only (`@smoke` tag) |
| `npm run test:regression` | Full regression suite |
| `npm run test:login` | Login module tests only |
| `npm run test:headed` | Run with visible browser |
| `npm run test:debug` | Pause on each step (Playwright Inspector) |
| `npm run test:ui` | Playwright UI mode |
| `npm run report` | Open the last HTML report |

### Filter by tag

```bash
npx playwright test --grep @smoke
npx playwright test --grep @negative
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `BASE_URL` | ✅ | Application URL |
| `EMPLOYEE_ID` | ✅ | Login user |
| `PASSWORD` | ✅ | Login password |
| `DEMO_SITE_NAME` | ❌ | Site name in the module banner (default: `DEMO SITE`) |

> **Never commit `.env.local` or real credentials.** Use GitHub Secrets for CI.

---

## CI / CD

Push to `main` or `master` triggers the Playwright workflow automatically.
Add the following repository secrets in **Settings → Secrets → Actions**:

- `BASE_URL`
- `EMPLOYEE_ID`
- `PASSWORD`
- `DEMO_SITE_NAME`

HTML reports are uploaded as workflow artifacts and retained for 30 days.

---

## Writing New Tests

1. Add a Page Object in `pages/` extending the pattern in `LoginPage.js`.
2. Add test data constants in `test-data/index.js`.
3. Create a spec file under `tests/<module>/<module>.spec.js`.
4. Import `test` and `expect` from `fixtures/base.fixture.js` (not directly from Playwright).
5. Tag tests with `@smoke`, `@regression`, `@positive`, or `@negative`.
# PNM_Automation
# pnmautomation
