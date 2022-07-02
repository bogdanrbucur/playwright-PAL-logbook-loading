const { test, expect } = require("@playwright/test");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// Environment variables stored in .env
const palUrl = process.env.PAL_ROOT;
const palLogin = process.env.PAL_USER;
const palPassword = process.env.PAL_USER_PASSWORD;

// Tests
test.beforeEach(async ({ page }) => {
  await page.goto(`${palUrl}/palweblogin/Home/Login`);
});

test.describe("login and test Logbook loading time", () => {
  test("should login to PAL", async ({ page }) => {
    // Click [placeholder="Username"]
    await page.locator('[placeholder="Username"]').click();

    // Fill [placeholder="Username"]
    await page.locator('[placeholder="Username"]').fill(palLogin);

    // Press Tab
    await page.locator('[placeholder="Username"]').press("Tab");

    // Fill [placeholder="Password"]
    await page.locator('[placeholder="Password"]').fill(palPassword);

    // Press Enter
    await page.locator('[placeholder="Password"]').press("Enter");
    await expect(page).toHaveURL(`${palUrl}/palhome/Dashboard/DashboardHome`);

    await page.locator("text=Reject-Change Required").waitFor();

    // Navigate to LogBook page
    await page.goto(`${palUrl}/palvoyage/VoyagePAL/LogBook`);

    //await page.waitForLoadState();
    await page.waitForTimeout(4000);

    // Click [placeholder="Type Vessel Name here"]
    await page.locator('[placeholder="Type Vessel Name here"]').click();

    // Fill [placeholder="Type Vessel Name here"]
    await page.keyboard.type("chem alya");

    // Click text=CHEM ALYA
    await page.locator("text=CHEM ALYA").click();

    // Click #templateSearchtxtVoyageLegNumber
    await page.locator("#templateSearchtxtVoyageLegNumber").click();
    await expect(page).toHaveURL(`${palUrl}/palvoyage/VoyagePAL/LogBook#`);

    // Click text=152select Show Clear >> #btnVoyageLegSearchClear
    await page
      .locator("text=152select Show Clear >> #btnVoyageLegSearchClear")
      .click();

    // Click text=Select Anyselect Show Clear >> span >> nth=4
    await page
      .locator("text=Select Anyselect Show Clear >> span")
      .nth(4)
      .click();

    // Click text=18503
    await page.locator("text=18503").click();

    // Click text=18503select Show Clear >> #btnVoyageLegSearchShow
    await page
      .locator("text=18503select Show Clear >> #btnVoyageLegSearchShow")
      .click();

    // Click text=18503/03
    await page.locator("text=18503/03").click();

    // Click text=Voyage Leg SearchClose Vessel Name Port Charterer Select Anyselect Business Type >> #btnVoyageLegSearchOk
    await page
      .locator(
        "text=Voyage Leg SearchClose Vessel Name Port Charterer Select Anyselect Business Type >> #btnVoyageLegSearchOk"
      )
      .click();

    //await page.waitForLoadState();
    await page.waitForTimeout(1500);

    // Click #drplogbookdiv >> text=Select Any
    await page.locator("#drplogbookdiv >> text=Select Any").click();

    // // Click text=Date:27-Oct-2018 17:45:00
    // await page.locator("text=Date:27-Oct-2018 17:45:00").click();

    // Click text=Date:27-Oct-2018 17:45:00 No: 18503/03/08 Category:Port Activity: Beginning of S
    await page
      .locator(
        "text=Date:27-Oct-2018 17:45:00 No: 18503/03/08 Category:Port Activity: Beginning of S"
      )
      .click();

    // Click a:has-text("Warnings 2")
    await page.locator('a:has-text("Warnings 2")').click();
  });
});
