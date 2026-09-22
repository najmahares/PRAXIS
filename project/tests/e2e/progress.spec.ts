import { test, expect } from "@playwright/test";

test.describe("Progress", () => {
  test("loads the hero", async ({ page }) => {
    await page.goto("/progress");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible({ timeout: 12_000 });
  });

  test("renders concept signals", async ({ page }) => {
    await page.goto("/progress");
    await expect(page.getByText(/concept signals/i).first()).toBeVisible({ timeout: 12_000 });
  });

  test("renders learning and practice panels", async ({ page }) => {
    await page.goto("/progress");
    await expect(page.getByText(/^learning$/i).first()).toBeVisible({ timeout: 12_000 });
    await expect(page.getByText(/^practice$/i).first()).toBeVisible({ timeout: 12_000 });
  });
});
