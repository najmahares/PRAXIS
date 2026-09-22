import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test.describe("Notifications", () => {
  test("loads the notifications page", async ({ page }) => {
    await page.goto("/notifications");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/notifications/i);
  });

  test("shows the welcome notification from signup", async ({ page }) => {
    await page.goto("/notifications");
    await expect(page.getByText(/welcome to praxis/i).first()).toBeVisible({ timeout: 10_000 });
  });

  test("bell in topbar navigates to notifications", async ({ page }) => {
    await page.goto("/dashboard");
    await page.getByRole("link", { name: /notifications/i }).first().click();
    await expect(page).toHaveURL(/\/notifications/);
  });
});
