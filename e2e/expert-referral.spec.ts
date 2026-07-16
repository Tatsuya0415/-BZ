import { expect, test } from "@playwright/test";

test("未入力で送信するとバリデーションエラーが表示される", async ({ page }) => {
  await page.goto("/expert-referral");
  await page.getByRole("button", { name: "送信する" }).click();
  await expect(page.getByText("お名前を入力してください。")).toBeVisible();
});

test("Webhook未設定時はメールソフトへのフォールバックが表示される", async ({ page }) => {
  await page.goto("/expert-referral?type=agent");
  await expect(page.getByText("診断結果: 代行推奨")).toBeVisible();

  await page.getByLabel("お名前").fill("相談 花子");
  await page.getByLabel("連絡先(メールまたは電話番号)").fill("hanako@example.com");
  await page.getByLabel("相談内容").fill("遺産分割で意見が分かれています。");
  await page.getByRole("button", { name: "送信する" }).click();

  await expect(page.getByText("メールソフトで送信する")).toBeVisible();
});
