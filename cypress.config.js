const { defineConfig } = require("cypress");
const { exec } = require("child_process")

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
      on('task', {
        async execute(command) {
          return new Promise((resolve, reject) => {
            exec(command, { shell: 'bash' }, (error, stdout, stderr) => {
              if (error) {
                reject(error);
              } else {
                resolve({ stdout, stderr });
              }
            });
          });
        }
      });
      return config;
    },
  },
});