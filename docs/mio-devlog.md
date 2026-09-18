# MIO DEVLOG 更新方法

トップページの「MIO DEVLOG / 南雲の開発日記」は、Websiteリポジトリではなく `MachiVerse-Content` からJSONを取得して表示します。

## サイト側の読み込み仕様

Website側の `www/assets/js/mio-devlog.js` は、次の新しい日別フィード構成を優先して読み込みます。

- 設定: `https://content.machiverse.app/feeds/mio-devlog/config.json`
- 日別投稿: `https://content.machiverse.app/feeds/mio-devlog/posts/YYYY-MM-DD.json`
- 日付基準: `Asia/Tokyo`
- 表示対象: 当日を含む直近7日間

日別投稿は7日分を並列取得し、存在しない日付のJSONが `404` の場合は投稿なしとして正常にスキップします。取得できた投稿は `date` の新しい順に並べて表示します。

新しい `config.json` がまだ公開されていない場合、または新形式の設定取得に失敗した場合は、移行期間の互換性維持のため従来のフィードへフォールバックします。

- 従来フィード: `https://content.machiverse.app/feeds/mio-devlog.json`

このフォールバックは、MachiVerse-Content側の日別JSON移行が完了するまでサイト表示を維持するためのものです。

## 新しいContent構成

Content側の移行後は、次の構成を使用します。

```text
root/
└─ feeds/
   └─ mio-devlog/
      ├─ config.json
      └─ posts/
         ├─ 2026-09-18.json
         ├─ 2026-09-17.json
         ├─ 2026-09-16.json
         └─ ...
```

### config.json

共通設定のみを保持します。

- `enabled`: `false` にするとMIO DEVLOG全体を非表示にします。
- `profile`: 南雲澪の表示名、ハンドル、肩書き、アバターです。
- `section`: セクション見出しと説明文です。

表示期間はWebsite側で直近7日間に固定します。

### 日別投稿JSON

各 `posts/YYYY-MM-DD.json` は、その日付の投稿だけを `posts` 配列へ保持します。

投稿が1件もない日はJSONを作成する必要はありません。Website側は `404` を投稿なしとして扱います。

各投稿で使用する主な項目:

- `id`: 投稿を識別する一意の文字列。
- `date`: ISO 8601形式の日時。原則として `+09:00` を使用します。
- `badge`: `ALPHA 1.0` や `GATEWAY` など投稿のテーマ。
- `body`: 投稿本文。
- `tags`: 任意。投稿下部にハッシュタグ風で表示します。
- `media`: 任意。`src` と `alt` を指定すると投稿画像を表示します。

`badge`、`body`、`media.alt` は `ja` / `en` / `zh-TW` / `ko` の多言語オブジェクトにできます。

画像URLは、Content JSON単体でも解決できるよう `https://machiverse.app/...` の絶対URLを使用します。

## 表現上の注意

南雲澪はMachiVerse公式キャラクターです。MIO DEVLOGはMachiVerse Projectが管理するキャラクターコンテンツとして扱い、実在人物の個人SNSや実在SNSの埋め込みであるかのように表現しないでください。

## 実装ファイル

- 新設定: `MachiVerse-Content/root/feeds/mio-devlog/config.json`
- 日別投稿: `MachiVerse-Content/root/feeds/mio-devlog/posts/YYYY-MM-DD.json`
- 従来データ: `MachiVerse-Content/root/feeds/mio-devlog.json`
- 描画・読み込み: `www/assets/js/mio-devlog.js`
- スタイル: `www/assets/css/mio-devlog.css`
- スクリプト読み込み元: `www/assets/js/site-enhancements.js`

通常の投稿更新ではWebsiteリポジトリを変更する必要はありません。日別フィード移行後は、該当日のContent JSONだけを更新します。
