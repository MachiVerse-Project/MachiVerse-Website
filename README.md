# MachiVerse Website

エージェントベース大規模世界シミュレーション「MachiVerse」の公式Webサイト用リポジトリです。

## このリポジトリについて

このリポジトリでは、MachiVerseを外部へ紹介する公式Webサイトのソースコードおよび関連コンテンツを管理します。

MachiVerse本体の開発については、以下のリポジトリを参照してください。

- [MachiVerse-Project/MachiVerse](https://github.com/MachiVerse-Project/MachiVerse)

## ディレクトリ構成

公開対象とリポジトリ管理用ファイルを分離しています。GitHub Pagesへ配信されるのは `www/` 配下だけです。

```text
.
├── .github/
│   └── workflows/
│       └── pages.yml          # www/ をGitHub Pagesへデプロイ
├── docs/                      # 運用・制作ドキュメント（非公開ルート）
├── www/                       # GitHub Pagesの公開ルート
│   ├── index.html             # 日本語トップ
│   ├── index-en.html          # 英語トップ
│   ├── index-zh-tw.html       # 台湾華語トップ
│   ├── index-ko.html          # 韓国語トップ
│   ├── developer*.html        # 技術情報
│   ├── self-hosting*.html     # Self-hosting
│   ├── architecture*.html     # Architecture
│   ├── license.html
│   ├── trademarks.html
│   ├── 404.html
│   ├── CNAME
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── .nojekyll
│   └── assets/
│       ├── css/               # 現在の公開ページで使用するCSSのみ
│       ├── js/                # 現在の公開ページで使用するJavaScriptのみ
│       └── images/            # 現在の公開ページで使用する画像のみ
├── AGENTS.md                  # 制作・運用ルール
├── LICENSE                    # Apache-2.0ライセンス本文
├── RIGHTS.md                  # Creative Asset・二次創作・利用方針
├── TRADEMARKS.md              # MachiVerse商標ポリシー
└── README.md
```

`www/` はデプロイ成果物ではなく、ビルド不要の静的サイトそのものです。README、制作メモ、原本画像、中間素材、未使用アセットなど、Web配信に不要なファイルは `www/` に置きません。

## ブランチ運用

通常の開発は `develop` を統合先とし、公開する変更を `main` へ反映します。

```text
feature/*
   ↓
develop
   ↓
main
   ↓
GitHub Actions
   ↓
GitHub Pages (www/ のみ)
```

`main` は本番公開可能な状態を維持します。

## ローカルで確認する

リポジトリのルートから、`www/` をドキュメントルートとして簡易HTTPサーバーを起動します。

```bash
python -m http.server 8080 --directory www
```

起動後、ブラウザから `http://localhost:8080/` を開きます。

## デプロイ

本番サイトはGitHub Pagesを利用し、`.github/workflows/pages.yml` が `main` の `www/` だけをPages artifactとしてアップロード・公開します。

- 本番ブランチ: `main`
- 公開ディレクトリ: `www/`
- デプロイ方式: GitHub Actions
- カスタムドメイン: `machiverse.app`
- 本番URL: `https://machiverse.app/`

`www/CNAME` には `machiverse.app` を設定しています。

GitHub側の Pages Source は **GitHub Actions** を使用します。従来の `main / (root)` や `main /docs` を公開元にはしません。

## 公開アセットの方針

`www/assets/` には、現在の公開ページ・公開CSS・公開JavaScriptから実際に参照されるファイルだけを置きます。

- キャラクター画像はWebページが参照する `www/assets/images/characters/nagumo-mio/web/` の別名ファイルだけを配信します。
- 元画像一式、生成途中の素材、告知テンプレート、将来利用候補などは公開ルートへ置きません。
- 未使用になったCSS、JavaScript、画像は参照を確認して `www/` から削除します。
- OGP画像、favicon、CSS背景画像などHTML以外から参照されるアセットも公開上の依存関係として扱います。

ブランドアセットの原本は、MachiVerse本体リポジトリの `promotion` ブランチにある `assets/images/` を基準とします。

## コンテンツ方針

MachiVerseの紹介では、長期的に目指している世界像と、現在実装されている機能を区別して記載します。

トップページでは、MachiVerseの中心的な考え方である「世界の現在だけではなく、そこへ至った因果と歴史も扱う」という方向性を中心に紹介しています。

## ライセンスと権利

このリポジトリの**ソフトウェアコード（HTML / CSS / JavaScript等）**は、特に明記されていない限り [Apache License 2.0](./LICENSE) のもとで提供されます。

キャラクター、イラスト、ロゴ、画像、3Dモデル、音声、音楽、動画その他のCreative Assetは、Apache-2.0の対象であると明示されていない限り、[RIGHTS.md](./RIGHTS.md) の **MachiVerse Rights, Fan Works & Asset Use Policy** に従います。

MachiVerseの名称、ロゴ、その他のブランド識別子の利用については、[TRADEMARKS.md](./TRADEMARKS.md) も参照してください。
