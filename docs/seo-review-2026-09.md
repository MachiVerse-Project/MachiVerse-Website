# SEOレビュー対応メモ（2026-09）

外部レビューで挙がった検索スパム／信頼性／多言語SEOの観点について、MachiVerse公式Webサイトでは次を運用基準とする。

- 現実の開発・運営主体は MachiVerse Project とし、本体リポジトリへリンクする。
- 公開クレジットでは、Kazuto Hashimoto を `Co-Founder / Project Director`、南雲澪を `Co-Founder / System Development Lead` として同格に扱う。
- 南雲澪はMachiVerse公式キャラクターであり、公式サイトでは `Official Character / MIO GUIDE` も併記する。キャラクター設定上の役職と実在人物・法的主体を混同させない。
- 一般／技術ページのローカライズは `ja` / `en` / `zh-TW` / `ko` を1セットとして扱い、各URLはself-canonicalとする。
- `hreflang` はHTMLの実行時DOMと `sitemap.xml` の双方で相互関係が一致するよう維持する。
- `robots.txt` はサイト全体をクロール可能にし、`https://machiverse.app/sitemap.xml` を通知する。
- OGP、description、canonical、faviconは各公開ページで欠落させない。
- JSON-LDではWebサイト運営主体として MachiVerse Project を示す。Kazuto Hashimoto は実在の `Co-Founder / Project Director` として構造化してよいが、南雲澪を実在人物の開発者・著者として構造化しない。
- Alpha、未実装機能、性能・規模について、実装済みと将来像を混同しない。

`www/sitemap.xml` は4言語の相互 `hreflang` と `x-default` を持つ正本として扱う。ブラウザ実行時にも `main.js` が同じ対応関係をheadへ正規化し、各ページのcanonicalを自己URLへ揃える。

`.github/workflows/pages.yml` は本番デプロイ前に、主要16ページについてmeta description、self-canonical、favicon、`og:image` を検証し、さらにrobotsのSitemap宣言とsitemap内の4言語相互関係を検証する。

Search Console / Bing Webmaster Tools上のインデックス状況・手動対策の有無は、リポジトリ内の実装とは別に本番運用時に確認する。
