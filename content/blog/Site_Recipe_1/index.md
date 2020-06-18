---
title: "サイトレシピ(1) 開発環境構築"
date: "2020-05-27T10:00:07.000"
description: ""
avatar: "./eyecatch_image.png"
category: "tech"
tags: ["linux", "gatsby", "サイトレシピ"]
---

CentOS7上にdocker-composeにより、Gatsbyの開発環境をインストールします。
githubへのアクセスは確立済みとし、dockerおよびdocker-composeは導入済みと仮定します。

ディレクトリ構成

~~~
gatsby_working
├── docker-compose.yml
└── gatsby
       ├── Dockerfile
       └── app
~~~


gatsby_working/gatsby/app 内に開発環境一式が展開されます。

Gatsbyには、<a href="https://www.gatsbyjs.org/starters?v=2">Starter</a>とよばれるGatsbyサイトの初期テンプレートが多数用意されています。
数あるStarterの中から好みのものを選び、それをカスタマイズして自分のサイトを構築していくのが、基本的なサイト構築の流れです。
当サイトは、<a href="https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-blog/">gatsby-starter-blog</a>というStarterを使用しました。

まずは、作業ディレクトリを作成し、そこに、githubからgatsby-starter-blogを取得します。

~~~bash
$ mkdir ~/gatsby_working
$ cd ~/gatsby_working
$ git clone https://github.com/gatsbyjs/gatsby-starter-blog.git gatsby-starter-blog --depth=1
~~~

gatsby-starter-blogをgatsby_working/gatsby/appにコピーします。

~~~bash
$ mkdir ~/gatsby_working/gatsby
$ cp -pr gatsby-starter-blog app
$ mv app ~/gatsby_working/gatsby
~~~

取得した、gatsby-starter-blogディレクトリがgatsby_working/gatsby/appの初期状態となります。

docker-compose.yml, Dockerfile, .dockerignoreを以下の内容で作成します。

docker-compose.ymlのポート番号を適宜書き換えて、

~~~yml:title=gatsby_working/docker-compose.yml
version: '3'
services:
  web:
    build: ./gatsby
    ports:
      - "8000:8000"
    volumes:
      - /app/node_modules
      - ./gatsby/app:/app
    environment:
      - NODE_ENV=development
    restart: always
~~~

Dockerfileはこのままでいけるでしょう。

~~~Dockerfile:title=gatsby_working/gatsby/Dockerfile
FROM node:alpine
EXPOSE 8000

RUN \
  apk --update add --no-cache python make g++ && \
  apk --update add vips-dev fftw-dev --no-cache --repository http://dl-3.alpinelinux.org/alpine/edge/community --repository http://dl-3.alpinelinux.org/alpine/edge/main && \
  rm -fR /var/cache/apk/*

WORKDIR /app
COPY ./app/package*.json ./
RUN npm install && npm cache clean --force
COPY ./app .
CMD ["npm", "run", "develop", "--", "--host", "0.0.0.0" ]
~~~

~~~conf:title=gatsby_working/gatsby/.dockerignore
node_modules
~~~

以上が揃ったら、

~~~bash
$ cd ~/gatsby_working
$ docker-compose up -d --build
~~~

以上でgatsby-starter-blogによるサイト構築が完了。
構築時のログを確認する。
~~~bash
$ cd ~/gatsby_working
$ docker-compose logs web
~~~


動作確認

<pre>http://ホスト名:8000/</pre>



