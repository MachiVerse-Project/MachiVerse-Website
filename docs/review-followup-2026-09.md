# 外部レビュー再対応メモ（2026-09）

再レビューで挙がった「実装の強さを初見で証明し切れていない」という指摘に対する対応状況を記録する。

## 対応済み / この変更で対応

- 一般トップのヒーロー右側を、南雲澪の大型ビジュアルから **General View実画面掲載枠** へ変更する。
- 実キャプチャ取得前は `assets/images/site/general-view-coming-soon.svg` を表示し、**実画面ではないことを明記**する。
- 実キャプチャ取得タスクは Issue #12 で継続管理する。
- 「誰向けか」をヒーロー直下で明示する。都市・社会・エージェントシミュレーションの研究・設計・開発に取り組む人を主な入口として示す。
- ヒーローのPrimary CTAで、固定 Alpha 1.0 release を使う導線であることを明示する。
- trust stripへ `Roadmap` / `Security` / `C# / .NET 10` を追加する。
- `Why MachiVerse` に City Builder / ABM Toolkit / MachiVerse の一般的な主目的の違いを示す比較を追加する。個別製品すべてへの断定ではない旨も併記する。
- Alpha 1.0 vertical slice と ROADMAP M0〜M6 が別軸であることを一般トップの現在地付近で説明する。
- Developerページへ「初めてのContribution」入口を追加し、架空の `good first issue` を作らず Contribution Guide / Discussions / Issues へ案内する。
- Quick StartのコピーUI、固定release / developの分離、release情報、SEO metadata / canonical / hreflang / sitemap / robotsの検証は既存実装を維持する。

## 実素材待ち

### General View / Administration View 実キャプチャ

Issue #12を完了条件とする。placeholderを実画面のように誤認させないこと。実素材掲載後は `general-view-coming-soon.svg` を公開ルートから削除する。

## リポジトリ外の運用確認

### Google Search Console

本番公開後に次を確認する。

1. `https://machiverse.app/` のURL検査
2. Googleが選択したcanonical
3. クロール済み / インデックス未登録等の理由
4. `sitemap.xml` の取得・処理状態
5. 手動による対策の有無

コード側ではself-canonical、4言語hreflang、robots、sitemap、OGP、description、favicon、JSON-LDの検証をPages deployment前に行う。

### Bing Webmaster Tools

sitemap送信状態、URL inspection相当、クロールエラーを確認する。

### GitHub About欄

本体リポジトリのAbout / Website URLが `official.machiverse.app` のままの場合は、最終canonicalである `https://machiverse.app/` へ管理画面から統一する。現在のGitHub接続ではrepository metadataの管理変更は行えないため、手動運用項目とする。

## 方針

実装済みの事実を強く見せる一方、実画面・規模・性能・production readinessについて未確認の証拠を作らない。placeholder、concept visual、将来像は実装済み画面と必ず区別する。
