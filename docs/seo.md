# MachiVerse SEO 運用方針

MachiVerse公式サイトの検索流入を、誇張せず技術的に正確な情報から育てるための運用メモです。

## 基本方針

- 検索順位だけを目的に文章へ不自然なキーワードを詰め込まない。
- `canonical`、`hreflang`、sitemap、title、description、OG画像を各公開ページで一貫させる。
- 「現在実装済み」と「設計・将来構想」を明確に分け、検索結果から訪れた人にも誤解を与えない。
- 技術仕様の詳細は公式Webサイトへ重複転載せず、MachiVerse本体リポジトリの正本へ誘導する。
- 多言語ページは直訳ではなく、それぞれの言語で自然な検索意図に合わせる。

## ページ別の主な検索意図

| ページ | 主な検索意図 | 主軸となる語句 |
| --- | --- | --- |
| `/` | MachiVerseとは何か、世界シミュレーションを知りたい | MachiVerse、世界シミュレーション、エージェントベース、大規模シミュレーション、オープンソース |
| `/developer.html` | 技術概要、開発参加、技術情報の入口 | MachiVerse 技術情報、開発、Alpha 1.0、Simulation Core、Gateway |
| `/self-hosting.html` | 自分のPCや管理環境で動かしたい | MachiVerse セルフホスト、self-hosting、Alpha 1.0、Windows Quick Start |
| `/architecture.html` | 設計思想・アーキテクチャを理解したい | MachiVerse アーキテクチャ、WorldState、Gateway、Simulation Core、決定論、Simulation Step |

英語・台湾華語・韓国語版では、上表の概念を各言語の自然な表現へ置き換える。製品固有語である `MachiVerse`、`Simulation Core`、`Gateway`、`WorldState`、`Simulation Step` は検索上の識別性と技術的一貫性のため原則維持する。

## 技術SEOチェック

公開ページを追加・変更するときは以下を確認する。

1. `<title>` がそのページ固有の内容を説明している。
2. `meta description` が本文と一致し、未実装機能を実装済みのように表現していない。
3. 自己参照 `canonical` が正しい公開URLを指している。
4. 翻訳ページがある場合、全言語の `hreflang` と `x-default` が相互に対応している。
5. `og:title`、`og:description`、`og:url`、`og:image` がページ内容と一致している。
6. `sitemap.xml` にcanonical URLのみを掲載し、翻訳セットは `xhtml:link` で対応付ける。
7. 主要ページの検索結果用画像はクロール可能な絶対URLで指定する。
8. 404ページや公開対象外ページはindexさせない。
9. 見出し階層はページ内容を表し、主要ページには一意な`h1`を置く。
10. JavaScriptを実行しなくても主要本文と内部リンクをHTMLから取得できる状態を維持する。

## 構造化データ

一般向けページでは `WebSite` と `SoftwareSourceCode`、技術ページでは `WebSite` と `BreadcrumbList` を出力する。現在は `assets/js/site-enhancements.js` が表示中ページのcanonical・言語・meta descriptionに合わせてJSON-LDを生成する。

`SoftwareApplication` のリッチリザルトだけを目的に、存在しないレビュー、評価、価格、実績などを追加しない。構造化データはページ上で確認できる事実に限定し、Alpha 1.0のバージョン、公開日、コードリポジトリ、Apache-2.0ライセンス、C# / .NET 10といった検証可能な情報のみを扱う。

新しいページ種別を追加する場合は、既存のJSON-LDへ無理に当てはめず、そのページに対応するSchema.org型が本当に必要かを先に確認する。

## Search Console 公開後チェック

本番反映後はGoogle Search Consoleで以下を確認する。

- `https://machiverse.app/sitemap.xml` を送信する。
- `/`、`/developer.html`、`/self-hosting.html`、`/architecture.html` をURL検査する。
- Google選択canonicalが指定canonicalと一致するか確認する。
- インデックス未登録やクロールエラーがないか確認する。
- 検索クエリを見て、実際に流入が発生した語句に合わせてtitle・description・本文を改善する。

## コンテンツSEOの次候補

検索流入を増やす場合、単にトップページへ説明を追加するより、検索目的が明確な独立ページを増やす。

- MachiVerseとは何か / 世界シミュレーションの考え方
- エージェントベース世界シミュレーションで何を扱うのか
- 決定論とreplayをなぜ重視するのか
- authoritative WorldStateとGatewayの役割
- Alpha 1.0をローカルで起動する手順

ただし、実装状況が変わりやすい技術記事では、Webサイト内に正本を複製せず、本体リポジトリへのリンクを中心にする。
