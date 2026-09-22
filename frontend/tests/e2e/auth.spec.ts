import { test, expect, signUpFresh, signIn, cleanupCurrentUser, testEmail } from "./fixtures";

test.describe("Authentication", () => {
  test("signs up a new user and lands on dashboard", async ({ page }) => {
    const email = await signUpFresh(page);
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByText(/hi,/i).first()).toBeVisible();
    await cleanupCurrentUser(page);
    expect(email).toMatch(/test\+e2e-/);
  });

  test("signs out and lands on login", async ({ page }) => {
    const email = await signUpFresh(page);

    // Open the user menu, the avatar button has aria-label "Account menu"
    await page.getByRole("button", { name: /account menu/i }).click();
    await page.getByRole("menuitem", { name: /sign out/i }).click();

    // Confirm dialog, the button says "Sign out"
    await page
      .getByRole("button", { name: /^sign out$/i })
      .last()
      .click();

    await page.waitForURL(/\/login/, { timeout: 10_000 });
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/welcome back/i);

    // Clean up requires re-auth
    await signIn(page, email).catch(() => {});
    await cleanupCurrentUser(page);
  });

  test("rejects wrong password", async ({ page }) => {
    const email = await signUpFresh(page);

    // Sign out
    await page.getByRole("button", { name: /account menu/i }).click();
    await page.getByRole("menuitem", { name: /sign out/i }).click();
    await page.getByRole("button", { name: /^sign out$/i }).last().click();
    await page.waitForURL(/\/login/);

    // Try to sign in with wrong password
    await page.getByLabel(/email/i).first().fill(email);
    await page.getByLabel(/password/i).first().fill("WrongPassword123!");
    await page.getByRole("button", { name: /sign in|log in/i }).first().click();

    // Error appears, stays on login
    await expect(page.getByText(/incorrect|invalid|wrong/i).first()).toBeVisible({ timeout: 5_000 });
    await expect(page).toHaveURL(/\/login/);

    // Recover for cleanup
    await signIn(page, email).catch(() => {});
    await cleanupCurrentUser(page);
  });

  test("persists session on refresh", async ({ page }) => {
    await signUpFresh(page);
    await page.goto("/dashboard");
    await page.reload();
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByText(/hi,/i).first()).toBeVisible();
    await cleanupCurrentUser(page);
  });

  test("redirects unauthenticated to login", async ({ page }) => {
    // No signup, go straight to a protected page
    await page.goto("/dashboard");
    await page.waitForURL(/\/login/, { timeout: 10_000 });
    await expect(page).toHaveURL(/\/login/);
  });
});
