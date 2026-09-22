import { test as setup, expect } from "@playwright/test";
import { testEmail } from "./fixtures";

const AUTH_FILE = "tests/.auth/user.json";
const PASSWORD = "PraxisTest2026!";

/**
 * Runs once before the "app" project. Creates a test user, saves the
 * authenticated cookie state to disk. All app tests reuse it.
 *
 * The user is NOT deleted at the end, it lives for the whole run and
 * is cleaned up when you run `npm run test:e2e:cleanup`.
 */
setup("create shared test user", async ({ page }) => {
  const email = testEmail();

  await page.goto("/register");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  await page.getByLabel(/name/i).first().fill("E2E Shared");
  await page.getByLabel(/email/i).first().fill(email);
  await page.getByLabel(/^password/i).first().fill(PASSWORD);

  const confirmField = page.getByLabel(/confirm/i).first();
  if ((await confirmField.count()) > 0) {
    await confirmField.fill(PASSWORD);
  }

  // Check the terms checkbox, most register forms require it
  const termsCheckbox = page.locator('input[type="checkbox"]').first();
  if ((await termsCheckbox.count()) > 0) {
    if (!(await termsCheckbox.isChecked())) {
      await termsCheckbox.check();
    }
  }

  await page
    .getByRole("button", { name: /create account|sign up|register|start/i })
    .first()
    .click();

  await page.waitForURL(/\/dashboard/, { timeout: 15_000 });

  // Save cookie + localStorage for reuse
  await page.context().storageState({ path: AUTH_FILE });

  // Also write the email to disk so cleanup can find it later
  const fs = await import("node:fs");
  fs.writeFileSync(
    "tests/.auth/shared-user.txt",
    `${email}\n${PASSWORD}\n`,
    "utf8"
  );

  console.log(`\n  ✓ shared test user: ${email}\n`);
});
