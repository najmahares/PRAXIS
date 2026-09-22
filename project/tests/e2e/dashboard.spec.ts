import { test, expect } from "@playwright/test";

test.describe("Dashboard", () => {
  test("greets the user", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByText(/^hi,/i).first()).toBeVisible({ timeout: 12_000 });
  });

  test("shows portfolio value or setup prompt", async ({ page }) => {
    await page.goto("/dashboard");
    
    await expect(
      page.locator(".praxis-dash-hero-value, .praxis-dash-hero-cta").first()
    ).toBeVisible({ timeout: 12_000 });
  });

  test("renders dashboard sections", async ({ page }) => {
    await page.goto("/dashboard");
    
    
    await expect(page.getByText(/^hi,/i).first()).toBeVisible({ timeout: 15_000 });

    const body = await page.locator("body").innerText();
    const labels = [
      /concept signals/i,
      /your progress/i,
      /recent activity/i,
      /cash vs invested/i,
    ];
    expect(labels.some((rx) => rx.test(body))).toBe(true);
  });
});
