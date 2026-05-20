import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration
 */

export default defineConfig({

  testDir: './tests',
  retries:1,
  fullyParallel: true,
  workers:5, //this will restrict the parallel execution with 5.

  timeout: 40 * 1000,

  expect: {
    timeout: 5000,
  },

  reporter: 'html',

  projects: [

    {
      name: 'safari',

      use: {
        browserName: 'webkit',
        headless: true,
        screenshot: 'on',
        trace: 'on',
       // ...devices['iPhone 15 Pro'],
        
      },
    },

    {
      name: 'chrome',

      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        video:'retain-on-failure',
        trace: 'on',
        ignoreHTTPSErrors:true,  //for SSL properties.
        permissions:['geolocation'],
       // viewport:{width:,height:}
      },
    },

  ],

});