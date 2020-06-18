import React from "react";
import { graphql } from "gatsby";
import { Link } from "gatsby"

import Layout from "../components/layout"
import { rhythm, scale } from "../utils/typography"
import "../components/layout.css";

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
            <h1
              style={{
                marginTop: rhythm(1),
                marginBottom: rhythm(1),
              }}
            >カテゴリー一覧</h1>
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
