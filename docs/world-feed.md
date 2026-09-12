# WORLD FEED 更新方法

トップページの疑似SNS「WORLD FEED」は、HTMLを編集せずに次のファイルだけで更新できます。

`www/assets/data/social-feed.json`

## よく触る項目

- `enabled`: `false` にするとWORLD FEED全体を非表示にします。
- `maxPosts`: 表示する投稿件数です。
- `section`: セクション見出し・説明文です。
- `posts`: 投稿一覧です。上にあるものから順に表示されます。

## 投稿の追加

`posts` 配列へオブジェクトを追加します。主な項目は次のとおりです。

- `id`: 投稿を識別する一意の文字列。
- `tone`: `project` / `mio` / `resident` を指定すると表示色が変わります。
- `author`: 投稿者名。文字列または `ja` / `en` / `zh-TW` / `ko` の多言語オブジェクトを指定できます。
- `handle`: 表示用ハンドル。
- `avatar`: 既存画像への相対パス。省略時は `avatarText` を表示できます。
- `date`: ISO 8601形式の日時。
- `badge`: 投稿種別ラベル。
- `body`: 本文。
- `media`: 任意。`src` と `alt` を指定すると投稿画像を表示します。
- `link`: 任意。外部リンク。
- `linkLabel`: 任意。外部リンクの表示名。
- `metrics`: `reply` / `repost` / `like` のデモ数値。

## 多言語

`author`、`badge`、`body`、`linkLabel`、`media.alt` は次の形式で記述できます。

```json
{
  "ja": "日本語",
  "en": "English",
  "zh-TW": "繁體中文",
  "ko": "한국어"
}
```

対象言語がない場合は `en`、次に `ja` の順でフォールバックします。

## 実装ファイル

- データ: `www/assets/data/social-feed.json`
- 描画: `www/assets/js/social-feed.js`
- スタイル: `www/assets/css/social-feed.css`
- 読み込み: `www/assets/js/site-enhancements.js`

投稿内容を更新するだけであれば、描画・スタイル・HTML側を変更する必要はありません。
