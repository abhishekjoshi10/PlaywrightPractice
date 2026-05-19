import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration
 */

export default defineConfig({

  testDir: './tests',

  timeout: 40 * 1000,

  expect: {
    timeout: 5000,
  },

  reporter: 'html',

  projects: [

    {
      name: 'safari execution',

      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        trace: 'on',
       // ...devices['iPhone 15 Pro'],
        
      },
    },

    {
      name: 'chrome',

      use: {
        browserName: 'chromium',
        headless: true,
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