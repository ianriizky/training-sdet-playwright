import path from 'path';

import { defineCoverageReporterConfig } from '@bgotink/playwright-coverage';
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

/**
 * Read environment variables from file.
 *
 * @see https://github.com/motdotla/dotenv
 */
dotenv.config({ path: path.resolve(import.meta.dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './test',
  testMatch: '*.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  ...(process.env.CI ? { workers: 1 } : { workers: 4 }),
  reporter: [
    ['html'],
    ['line'],
    ['json', { outputFile: 'report.json' }],
    process.env.COVERAGE === 'true'
      ? [
          '@bgotink/playwright-coverage',
          defineCoverageReporterConfig({
            sourceRoot: import.meta.dirname,
            resultDir: path.join(import.meta.dirname, 'coverage'),
            reports: [
              ['html'],
              [
                'cobertura',
                {
                  file: 'cobertura-coverage.xml',
                },
              ],
            ],
          }),
        ]
      : ['null'],
  ],
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'saucedemo',
      use: { ...devices['Desktop Chrome'] },
      testMatch: ['test/saucedemo/**/*.spec.ts'],
    },
    {
      name: 'orangehrm',
      use: { ...devices['Desktop Chrome'] },
      testMatch: ['test/orangehrm/**/*.spec.ts'],
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  // webServer: {
  //   command: 'npm run start',
  //   url: process.env.BASE_URL,
  //   timeout: 120 * 1000,
  //   reuseExistingServer: !process.env.CI,
  // },
});
