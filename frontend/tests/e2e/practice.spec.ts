import { test, expect } from "@playwright/test";

test.describe("Practice", () => {
  test("loads the practice library with level cards", async ({ page }) => {
    await page.goto("/practice");
    await expect(page.getByRole("heading", { name: /practice/i }).first()).toBeVisible();
    await expect(page.getByText(/level 0/i).first()).toBeVisible();
  });

  test("opens a group and shows the card list", async ({ page }) => {
    await page.goto("/practice/group/0-scenario");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/level 0/i);
  });
});
