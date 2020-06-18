import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import { rhythm, scale } from "../utils/typography";
import PostListing from "../components/PostListing";

export default class TagTemplate extends React.Component {
  render() {
    const location = "";
    const { tag } = this.props.pageContext;
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
      totalCount
      edges {
        node {
          excerpt(truncate: true)
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
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
