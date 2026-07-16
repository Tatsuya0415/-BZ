import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/self-guide/checklist");
});

test("相続人が1人の場合は遺産分割協議書が不要と案内される", async ({ page }) => {
  await page.getByLabel("相続人の人数").fill("1");
  await expect(page.getByText("相続人が1人のため、遺産分割協議書は不要です")).toBeVisible();
});

test("相続人が2人以上の場合は遺産分割協議書が必要項目に含まれる", async ({ page }) => {
  await page.getByLabel("相続人の人数").fill("3");
  await expect(page.getByText("遺産分割協議書(相続人全員の実印押印)")).toBeVisible();
});

test("海外在住の相続人にチェックを入れると専用項目が表示される", async ({ page }) => {
  await page.getByText("海外在住の相続人がいる").click();
  await expect(page.getByText("在留証明書(住民票の代わり)")).toBeVisible();
});

test("チェックした項目は進捗件数に反映され、再読み込み後も保持される", async ({ page }) => {
  await expect(page.getByText(/0 \/ \d+ 件完了/)).toBeVisible();

  await page
    .locator('label:has-text("被相続人の出生から死亡までの戸籍謄本一式")')
    .locator('input[type="checkbox"]')
    .check();
  await expect(page.getByText(/1 \/ \d+ 件完了/)).toBeVisible();

  await page.reload();
  await expect(page.getByText(/1 \/ \d+ 件完了/)).toBeVisible();
  await expect(
    page
      .locator('label:has-text("被相続人の出生から死亡までの戸籍謄本一式")')
      .locator('input[type="checkbox"]'),
  ).toBeChecked();
});
