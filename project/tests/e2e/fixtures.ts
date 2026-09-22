import { test as base, expect, type Page } from "@playwright/test";

/**
 * Unique-ish test email. Prefix lets us find and clean up test accounts in
 * Supabase via `select * from auth.users where email like 'test+e2e-%'`.
 */
export function testEmail(): string {
  // Use a plain address, no +, no .local, so the client-side email
  // validator accepts it. The domain is safe (example.com is reserved
  // for docs and never receives real mail).
  return `e2e${Date.now()}${Math.floor(Math.random() * 1000)}@example.com`;
}

const TEST_PASSWORD = "PraxisTest2026!";

/**
 * Sign up a brand-new user through the real UI. Returns the email used.
 * The flow is: /register → fill → submit → auto-redirects to /dashboard.
 */
export async function signUpFresh(page: Page, email = testEmail()): Promise<string> {
  await page.goto("/register");
  // Wait for form to render
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  // Fill in by label, falls back to placeholder matching if labels vary.
  const nameField = page.getByLabel(/name/i).first();
  const emailField = page.getByLabel(/email/i).first();
  const passField = page.getByLabel(/^password/i).first();

  await nameField.fill("Test Runner");
  await emailField.fill(email);
  await passField.fill(TEST_PASSWORD);

  // Confirm password if present (label match is loose)
  const confirmField = page.getByLabel(/confirm/i).first();
  if ((await confirmField.count()) > 0) {
    await confirmField.fill(TEST_PASSWORD);
  }

  // Check the terms / agreement checkbox if present
  const termsCheckbox = page.locator('input[type="checkbox"]').first();
  if ((await termsCheckbox.count()) > 0) {
    if (!(await termsCheckbox.isChecked())) {
      await termsCheckbox.check();
    }
  }

  // Click "Create account" / "Sign up" / "Register"
  const submit = page
    .getByRole("button", { name: /create account|sign up|register|start/i })
    .first();
  await submit.click();

  // Should land on dashboard
  await page.waitForURL(/\/dashboard/, { timeout: 15_000 });
  return email;
}

/**
 * Sign in as an existing user.
 */
export async function signIn(
  page: Page,
  email: string,
  password = TEST_PASSWORD
): Promise<void> {
  await page.goto("/login");
  await page.getByLabel(/email/i).first().fill(email);
  await page.getByLabel(/password/i).first().fill(password);
  await page.getByRole("button", { name: /sign in|log in/i }).first().click();
  await page.waitForURL(/\/dashboard/, { timeout: 15_000 });
}

/**
 * Delete the currently signed-in test user via the app's own endpoint.
 * Safe no-op if not signed in.
 */
export async function cleanupCurrentUser(page: Page): Promise<void> {
  try {
    await page.request.post("/api/account/delete", { maxRetries: 0 });
  } catch {
    /* ignore, test user will linger, harmless */
  }
}

/**
 * Extended fixture that signs up a fresh user before the test and deletes
 * them afterward. Use `test` from this file to get `authenticatedPage`.
 */
type Fixtures = {
  authenticatedPage: Page;
  testEmailUsed: string;
};

export const test = base.extend<Fixtures>({
  testEmailUsed: async ({}, use) => {
    await use(testEmail());
  },

  authenticatedPage: async ({ page, testEmailUsed }, use) => {
    await signUpFresh(page, testEmailUsed);
    await use(page);
    await cleanupCurrentUser(page);
  },
});

export { expect };
