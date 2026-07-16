import { expect, test } from "@playwright/test";

test("LPの主要セクションが表示される", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "かんたん相続BZ" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "相続登記、実は「期限」があるのをご存知ですか?" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "使い方はシンプルです" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "できること" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "よくある質問" })).toBeVisible();
});

test("FAQのアコーディオンが開閉できる", async ({ page }) => {
  await page.goto("/");
  const question = page.getByText("本当に無料ですか?");
  await expect(page.getByText("すべて無料でご利用いただけます")).toBeHidden();
  await question.click();
  await expect(page.getByText("すべて無料でご利用いただけます", { exact: false })).toBeVisible();
});

test("できること一覧の各カードから対応ページへ遷移できる", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /必要書類チェックリスト/ }).click();
  await expect(page).toHaveURL(/\/self-guide\/checklist$/);
});

test("OGP画像・アイコン・sitemap・robotsが生成される", async ({ request }) => {
  for (const path of ["/icon", "/apple-icon", "/opengraph-image", "/sitemap.xml", "/robots.txt"]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
  }
});
