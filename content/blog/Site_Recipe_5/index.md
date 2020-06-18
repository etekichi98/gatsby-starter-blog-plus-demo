---
title: "サイトレシピ(5) コードブロック"
date: "2020-05-27T10:00:03.000"
description: ""
avatar: "./eyecatch_image.png"
category: "tech"
tags: ["linux", "gatsby", "サイトレシピ"]
---

以下を参考に実装しました。

https://kikunantoka.com/2019/12/03--install-syntax-highlight/<br/>
GatsbyJSで作っているブログでシンタックスハイライトが適用されるようにした

https://kikunantoka.com/2019/12/11--install-code-title/<br/>
GatsbyJSで作っているブログでコードブロックにタイトルをつけられるようにした


コードブロックにタイトルをつけるため、package.jsonにgatsby-remark-code-titlesを追加します。

~~~json:title=gatsby/app/package.json
  "dependencies": {
    "gatsby-remark-code-titles": "^1.1.0",
    ...
~~~

gatsby-config.jsのpluginsの以下の位置にgatsby-remark-code-titlesを追加します。

~~~json:title=gatsby/app/gatsby-config.js

    ...

  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-code-titles`,
          `gatsby-remark-prismjs`,
    ...

~~~

コードブロックを利用するコンポーネントlayoutに、コードブロックのテーマ（スタイル）を指定します。


~~~js:title=gatsby/app/src/components/layout.js

import "prismjs/themes/prism-tomorrow.css"

~~~

テーマを決めるスタイルファイルは以下のいずれかから選択します。

* prism-coy.css
* prism-funky.css
* prism-solarizedlight.css
* prism-twilight.css
* prism-dark.css
* prism-okaidia.css
* prism-tomorrow.css
* prism.css


コードブロックに付けるタイトルのスタイルは、
layout.cssという名前でスタイルファイルを作成し、layout.jsにインポートしました。

~~~js:title=gatsby/app/src/components/layout.js

import "./layoutw.css"

~~~

~~~js:title=gatsby/app/src/components/layout.ccs
.gatsby-code-title{
    background: #999;
    color: #eee;
    margin: 24px 0px -24px;
    padding: 6px 12px;
    font-size: 0.8em;
    line-height: 1;
    font-weight: bold;
    display: table;
    border-radius: 4px 4px 0px 0px;
}
.gatsby-highlight{
    margin: 24px 0px;
    font-size: 0.8em;
    font-weight: normal;
}
~~~

