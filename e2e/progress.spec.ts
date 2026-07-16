import { expect, test } from "@playwright/test";

test("診断・チェックリスト・書式入力の状況が進捗管理ページに反映される", async ({ page }) => {
  await page.goto("/progress");
  await expect(page.getByText("まだ診断を行っていません。")).toBeVisible();
  await expect(page.getByText("未入力")).toBeVisible();

  await page.goto("/diagnosis");
  const answers = ["含まれる", "2〜3人", "ない", "いない", "3,000万円未満"];
  for (const label of answers) {
    await page.getByRole("button", { name: label, exact: true }).click();
  }
  await page.waitForURL(/\/diagnosis\/result\?/);

  await page.goto("/self-guide/checklist");
  await page
    .locator('label:has-text("被相続人の出生から死亡までの戸籍謄本一式")')
    .locator('input[type="checkbox"]')
    .check();

  await page.goto("/self-guide/documents");
  await page.getByLabel("氏名").first().fill("相続 太郎");

  await page.goto("/progress");
  await expect(page.getByText("セルフ推奨")).toBeVisible();
  await expect(page.getByText("診断は完了しています。")).toBeVisible();
  await expect(page.getByText(/1 \/ \d+ 件/)).toBeVisible();
  await expect(page.getByText("保存済み")).toBeVisible();
  await expect(page.getByText("被相続人「相続 太郎」の入力が保存されています。")).toBeVisible();
});

test("保存データを削除すると初期状態に戻る", async ({ page }) => {
  await page.goto("/self-guide/documents");
  await page.getByLabel("氏名").first().fill("相続 太郎");

  await page.goto("/progress");
  await expect(page.getByText("保存済み")).toBeVisible();

  page.once("dialog", (dialog) => dialog.accept());
  await page.getByText("保存データをすべて削除して最初からやり直す").click();

  await expect(page.getByText("未入力")).toBeVisible();
});
