import React from "react";
import { graphql } from "gatsby";
import { Link } from "gatsby"

import Layout from "../components/layout"
import { rhythm, scale } from "../utils/typography"
import "../components/layout.css";

export default class CategoriesTemplate extends React.Component {

  getMonthlyList(monthlySet){
    const monthly_list = Array.from(monthlySet.values()).map((monthly) =>
      <h3><Link class="header-link" to={`/archives/${monthly}`}>{monthly}</Link></h3>
    );
    return monthly_list;
  }
  
  render() {
    const location = "";
    const siteTitle = this.props.data.site.siteMetadata.title;
    const posts = this.props.data.allMarkdownRemark.edges
    
    const monthlySet = new Set();
    posts.forEach((post, index) => {
      this.props.data.allMarkdownRemark.edges.forEach(edge => {
        const {frontmatter} = edge.node
        monthlySet.add(`${frontmatter.year}/${frontmatter.month}`)
      })
    })
    const monthly_list = this.getMonthlyList(monthlySet);
    
    return (
      <Layout location={location} title={siteTitle}>
        <div className="category-container">
          <header>
            <h1
              style={{
                marginTop: rhythm(1),
                marginBottom: rhythm(1),
              }}
            >月別記事一覧</h1>
          </header>
           
         <div>{monthly_list}</div>
           
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query ArchivesPage {
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
                year: date(formatString: "YYYY")
                month: date(formatString: "MM")
              }
            }
          }
    }
  }
`;
