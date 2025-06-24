import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 30 * 1000,

  projects: [
    {
      name: 'SauceDemo - Firefox',
      testDir: './saucedemo/tests',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: 'https://www.saucedemo.com',
        trace: 'on',
      },
    },
    {
      name: 'TodoMVC - Firefox',
      testDir: './todomvc/tests',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: 'http://todomvc.com/examples/vue/',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
      },
    },
  ],
});
