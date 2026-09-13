# MIO DEVLOG 更新方法

トップページの「MIO DEVLOG / 南雲の開発日記」は、Websiteリポジトリではなく `MachiVerse-Content` からJSONを取得して表示します。

更新元:

`MachiVerse-Project/MachiVerse-Content/root/feeds/mio-devlog.json`

公開URL:

`https://content.machiverse.app/feeds/mio-devlog.json`

## よく触る項目

- `enabled`: `false` にするとMIO DEVLOG全体を非表示にします。
- `maxPosts`: 表示する投稿件数です。
- `profile`: 南雲澪の表示名、ハンドル、肩書き、アバターです。
- `section`: セクション見出しと説明文です。
- `posts`: 開発日記の投稿一覧です。上にあるものから新しい順に表示されます。

## 投稿の追加

`posts` 配列へオブジェクトを追加します。

- `id`: 投稿を識別する一意の文字列。
- `date`: ISO 8601形式の日時。
- `badge`: `ALPHA 1.0` や `GATEWAY` など投稿のテーマ。
- `body`: 投稿本文。
- `tags`: 任意。投稿下部にハッシュタグ風で表示します。
- `media`: 任意。`src` と `alt` を指定すると投稿画像を表示します。

`badge`、`body`、`media.alt` は `ja` / `en` / `zh-TW` / `ko` の多言語オブジェクトにできます。

画像URLは、Content JSON単体でも解決できるよう `https://machiverse.app/...` の絶対URLを使用します。

## 表現上の注意

南雲澪はMachiVerse公式キャラクターです。MIO DEVLOGはMachiVerse Projectが管理するキャラクターコンテンツとして扱い、実在人物の個人SNSや実在SNSの埋め込みであるかのように表現しないでください。

## 実装ファイル

- データ: `MachiVerse-Content/root/feeds/mio-devlog.json`
- 公開URL: `https://content.machiverse.app/feeds/mio-devlog.json`
- 描画: `www/assets/js/mio-devlog.js`
- スタイル: `www/assets/css/mio-devlog.css`
- 読み込み: `www/assets/js/site-enhancements.js`

通常の投稿更新ではWebsiteリポジトリを変更する必要はありません。`MachiVerse-Content` のJSONだけを更新してください。
