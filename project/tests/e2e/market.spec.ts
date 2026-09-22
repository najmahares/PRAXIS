import { test, expect } from "@playwright/test";

test.describe("Market", () => {
  test("loads market with company cards", async ({ page }) => {
    await page.goto("/market");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/market/i);
    await expect(page.locator(".praxis-market-card").first()).toBeVisible({ timeout: 15_000 });
  });

  test("opens a company detail page", async ({ page }) => {
    await page.goto("/market/SCOM");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/safaricom/i);
    await expect(page.locator("body")).toContainText(/ksh/i);
  });
});
