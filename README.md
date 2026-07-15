# かんたん相続BZ

相続登記・相続税申告を自分で進めたい人のためのセルフヘルプ・プラットフォーム。
事業計画・要件定義は[docs/](docs/00-overview.md)を参照。

## 開発

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) で確認できる。

## 技術スタック

- Next.js(App Router) + TypeScript + Tailwind CSS
- 共通UIコンポーネント: `src/components/ui/`([docs/06-component-spec.md](docs/06-component-spec.md)準拠)

## 関連ドキュメント

- [docs/00-overview.md](docs/00-overview.md): サービス概要・意思決定の要点
- [docs/09-launch-workflow.md](docs/09-launch-workflow.md): 立ち上げの具体的ワークフロー
- [docs/10-ai-agent-system.md](docs/10-ai-agent-system.md): AIエージェント体制
