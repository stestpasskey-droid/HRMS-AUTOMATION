# HRMS Playwright Test Suite

E2E tests for [QREAM HRMS](https://qream-hrms.web.app).

## Project Structure

```
hrms-playwright/
├── playwright.config.ts          # Global config, projects, auth wiring
├── package.json
├── tsconfig.json
├── .gitignore
├── playwright/
│   └── .auth/
│       └── user.json             # ⚠ Auto-generated — do NOT commit
└── tests/
    ├── helpers.ts                # Shared openMenu / navigateTo utilities
    ├── auth.setup.ts             # Login once, save session (runs first)
    ├── permissions.test.ts       # Browser permission grants
    ├── my-activities.test.ts     # My Activities sidebar links
    └── organization-setup.test.ts# Organization Setup sidebar links
```

## Setup

```bash
npm install
npx playwright install chromium
```

## Run Tests

```bash
# Run all tests (setup → permissions → navigation)
npm test

# Headed mode (see the browser)
npm run test:headed

# Interactive UI mode
npm run test:ui

# View last HTML report
npm run report
```

## How Authentication Works

`auth.setup.ts` logs in **once** and saves the session to `playwright/.auth/user.json`.
Every subsequent test loads that file via `storageState` in `playwright.config.ts`.

- ✅ Login runs exactly **1 time** regardless of how many tests exist
- ✅ `playwright/.auth/` is in `.gitignore` — credentials never committed

## Why Navigation Was Failing (and the Fix)

| Problem | Fix |
|---|---|
| Sidebar collapses between clicks | `openMenu()` re-opens the parent before every child link click |
| No wait after SPA navigation | `navigateTo()` calls `waitForLoadState('networkidle')` after every click |
| All links in one test hid failure location | Each link is its own `test()` — failures are isolated |
