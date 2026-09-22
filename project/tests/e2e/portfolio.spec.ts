import { test, expect } from "@playwright/test";

test.describe("Portfolio", () => {
  test("shows setup or dashboard", async ({ page }) => {
    await page.goto("/portfolio");
    const heading = await page.getByRole("heading", { level: 1 }).first().innerText();
    expect(heading).toMatch(/setup|portfolio|start|value/i);
  });

  test("loads trade ticket", async ({ page }) => {
    await page.goto("/portfolio/trade");
    await page.waitForLoadState("networkidle");
    // Either a select is present (has portfolio) or an empty prompt
    const body = await page.locator("body").innerText();
    expect(body).toMatch(/cash available|setup|portfolio/i);
  });

  test("journal page loads", async ({ page }) => {
    await page.goto("/portfolio/journal");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
