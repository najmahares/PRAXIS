import { test, expect } from "@playwright/test";

test.describe("Community", () => {
  test("loads the feed with seed posts", async ({ page }) => {
    await page.goto("/community");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator(".praxis-community-post").first()).toBeVisible({ timeout: 10_000 });
  });

  test("blocks moderation-flagged content", async ({ page }) => {
    await page.goto("/community");
    await page.getByRole("button", { name: /start a post/i }).click();
    await page.getByLabel(/title/i).first().fill("Guaranteed returns!");
    await page.getByLabel(/body/i).first().fill("Buy now, guaranteed 100% returns, DM me");
    await page.getByRole("button", { name: /^post$/i }).click();
    await expect(
      page.getByText(/advice|scam pattern|predictions|blocked|remove/i).first()
    ).toBeVisible({ timeout: 6_000 });
  });
});
