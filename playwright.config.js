// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  //max time one test can run for
  timeout: 30*1000, 
  expect:{timeout: 5000},
  reporter: 'html',
       use: {
      browserName: 'chromium',
      headless: false,
      screenshot : 'on',
      trace : 'retain only on-failure',
  

 
  },
});

