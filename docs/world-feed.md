# WORLD FEED 更新方法

公式インスタンス参加ページの疑似SNS「WORLD FEED」は、Websiteリポジトリではなく `MachiVerse-Content` からJSONを取得して表示します。

更新元:

`MachiVerse-Project/MachiVerse-Content/root/feeds/world-feed.json`

公開URL:

`https://content.machiverse.app/feeds/world-feed.json`

WORLD FEEDはトップページには表示せず、`instance*.html` にある `data-world-feed-anchor` の位置へだけ描画します。

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
- `avatar`: 公開画像の絶対URL。省略時は `avatarText` を表示できます。
- `date`: ISO 8601形式の日時。
- `badge`: 投稿種別ラベル。
- `body`: 本文。
- `media`: 任意。`src` と `alt` を指定すると投稿画像を表示します。
- `link`: 任意。外部リンク。
- `linkLabel`: 任意。外部リンクの表示名。
- `metrics`: `reply` / `repost` / `like` のデモ数値。

画像URLは、Content JSON単体でも解決できるよう `https://machiverse.app/...` の絶対URLを使用します。

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

- データ: `MachiVerse-Content/root/feeds/world-feed.json`
- 公開URL: `https://content.machiverse.app/feeds/world-feed.json`
- 描画: `www/assets/js/social-feed.js`
- スタイル: `www/assets/css/social-feed.css`
- 配置先: `www/instance.html` / `instance-en.html` / `instance-zh-tw.html` / `instance-ko.html`
- 読み込み: `www/assets/js/site-enhancements.js`

投稿内容を更新するだけであればWebsiteリポジトリを変更する必要はありません。`MachiVerse-Content` のJSONだけを更新してください。
