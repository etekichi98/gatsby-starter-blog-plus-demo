---
title: "サイトレシピ(2) サイトのカスタマイズ"
date: "2020-05-27T10:00:06.000"
description: ""
avatar: "./eyecatch_image.png"
category: "tech"
tags: ["linux", "gatsby", "サイトレシピ"]
---

ここまで出来たら、以降、~/gatsby_working/gatsby/app 以下を修正してサイトをカスタマイズしていきます。
編集すべきは以下のファイルです。

### app以下のディレクトリ構成

~~~
app
├── contents ; サイトの内容
│    ├── assets
│    │      ├── gatsby-icon.png ; サイトのアイコン
│    ｜      └── profile-pic.jpg ; サイト管理者肖像
│    └── blog ; ブログを記事毎にサブディレクトリに配置
│            ├── hello-world ; 画像付き記事の例
│            │     ├── index.md ; マークダウンで記述した記事
│            │     └── salty_egg.jpg
│            ├── my-second-post
│            │     └── index.md
│            └── new-beginnings
│                   └── index.md
├── gatsby-config.js ; サイトの構成ファイル
├── gatsby-node.js ; ページ生成等、サイト構築手順の記述
├── package.jso  ; 使用するパッケージの定義
├── public ; 生成されたサイトデータ一式
├── src
│    ├── components
│    │      └── layout.js ; ページレイアウトの定義
│    ├── pages
│    │      └── index.tsx ; トップページ
│    └── templates
│            └── blog-post.js ; ブログ記事ページ
└── static
      └── favicon.ico

~~~

### プロフィール等の修正

gatsby-config.jsのsiteMetadataを自分用に修正します。


~~~json:title=gatsby_working/gatsby/app/gatsby-config.js
odule.exports = {
  siteMetadata: {
    title: `Gatsby Starter Blog`,
    author: {
      name: `Kyle Mathews`,
      summary: `who lives and works in San Francisco building useful things.`,
    },
    description: `A starter blog demonstrating what Gatsby can do.`,
    siteUrl: `https://gatsby-starter-blog-demo.netlify.com/`,
    social: {
      twitter: `kylemathews`,
    },
  },

    ...

~~~

gatsby/app/assets/gatsby-icon.png
サイトのアイコンを差し替えます。

gatsby/app/assets/profile-pic.jpg
サイト管理者肖像を差し替えます。



### 記事の追加

記事は、app/contents/blog の下にサブディレクトリを置いて、その中の
index.mdという名前のマークダウンファイルに書きます。

例えば、app/contents/blog/hoge/index.md に書いた記事は、
<pre>http://ホスト名:8000/hoge/</pre> でアクセスされます。

記事中に写真 hoge.jpg を貼る場合は、hoge.jpg をindex.mdと同じディレクトリに置き、
以下のマークダウン記法でいけます。

<pre>![Image title](./hoge.jpg)</pre>

記事にはヘッダが必要です。

title, dateを記述してください。descriptionは書かなければ、自動で生成されます。

後述しますが、本サイトでは、カテゴリー機能とタグ機能を追加します。
利用する場合は、以下のように、categoryとtagsを記述してください。
アイキャッチ画像機能も追加しますので、利用する場合は、avatarを記述してください。
アイキャッチ画像は、index.mdと同一ディレクトリに入れます。

本文はマークダウンで記述します。


~~~txt:title=gatsby_working/gatsby/app/contents/blog/hoge/index.md
---
title: "記事のタイトル"
date: "2020-05-11T10:00:00.000"
description: "記事の要約"
avatar: "./eyecatch_image.png"
category: "tech"
tags: ["gatsby", "linux", "web"]
---

本文
    ...

~~~

### サイトの再構築

記事を追加修正したり、カテゴリやタグの追加やレイアウトを変更した場合は、修正次第、サイトに反映されます。

gatsby-node.jsを修正した場合は、以下のコマンドでサイトの再構築を行います。

~~~bash
$ cd ~/gatsby_working
$ docker-compose stop
$ docker-compose exec web npm run build
$ docker-compose start
~~~




