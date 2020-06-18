import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout"
import { rhythm, scale } from "../utils/typography"
import PostListing from "../components/PostListing";

export default class AllPostsTemplate extends React.Component {
  render() {
    const location = "";
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
            >全記事</h1>
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
