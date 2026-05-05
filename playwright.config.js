import { defineConfig, devices } from '@playwright/test';


/**
 * See https://playwright.dev/docs/test-configuration.
 */
const Config={

  testDir:'./tests',
  timeout:40*1000,
 expect:{
      timeout:5000,
 },


 reporter:'html',
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    browserName:'chromium',
    headless:false,
    screenshot:'on',
    trace:'on'
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    //trace: 'on-first-retry',
  },




};

module.exports =Config
