# コンポーネント仕様(Figma向け)

ユーザー提示済みの最小コンポーネントセット(Button, Input, Card, Badge, Stepper, Summary Panel,
Accordion, CTA Block)を、本サービス(診断・セルフ登記ガイド・進捗管理・専門家送客)の画面に対応付けて
定義する。Figmaにそのまま貼れるよう、命名規則・Auto Layout設定・寸法・状態を明記する。

共通トークン(前提):
- ベーススペーシング単位: `4px`(spacing-1)。以降 8/12/16/24/32/48px を基本値として使用
- 角丸: `8px`(標準)、`999px`(ピル型バッジ・ボタン用)
- フォントサイズ: 本文14px / 小さめ12px / 見出し18〜24px

## 1. Button

- レイヤー命名: `Button/{Variant}/{Size}/{State}` 例: `Button/Primary/Medium/Default`
- Variant: `Primary`(診断開始・CTA用), `Secondary`(サブアクション), `Text`(補助リンク)
- Size: `Large`(56px高、診断開始等の主要CTA), `Medium`(44px高), `Small`(36px高)
- State: `Default / Hover / Pressed / Disabled / Loading`
- Auto Layout: 横方向、padding `16px 24px`(Medium)、gap `8px`(アイコン+テキスト時)
- 用途対応: TOPの「診断を始める」ボタン(Primary/Large)、質問画面の選択肢確定(Primary/Medium)、
  「戻る」(Secondary/Medium)

## 2. Input

- レイヤー命名: `Input/{Type}/{State}` 例: `Input/Text/Default`
- Type: `Text`, `Number`(財産額入力等), `Select`(ドロップダウン), `RadioCard`(選択式質問用の疑似Input)
- State: `Default / Focus / Filled / Error / Disabled`
- Auto Layout: 縦方向、ラベル(12px, gap 4px)→ 入力欄(高さ48px, padding 12px 16px)→ ヘルプ/エラーテキスト
- 用途対応: 相続税申告シミュレーターの財産額入力、書式作成フォームの氏名・住所入力

## 3. Card

- レイヤー命名: `Card/{Variant}` 例: `Card/SelectableOption`
- Variant: `SelectableOption`(質問の選択肢カード)、`ChecklistItem`(必要書類チェックリスト)、
  `ArticleCard`(コラム一覧用)
- Auto Layout: 縦方向 padding `16px`、角丸`8px`、境界線1px(未選択時) / 2px+アクセントカラー(選択時)
- 状態: `Default / Selected / Hover / Disabled`
- 用途対応: 質問画面の選択肢(「不動産あり/なし」等)、必要書類チェックリストの各項目

## 4. Badge

- レイヤー命名: `Badge/{Type}/{Tone}` 例: `Badge/ProcedureTag/Info`
- Type: `ProcedureTag`(相続登記/相続税申告/相続放棄等の手続き種別)、`StatusTag`(未着手/進行中/完了)
- Tone: `Info`(青系), `Success`(緑系), `Warning`(黄系, 期限切迫等), `Neutral`(グレー)
- 寸法: 高さ24px、padding `4px 10px`、角丸`999px`(ピル型)、フォント12px
- 用途対応: 診断結果画面での該当手続きタグ表示、進捗管理画面でのステータス表示

## 5. Stepper

- レイヤー命名: `Stepper/{Orientation}` 例: `Stepper/Horizontal`
- Orientation: `Horizontal`(質問フロー用、PC/スマホとも上部固定)
- 構成要素: ステップドット(完了/現在/未完了の3状態)+ 接続線 + (任意)ステップラベル
- 寸法: ドット直径`8px`(未完了)/`12px`(現在, アクセントカラー)、接続線高さ`2px`
- 用途対応: 診断の質問フロー進捗表示(例: 5問中2問目)、セルフ登記ガイドの手続き進捗(書類収集→
  書式作成→提出)

## 6. Summary Panel

- レイヤー命名: `SummaryPanel/{Variant}` 例: `SummaryPanel/DiagnosisResult`
- 構成要素: 見出し(診断タイプ名、24px太字)+ 一言サマリ(14〜16px)+ アイコン/イラスト領域
- Auto Layout: 縦方向、padding `24px`、背景はアクセントカラーの薄色(トーン別に3種: セルフ推奨=緑系、
  代行推奨=オレンジ系、ハイブリッド=青系)
- 用途対応: 診断結果画面のファーストビュー(「あなたはセルフ登記向きです」等)

## 7. Accordion

- レイヤー命名: `Accordion/{State}` 例: `Accordion/Collapsed`
- State: `Collapsed / Expanded`
- 構成要素: ヘッダー(タイトル+開閉アイコン、高さ48px)+ 本文領域(Expanded時のみ表示、padding `16px`)
- 用途対応: 診断結果画面での手続きごとの詳細説明、必要書類チェックリストの各カテゴリ折りたたみ

## 8. CTA Block

- レイヤー命名: `CTABlock/{Variant}` 例: `CTABlock/SelfGuide`
- Variant: `SelfGuide`(セルフ登記ガイドへ誘導), `ExpertReferral`(専門家紹介へ誘導), `Hybrid`(両方提示)
- 構成要素: 見出し + 説明文 + Button(Primary/Large)を1つに絞る(Hybridのみ2つ許容、ただし優先度を
  視覚的に明示: 一方をPrimary、他方をSecondaryに)
- Auto Layout: 縦方向(スマホ)/横方向(PC)、padding `24px`、背景は白 or ごく薄いグレー、角丸`12px`
- 用途対応: 診断結果画面下部の主要CTA、コラム記事末尾の診断への誘導

## 9. 画面別コンポーネント対応表

| 画面 | 使用コンポーネント |
|---|---|
| TOP | Button(Primary/Large), CTABlock |
| 質問フロー | Stepper, Card(SelectableOption), Button |
| 診断結果 | SummaryPanel, Badge(ProcedureTag), Accordion, CTABlock |
| セルフ登記ガイド | Stepper, Card(ChecklistItem), Input, Button |
| 相続税申告シミュレーター | Input(Number/Select), SummaryPanel, CTABlock |
| 進捗管理 | Card(ChecklistItem), Badge(StatusTag), Stepper |
| コラム一覧/詳細 | Card(ArticleCard), CTABlock |
