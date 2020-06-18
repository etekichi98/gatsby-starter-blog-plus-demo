---
title: "サイトレシピ(6) アイキャッチ画像"
date: "2020-05-27T10:00:02.000"
description: ""
avatar: "./eyecatch_image.png"
category: "tech"
tags: ["linux", "gatsby", "サイトレシピ"]
---

以下を参考に実装しました。

https://blog.u-chan-chi.com/post/gatsby-markdown-images/<br/>
Gatsby JS でBlogを作成する際、マークダウンファイルに設定したimageを扱う方法

トップページやカテゴリ別記事一覧ページ、タグ別記事一覧ページに、
アイキャッチ画像をサムネイル表示し、記事ページの先頭に、
大きめのアイキャッチ画像を貼り付けるようにします。

トップページの新着記事一覧に、サムネイル画像を追加

~~~js:title=gatsby/app/src/pages/index.tsx
import Image from "gatsby-image"

const BlogIndex = ({ data, location }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="New 8 posts" />
      <Bio />
      <h2>新着記事</h2>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        let img
        if( node.frontmatter.avatar ){
          img = <Image fixed={node.frontmatter.avatar.childImageSharp.fixed} alt={node.frontmatter.title}/>
        }
        return (
          <article key={node.fields.slug}>
            <table>
              <tr>
                <td width="30%">
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {img}
                  </Link>
                </td>
                <td width="70%">
                  <header> ... </header>
                  <section> ... </section>
                </td>
              </tr>
            </table>
          </article>
        )
      })}
    </Layout>
  )
}

export const pageQuery = graphql`
    allMarkdownRemark(limit: 8 sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            avatar {
              childImageSharp {
                fixed(width: 295, height: 168) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
`
~~~

記事ページの先頭に、大きめのアイキャッチ画像を貼り付け

~~~js:title=gatsby/app/src/templates/blog-post.js
import Image from "gatsby-image"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;
  let img
  if( post.frontmatter.avatar ){
    img = <Image fluid={post.frontmatter.avatar.childImageSharp.fluid} alt={post.frontmatter.title}/>
  }

  return (
    <Layout location={location} title={siteTitle}>
       <SEO title={post.frontmatter.title}
            description={post.frontmatter.description || post.excerpt}/>
      <article>
        <header>
            {img}
          <h1>{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr/>
        <footer>
          <Bio />
        </footer>
      </article>

    ...

export const pageQuery = graphql`
        avatar {
          childImageSharp {
            fluid(maxWidth: 2000, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
`
~~~

