---
title: "サイトレシピ(4) タグ機能の追加"
date: "2020-05-27T10:00:04.000"
description: ""
avatar: "./eyecatch_image.png"
category: "tech"
tags: ["linux", "gatsby", "サイトレシピ"]
---

以下を参考に実装しました。

https://kikunantoka.com/2019/12/01--install-tags/<br/>
GatsbyJSで作っているブログにタグ機能を導入した

gatsby-node.jsに、タグ別記事一覧ページを生成するコードを追加します。


<pre>http://ホスト名:8000/tags/タグ名/</pre> でタグ別記事一覧ページが、<br/>
表示できるようにします。


~~~js:title=gatsby_working/gatsby/app/gatsby-node.js

      ...

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const tagPage = path.resolve(`./src/templates/tags.js`)
  const result = await graphql(
    `
      {
        posts: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {

         ...

        }
        tags: allMarkdownRemark(limit: 1000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `
  )
      ...

  // create tag pages
    const tags = result.data.tags.group
    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
        component: tagPage,
        context: {
          tag: tag.fieldValue,
        },
      })
    })

}

      ...

~~~
タグ別記事一覧ページのテンプレート

`allMarkdownRemark(filter: { frontmatter: { tags: { in: [$tag] } } })`により
指定したタグの記事だけ取得している。


~~~js:title=gatsby_working/gatsby/app/src/templates/tags.js

      ...

export default class TagTemplate extends React.Component {
  render() {

      ...

    return (
      <Layout location={location} title={siteTitle}>
        <div className="category-container">
          <header>
            <h1
              style={{
                marginTop: rhythm(1),
                marginBottom: rhythm(1),
              }}
            >{tag}に関する記事一覧</h1>
          </header>
          <PostListing postEdges={postEdges} />
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {

      ...

    }
  }
`;

~~~

各記事ページ生成テンプレートでtagを取得するクエリーを追加します。

~~~js:title=gatsby_working/gatsby/app/src/templates/blog-post.js
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {

      ...

    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags

      ...


~~~

以下のコードを各記事ページに挿入し、タグのリンクを貼ります。


~~~js:title=gatsby_working/gatsby/app/src/templates/blog-post.js
          {post.frontmatter.tags.map(tag => {
            return <span>
              <Link to={`/tags/${_.kebabCase(tag)}/`}>
                <span class="taglink">
                  {tag}
                </span>
              </Link>
            &emsp;</span>
          })}

~~~


