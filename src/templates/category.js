import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout"
import { rhythm, scale } from "../utils/typography"
import PostListing from "../components/PostListing";

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
            <h1
              style={{
                marginTop: rhythm(1),
                marginBottom: rhythm(1),
              }}
            >{category}に関する記事一覧</h1>
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
            avatar {
              childImageSharp {
                fixed(width: 148, height: 84) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`;
