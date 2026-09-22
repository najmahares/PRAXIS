import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test.describe("Settings", () => {
  test("loads notification preferences", async ({ page }) => {
    await page.goto("/settings/notifications");
    await expect(page.getByRole("heading", { name: /notification preferences/i })).toBeVisible({ timeout: 10_000 });
  });

  test("toggling a preference persists", async ({ page }) => {
    await page.goto("/settings/notifications");
    const first = page.getByRole("switch").first();
    await expect(first).toBeVisible({ timeout: 10_000 });

    const before = await first.getAttribute("aria-checked");
    await first.click();
    await page.waitForTimeout(700);
    await page.reload();
    const after = await page.getByRole("switch").first().getAttribute("aria-checked");
    expect(after).not.toBe(before);

    
    await page.getByRole("switch").first().click();
    await page.waitForTimeout(500);
  });

  test("profile page shows an email", async ({ page }) => {
    await page.goto("/settings/profile");
    
    await expect(
      page.getByRole("heading", { name: /edit profile/i })
    ).toBeVisible({ timeout: 15_000 });

    
    
    const emailInput = page.locator('input[type="email"], input[id*="email"]').first();
    if ((await emailInput.count()) > 0) {
      const value = await emailInput.inputValue();
      expect(value).toContain("@");
    } else {
      
      await expect(page.getByText(/@/i).first()).toBeVisible({ timeout: 5_000 });
    }
  });

  test("practice preferences page loads", async ({ page }) => {
    await page.goto("/settings/practice-preferences");
    await expect(page.getByRole("heading", { name: /practice preferences/i })).toBeVisible({ timeout: 10_000 });
    await expect(page.locator("select").first()).toBeVisible();
  });
});
