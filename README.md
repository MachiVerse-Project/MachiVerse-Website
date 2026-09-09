# MachiVerse Website

エージェントベース大規模世界シミュレーション「MachiVerse」の公式Webサイト用リポジトリです。

## このリポジトリについて

このリポジトリでは、MachiVerseを外部へ紹介する公式Webサイトのソースコードおよび関連コンテンツを管理します。

MachiVerse本体の開発については、以下のリポジトリを参照してください。

- [MachiVerse-Project/MachiVerse](https://github.com/MachiVerse-Project/MachiVerse)

## 現在の構成

初期段階では、ビルドツールやWebフレームワークに依存しない静的サイトとして構成しています。

```text
.
├── index.html             # トップページ
├── 404.html               # 404ページ
├── CNAME                  # GitHub Pages用カスタムドメイン
├── assets/
│   ├── css/
│   │   └── main.css       # 共通スタイル
│   └── images/            # Web配信用ブランドアセット
├── robots.txt             # クローラー向け設定
├── sitemap.xml            # サイトマップ
├── .nojekyll              # Jekyll処理を無効化
├── LICENSE                # Apache License 2.0
└── TRADEMARKS.md          # MachiVerse商標ポリシー
```

現時点ではHTML/CSSのみで動作し、ビルド処理は必要ありません。今後のページ数や要件に応じて、必要であれば静的サイトジェネレーター等の導入を検討します。

## ブランチ運用

通常の開発は `develop` を統合先とし、公開する変更を `main` へ反映します。

```text
feature/*
   ↓
develop
   ↓
main
   ↓
GitHub Pages
```

`main` は本番公開可能な状態を維持します。

## ローカルで確認する

リポジトリのルートで簡易HTTPサーバーを起動してください。

```bash
python -m http.server 8080
```

起動後、ブラウザから `http://localhost:8080/` を開きます。

## デプロイ

本番サイトは GitHub Pages を利用し、`main` ブランチのルートを公開元とします。

- 公開ブランチ: `main`
- 公開ディレクトリ: `/ (root)`
- カスタムドメイン: `machiverse.app`
- 本番URL: `https://machiverse.app/`

リポジトリの `CNAME` には `machiverse.app` を設定しています。

GitHub側では、Repository Settings → Pages からGitHub Pagesを有効化し、`main` / `/ (root)` を公開元として設定します。カスタムドメインには `machiverse.app` を設定します。

ドメイン側のDNSレコードもGitHub Pagesを参照するように設定する必要があります。HTTPS証明書が発行可能になった後は、GitHub Pages側でHTTPSを強制します。

## コンテンツ方針

MachiVerseの紹介では、長期的に目指している世界像と、現在実装されている機能を区別して記載します。

トップページでは、MachiVerseの中心的な考え方である「世界の現在だけではなく、そこへ至った因果と歴史も扱う」という方向性を中心に紹介しています。

## ブランドアセット

Webサイトで利用するロゴ、favicon、OG画像などは `assets/images/` に配置しています。

ブランドアセットの原本は、MachiVerse本体リポジトリの `promotion` ブランチにある `assets/images/` を基準とし、WebsiteリポジトリにはWeb配信で必要なものだけを保持します。

## 開発状況

Webサイトは現在、初期構築段階です。初回セットアップとして、基本ページ、レスポンシブスタイル、SEO用メタデータ、ブランドアセット、ライセンス・商標方針、GitHub Pages公開用構成まで整備しています。

## ライセンス

このリポジトリのソースコードおよびその他の資料は、特に明記されていない限り [Apache License 2.0](./LICENSE) のもとで提供されます。

MachiVerseの名称、ロゴ、その他のブランド識別子の利用については、[TRADEMARKS.md](./TRADEMARKS.md) を参照してください。
