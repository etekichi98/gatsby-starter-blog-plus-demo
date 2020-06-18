import React from "react";
import { graphql } from "gatsby";
import { Link } from "gatsby"

import Layout from "../components/layout"
import { rhythm, scale } from "../utils/typography"
import "../components/layout.css";

export default class AllTagsTemplate extends React.Component {

  getTagsList(tagsSet){
    const tags_list = Array.from(tagsSet.values()).map((tag) =>
      <h3><Link class="header-link" to={`/tags/${tag}`}>{tag}</Link></h3>
    );
    return tags_list;
  }
  
  render() {
    const location = "";
    const siteTitle = this.props.data.site.siteMetadata.title;
    const posts = this.props.data.allMarkdownRemark.edges
    
    const tagsSet = new Set();
    posts.forEach((post, index) => {
      this.props.data.allMarkdownRemark.edges.forEach(edge => {
        const {frontmatter} = edge.node
        frontmatter.tags.forEach(tag => {
          tagsSet.add(tag)
        })
      })
    })
    const tags_list = this.getTagsList(tagsSet);
    
    return (
      <Layout location={location} title={siteTitle}>
        <div className="category-container">
          <header>
            <h1
              style={{
                marginTop: rhythm(1),
                marginBottom: rhythm(1),
              }}
            >タグ一覧</h1>
          </header>
           
         <div>{tags_list}</div>
           
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query AllTagsPage {
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
                tags
              }
            }
          }
    }
  }
`;
