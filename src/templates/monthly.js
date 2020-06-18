import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout"
import { rhythm, scale } from "../utils/typography"
import PostListing from "../components/PostListing";

export default class MonthlyTemplate extends React.Component {
  render() {
    const location = "";
    const { displayMonth, displayYear } = this.props.pageContext;
    const postEdges = this.props.data.allMarkdownRemark.edges;
    const siteTitle = this.props.data.site.siteMetadata.title
    return (
      <Layout location={location} title={siteTitle}>
        <div className="monthly-container">
          <header>
            <h1
              style={{
                marginTop: rhythm(1),
                marginBottom: rhythm(1),
              }}
            >{displayYear}年{displayMonth}月の記事一覧</h1>
          </header>
          <PostListing postEdges={postEdges} />
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query MonthlyPage($periodStartDate: Date, $periodEndDate: Date) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { date: { gte: $periodStartDate, lt: $periodEndDate } } }
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
