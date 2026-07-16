import { expect, test } from "@playwright/test";

test("トップページから診断へ遷移できる", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "かんたん相続BZ" })).toBeVisible();

  await page.getByRole("link", { name: "30秒で診断をはじめる" }).click();
  await expect(page).toHaveURL(/\/diagnosis$/);
});

test("フッターから法的ページへ遷移できる", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "利用規約" }).click();
  await expect(page).toHaveURL(/\/legal\/terms$/);
  await expect(page.getByRole("heading", { name: "利用規約" })).toBeVisible();
});
