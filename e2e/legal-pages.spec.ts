import { expect, test } from "@playwright/test";

const pages: { path: string; heading: string }[] = [
  { path: "/legal/tokushoho", heading: "特定商取引法に基づく表記" },
  { path: "/legal/terms", heading: "利用規約" },
  { path: "/legal/privacy", heading: "プライバシーポリシー" },
];

for (const { path, heading } of pages) {
  test(`${path} が表示される`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: heading })).toBeVisible();
  });
}
