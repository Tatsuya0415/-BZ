import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/self-guide/documents");
});

test("未入力でダウンロードを押すとバリデーションエラーが表示される", async ({ page }) => {
  await page.getByRole("button", { name: "相続関係説明図" }).click();
  await expect(page.getByText("被相続人の氏名を入力してください。")).toBeVisible();
});

test("必須項目を入力するとPDFがダウンロードできる", async ({ page }) => {
  await page.getByLabel("氏名").first().fill("相続 太郎");
  await page.getByLabel("死亡年月日").fill("令和8年1月1日");
  await page.getByLabel("最後の住所").fill("東京都千代田区1-1-1");
  await page.getByLabel("本籍").fill("東京都千代田区1-1-1");

  await page.getByLabel("氏名").nth(1).fill("相続 花子");
  await page.getByLabel("続柄(例: 長男・配偶者)").fill("配偶者");
  await page.getByLabel("生年月日").fill("昭和45年4月1日");
  await page.getByLabel("住所", { exact: true }).fill("東京都千代田区1-1-1");

  await page.getByLabel("所在").fill("東京都千代田区1-1");
  await page.getByLabel("地番").fill("1番1");
  await page.getByLabel("地目").fill("宅地");
  await page.getByLabel("地積(平方メートル)").fill("120.5");

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "相続関係説明図" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("family-relation-chart.pdf");
});

test("入力内容は再読み込み後も保持される", async ({ page }) => {
  await page.getByLabel("氏名").first().fill("相続 太郎");
  await page.reload();
  await expect(page.getByLabel("氏名").first()).toHaveValue("相続 太郎");
});
