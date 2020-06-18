import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="About" />
      <h1>About Me</h1>
<p>2016年9月に30年以上務めた装置メーカーを定年退職し、グループIT企業で再雇用となりました。それまでの、どちらかといえば制御系や画像処理系のソフトウェアエンジニアから、いきなりITエンジニアが勤まる訳でもなく、再雇用先ではだいぶ足をひぱってしまったのですが。。。3年ほどIT技術の修行をしました。</p>
<p>pythonで日本語処理とか、javaで書かれたWebアプリの機能追加とかを担当しました。孫の年代の先輩エンジニアに鍛えられ、今ではIT技術系のブログなんかを読んでも、多少は理解できるようにはなりました。これはこれで、けっこう楽しくもありました。会社の意向とは違ってたかもしれませんが。。。</p>
<p>2019年9月には完全退職し、晴れてプー太郎となりました。3年間で得たスキルを使い、有り余る時間で、かねてからやりたかった相場の機械学習による予測に取り組みはじめましたが、今のところ目ぼしい成果はありません。これはおいおい当サイトに記録を残したいと思っております。</p>
<p>Webサイト構築の技術も、当方が知っていた1990年代前半の技術とは、全く様変わりしました。当時は、今のマークダウンのようなhtmlでページを記述したものです。</p>
<table border="1"  bgcolor="#dddddd" >
<tr>
<td>
&lt;H1&gt;タイトル<br/>
&lt;P&gt;内容説明<br/>
&lt;UL&gt;<br/>
&lt;LI&gt;ポイントその１<br/>
&lt;LI&gt;ポイントその２<br/>
&lt;/UL&gt;
</td>
</tr>
</table>
<p>こんなかんじです。要素名は大文字だし、閉じタグはなくてもいいし。今とは大違い。cssもjavascriptも未だありません。</p>
<p>こんな当方が、Web技術キャッチアップを目指し、WordPressを通り越して、行きついた先がGatsby.jsでした。で、25年ぶりに書いたサイトがここです。年寄りの冷や水を笑ってやってください。</p>
    </Layout>
  )
}

export default AboutPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
