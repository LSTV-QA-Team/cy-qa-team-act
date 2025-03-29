const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    testIsolation: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('before:browser:launch', (browser = {}, launchOptions) => {
        console.log(launchOptions.args);

        if (browser.name === 'chrome') {
          launchOptions.args.push('--no-sandbox', '--disable-gpu');
        }

        return launchOptions;
      });
      return config;
    },
  },
});