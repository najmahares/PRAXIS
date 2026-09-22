import { test, expect } from "@playwright/test";

test.describe("Learning", () => {
  test("lists all levels on My Learning", async ({ page }) => {
    await page.goto("/learning");
    await expect(page.getByRole("heading", { name: /my learning/i })).toBeVisible();
    await expect(page.getByText(/foundations/i).first()).toBeVisible();
  });

  test("opens a lesson and renders its content", async ({ page }) => {
    await page.goto("/learning/lesson/0-1");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/what is a company/i);
    await expect(page.locator(".praxis-learn-paragraph").first()).toBeVisible();
  });

  test("marks a lesson complete and advances", async ({ page }) => {
    await page.goto("/learning/lesson/0-1");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const finish = page.getByRole("button", { name: /finish/i }).first();
    await expect(finish).toBeVisible();
    await finish.click();
    await page.waitForURL(/\/learning\/(lesson\/0-2|0\/quiz)/, { timeout: 10_000 });
  });
});
