# MariApps PAL Logbook load test

Automated test to login to PAL v3 and load a predefined Voyage module log book.

Prerequisites:

- Node.js:
  `sudo apt install nodejs` or [download for Windows](https://nodejs.org/en/download/)
- NPM dependencies: [path](https://www.npmjs.com/package/path), [dotenv](https://www.npmjs.com/package/dotenv)

  run `npm i` in the script folder

- Rename .`env.example` to `.env` and update PAL URL, test user and password. Make sure user has access to Voyage module
- run `npx playwright test --headed` to run all tests in /tests
