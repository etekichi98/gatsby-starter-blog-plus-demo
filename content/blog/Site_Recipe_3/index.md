---
title: "サイトレシピ(3) カテゴリー機能の追加"
date: "2020-05-27T10:00:05.000"
description: ""
avatar: "./eyecatch_image.png"
category: "tech"
tags: ["linux", "gatsby", "サイトレシピ"]
---

以下を参考に実装しました。

http://hachibeedi.github.io/entry/how-to-add-category-and-tags-page/<br/>
GatsbyへCategoryとタグ機能を追加する

gatsby-node.jsに、カテゴリ一覧ページ、全記事一覧ページ、カテゴリ別記事一覧ページ
を生成するコードを追加します。


<pre>http://ホスト名:8000/categories/</pre> でカテゴリ一覧ページが、<br/>
<pre>http://ホスト名:8000/categories/all/</pre> で全記事一覧一覧ページが、<br/>
<pre>http://ホスト名:8000/categories/カテゴリ名/</pre> でカテゴリ別記事一覧ページが、<br/>
表示できるようにします。


~~~js:title=gatsby_working/gatsby/app/gatsby-node.js

const _ = require("lodash")

exports.createPages = async ({ graphql, actions }) => {

   ...

  const allPostsPage = path.resolve("src/templates/all-posts.js")
  const categoryPage = path.resolve("src/templates/category.js")
  const categoriesPage = path.resolve("src/templates/categories.js")

   ...

  const result = await graphql(
    `
      {
        posts: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                category
              }
            }
          }
        }
      }
    `
  )

   ...

  // 各記事ページ生成時に、カテゴリを抽出しcategorySetに追加していく
  const categorySet = new Set();
  const posts = result.data.posts.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    result.data.posts.edges.forEach(edge => {
      
      ...
      
      categorySet.add(frontmatter.category)
    })
  })

  // カテゴリ一覧ページを生成
  createPage({
    path: `/categories/`,
    component: categoriesPage,
    context: {
      categorySet
    }
  })
  
  // 全記事一覧ページを生成
  createPage({
    path: `/categories/all/`,
    component: allPostsPage,
  })
  
  // カテゴリ別記事一覧ページを生成
  Array.from(categorySet).forEach(category => {
    createPage({
      path: `/categories/${category}/`,
      component: categoryPage,
      context: {
        category
      }
    })
   })

}
   ...

~~~

カテゴリ一覧ページのテンプレート

全カテゴリを特定するために、クエリで全記事を取ってきているのが無駄っぽいが...


~~~js:title=gatsby_working/gatsby/app/src/templates/categories.js

   ...

export default class CategoriesTemplate extends React.Component {

  getCategoryList(categorySet){
    const category_list = Array.from(categorySet.values()).map((category) =>
      <h3><Link class="header-link" to={`/categories/${category}`}>{category}</Link></h3>
    );
    return category_list;
  }
  
  render() {
    const location = "";
    const siteTitle = this.props.data.site.siteMetadata.title;
    const posts = this.props.data.allMarkdownRemark.edges
    
    const categorySet = new Set();
    posts.forEach((post, index) => {
      this.props.data.allMarkdownRemark.edges.forEach(edge => {
        const {frontmatter} = edge.node
        categorySet.add(frontmatter.category)
      })
    })
    const category_list = this.getCategoryList(categorySet);
    
    return (
      <Layout location={location} title={siteTitle}>
        <div className="category-container">
          <header>
            <h1>カテゴリー一覧</h1>
          </header>
         <div>{category_list}</div>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query CategoriesPage {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1000
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 160)
          fields {
            slug
          }
          frontmatter {
            title
            category
            date(formatString: "MMMM DD, YYYY")
            description
          }
        }
      }
    }
  }
`;

~~~


カテゴリ別記事一覧ページのテンプレート

`allMarkdownRemark(filter: { frontmatter: { category: { eq: $category })`により
指定したカテゴリの記事だけ取得している。


~~~js:title=gatsby_working/gatsby/app/src/templates/category.js

   ...

export default class CategoryTemplate extends React.Component {
  render() {
    const location = "";
    const { category } = this.props.pageContext;
    const postEdges = this.props.data.allMarkdownRemark.edges;
    const siteTitle = this.props.data.site.siteMetadata.title
    return (
      <Layout location={location} title={siteTitle}>
        <div className="category-container">
          <header>
            <h1>{category}に関する記事一覧</h1>
          </header>
          <PostListing postEdges={postEdges} />
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
    
      ...
    
    }
  }
`;

~~~

全記事一覧ページのテンプレート

~~~js:title=gatsby_working/gatsby/app/src/templates/all-posts.js

   ...

export default class AllPostsTemplate extends React.Component {
  render() {
    const location = "";
    const postEdges = this.props.data.allMarkdownRemark.edges;
    const siteTitle = this.props.data.site.siteMetadata.title
    return (
      <Layout location={location} title={siteTitle}>
        <div className="category-container">
          <header>
            <h1>全記事</h1>
          </header>
          <PostListing postEdges={postEdges} />
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query AllPostsPage {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1000
    ) {
    
      ...
    
    }
  }
`;

~~~


