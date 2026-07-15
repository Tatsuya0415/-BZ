import { expect, test } from "@playwright/test";

async function answerDiagnosis(page: import("@playwright/test").Page, answers: string[]) {
  await page.goto("/diagnosis");
  for (const label of answers) {
    await page.getByRole("button", { name: label, exact: true }).click();
  }
  await page.waitForURL(/\/diagnosis\/result\?/);
}

test("不動産あり・意見相違なし・シンプルなケースはセルフ推奨になる", async ({ page }) => {
  await answerDiagnosis(page, [
    "含まれる",
    "2〜3人",
    "ない",
    "いない",
    "3,000万円未満",
  ]);
  await expect(page.getByRole("heading", { name: "あなたはセルフ登記向きです" })).toBeVisible();
  await expect(page.getByText("相続登記", { exact: true })).toBeVisible();
});

test("相続人間で意見の相違がある場合は代行推奨になる", async ({ page }) => {
  await answerDiagnosis(page, [
    "含まれる",
    "2〜3人",
    "ある",
    "いない",
    "3,000万円未満",
  ]);
  await expect(
    page.getByRole("heading", { name: "専門家への相談をおすすめします" }),
  ).toBeVisible();
});

test("海外在住の相続人がいる場合はハイブリッド推奨になり両方の導線が出る", async ({ page }) => {
  await answerDiagnosis(page, [
    "含まれる",
    "2〜3人",
    "ない",
    "いる",
    "3,000万円未満",
  ]);
  await expect(
    page.getByRole("heading", { name: "セルフ対応と専門家サポートのハイブリッドがおすすめです" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "セルフ登記ガイドへ進む" })).toBeVisible();
  await expect(page.getByRole("link", { name: "提携専門家に相談する" })).toBeVisible();
});

test("診断結果画面には免責文言が表示される", async ({ page }) => {
  await answerDiagnosis(page, [
    "含まれる",
    "2〜3人",
    "ない",
    "いない",
    "3,000万円未満",
  ]);
  await expect(page.getByText("法的助言・税務助言には該当しません").first()).toBeVisible();
});

test("不正なクエリパラメータで結果ページに直接アクセスすると診断ページへ戻される", async ({
  page,
}) => {
  await page.goto("/diagnosis/result?hasRealEstate=yes");
  await expect(page).toHaveURL(/\/diagnosis$/);
});
