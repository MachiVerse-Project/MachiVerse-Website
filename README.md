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
├── assets/
│   └── css/
│       └── main.css       # 共通スタイル
├── robots.txt             # クローラー向け設定
├── sitemap.xml            # サイトマップ
├── .nojekyll              # 静的ファイルをそのまま配信するための設定
├── LICENSE                # Apache License 2.0
└── TRADEMARKS.md          # MachiVerse商標ポリシー
```

現時点ではHTML/CSSのみで動作し、ビルド処理は必要ありません。今後のページ数や要件に応じて、必要であれば静的サイトジェネレーター等の導入を検討します。

## ローカルで確認する

リポジトリのルートで簡易HTTPサーバーを起動してください。

```bash
python -m http.server 8080
```

起動後、ブラウザから `http://localhost:8080/` を開きます。

## コンテンツ方針

MachiVerseの紹介では、長期的に目指している世界像と、現在実装されている機能を区別して記載します。

トップページでは、MachiVerseの中心的な考え方である「世界の現在だけではなく、そこへ至った因果と歴史も扱う」という方向性を中心に紹介しています。

## 開発状況

Webサイトは現在、初期構築段階です。

今後、公式ロゴや画像素材、各種詳細ページ、公開・デプロイ方法などを順次整備します。

## ライセンス

このリポジトリのソースコードおよびその他の資料は、特に明記されていない限り [Apache License 2.0](./LICENSE) のもとで提供されます。

MachiVerseの名称、ロゴ、その他のブランド識別子の利用については、[TRADEMARKS.md](./TRADEMARKS.md) を参照してください。
