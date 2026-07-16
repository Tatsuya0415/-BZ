# かんたん相続BZ

相続登記・相続税申告を自分で進めたい人のためのセルフヘルプ・プラットフォーム。
事業計画・要件定義は[docs/](docs/00-overview.md)を参照。

## 開発

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) で確認できる。

## テスト

```bash
npm run lint       # ESLint
npm run build      # 型チェック・本番ビルド
npm run test:e2e   # Playwright E2Eテスト(初回のみ `npx playwright install` が必要)
```

E2Eテストは`playwright.config.ts`の設定により、テスト実行時に開発サーバーを自動起動する。

## 環境変数

`.env.example`を参考に`.env.local`を作成する(いずれも未設定でも動作する)。

| 変数名 | 用途 |
|---|---|
| `NEXT_PUBLIC_CONTACT_EMAIL` | 専門家紹介フォームの問い合わせ先メールアドレス(mailtoフォールバック用) |
| `CONTACT_NOTIFY_WEBHOOK_URL` | 問い合わせ内容を転送するWebhook URL(Slack Incoming Webhook等) |

## Vercelへのデプロイ

1. GitHubリポジトリをVercelにインポートする(Next.jsは自動検出されるため`vercel.json`の追加設定は不要)
2. Vercelのプロジェクト設定で上記の環境変数を設定する
3. `public/fonts/`配下のNoto Sans JPフォントは、PDF生成API(`/api/documents/*`)がサーバーレス関数内で
   `fs`経由で読み込むため、`next.config.ts`の`outputFileTracingIncludes`で明示的にトレース対象へ含めている
4. デプロイ後、`/legal/tokushoho`・`/legal/terms`・`/legal/privacy`の`[要記入]`箇所を実際の事業者情報に
   置き換えること(`docs/09-launch-workflow.md`参照)

## 技術スタック

- Next.js(App Router) + TypeScript + Tailwind CSS
- 共通UIコンポーネント: `src/components/ui/`([docs/06-component-spec.md](docs/06-component-spec.md)準拠)
- PDF生成: `@react-pdf/renderer`(`src/components/pdf/`)
- E2Eテスト: Playwright(`e2e/`)

## 関連ドキュメント

- [docs/00-overview.md](docs/00-overview.md): サービス概要・意思決定の要点
- [docs/09-launch-workflow.md](docs/09-launch-workflow.md): 立ち上げの具体的ワークフロー
- [docs/10-ai-agent-system.md](docs/10-ai-agent-system.md): AIエージェント体制
