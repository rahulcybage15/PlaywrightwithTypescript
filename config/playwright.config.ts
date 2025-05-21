import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  //globalSetup: require.resolve('../global-setup.ts'),
  timeout: 30000,
  expect: {
    timeout: 50000,
  },
  reporter: [
    ["list"],
    ['allure-playwright', { outputFolder: 'allure-results',detail: true}],
    ],
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: process.env.BASE_URL,
  },
});
