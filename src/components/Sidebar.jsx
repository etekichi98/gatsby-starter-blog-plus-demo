import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import "./sidebar.css";

export default () => {
  const {
    recentlyAllMarkdownRemark: { edges: recentlyBlogs },
    categoriesAllMarkdownRemark: { edges: allBlogs },
  } = useStaticQuery(
    graphql`
      query {
        recentlyAllMarkdownRemark: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 5
        ) {
          edges {
            node {
              frontmatter {
                title
              }
              fields {
                slug
              }
            }
          }
        }
        categoriesAllMarkdownRemark: allMarkdownRemark (
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          totalCount
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                category
                year: date(formatString: "YYYY")
                month: date(formatString: "MM")
                description
              }
            }
          }
        }
      }
    `
  )

  // Make catgory list
  const categorySet = new Set();
  allBlogs.map((edge) =>{
    const {frontmatter} = edge.node
    categorySet.add(frontmatter.category)
  })
  const category_list = Array.from(categorySet.values()).map((category) =>
    <li class="sidebar-listitem"><Link class="sidebar-link" to={`/categories/${category}`}>{category}</Link></li>
  );

  // Make monthly archive list
  const monthlySet = new Set();
  allBlogs.map((edge) =>{
    const {frontmatter} = edge.node
    monthlySet.add(`${frontmatter.year}/${frontmatter.month}`)
  })
  const monthly_list = Array.from(monthlySet.values()).map((monthly) =>
    <li class="sidebar-listitem"><Link class="sidebar-link" to={`/archives/${monthly}/`}>{monthly}</Link></li>
  );


  return (
    <>
    
      <div>
        <h4 class="sidebar-h4">最近の記事</h4>
        <ul class="sidebar-list">
          {recentlyBlogs.map(
            ({
              node: {
                frontmatter: { title },
                fields: { slug },
              },
            }) => (
              <li class="sidebar-listitem">
                <Link class="sidebar-link" to={slug}>{title}</Link>
              </li>
            )
          )}
        </ul>
      </div>
      <hr/>

      <div>
        <h4 class="sidebar-h4">カテゴリー</h4>
        <ul class="sidebar-list">
          {category_list}
        </ul>
      </div>
      <hr/>

      <div>
        <h4 class="sidebar-h4">月別記事</h4>
        <ul class="sidebar-list">
          {monthly_list}
        </ul>
      </div>
      <hr/>
    </>
  )
}

