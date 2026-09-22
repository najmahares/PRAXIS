import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test.describe("Bookmarks", () => {
  test("adds a bookmark from a company page", async ({ page }) => {
    await page.request.delete("/api/bookmarks/by-target?type=company&id=SCOM");

    await page.goto("/market/SCOM");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/safaricom/i);

    await page.getByRole("button", { name: "Bookmark this page" }).click();
    await page.getByRole("button", { name: /save to bookmarks/i }).click();
    await page.waitForTimeout(800);

    await page.goto("/bookmarks");
    await expect(page.getByText(/safaricom/i).first()).toBeVisible({ timeout: 10_000 });
  });

  test("removes a bookmark", async ({ page }) => {
    await page.request.post("/api/bookmarks", {
      data: {
        targetType: "company",
        targetId: "EQTY",
        title: "Equity Group Holdings",
        description: "Banking, NSE",
        href: "/market/EQTY",
      },
    });

    await page.goto("/bookmarks");
    const card = page.locator(".praxis-bookmarks-card").filter({ hasText: /equity/i }).first();
    await expect(card).toBeVisible({ timeout: 10_000 });
    await card.locator(".praxis-bookmarks-remove").click();
    await expect(page.getByText(/equity group holdings/i)).not.toBeVisible({ timeout: 8_000 });
  });

  test("shows empty state when none", async ({ page }) => {
    const res = await page.request.get("/api/bookmarks");
    const data = (await res.json()) as { bookmarks?: Array<{ id: string }> };
    for (const b of data.bookmarks ?? []) {
      await page.request.delete("/api/bookmarks?id=" + b.id);
    }
    await page.goto("/bookmarks");
    await expect(page.getByText(/no bookmarks yet/i)).toBeVisible({ timeout: 10_000 });
  });
});
