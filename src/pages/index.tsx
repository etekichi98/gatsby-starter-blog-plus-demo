// Gatsby supports TypeScript natively!
import React from "react"
import { PageProps, Link, graphql } from "gatsby"
import Image from "gatsby-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../components/postlisting.css";
import { rhythm } from "../utils/typography"

type Data = {
  site: {
    siteMetadata: {
      title: string
      description: string
    }
  }
  allMarkdownRemark: {
    edges: {
      node: {
        excerpt: string
        frontmatter: {
          title: string
          date: string
          description: string
        }
        fields: {
          slug: string
        }
      }
    }[]
  }
}

const BlogIndex = ({ data, location }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description
  const posts = data.allMarkdownRemark.edges
  const eyecatch = data.site.siteMetadata.eyecatch

  return (
    <Layout location={location} title={siteTitle} avatar={eyecatch}>
      <SEO title="New 8 posts" />
      <Bio />
      <p>{siteDescription}</p>
      <h2>新着記事</h2>
      
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        
        if( node.frontmatter.avatar ){
          return (
            <article key={node.fields.slug}>
              <div class="media">
                <span class="media__image">
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    <Image fixed={node.frontmatter.avatar.childImageSharp.fixed} alt={node.frontmatter.title}/>
                  </Link>
                </span>
                <span class="media__summary">
                  <p class="media__title">
                    <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                      {title}
                    </Link>
                  </p>
                  <p class="media__date">{node.frontmatter.date}</p>
                </span>
              </div>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </article>
          )
        }
        else{
          return(
            <article key={node.fields.slug}>
              <div class="media">
                <span class="media__summary_100">
                  <p class="media__title">
                    <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                      {title}
                    </Link>
                  </p>
                  <p class="media__date">{node.frontmatter.date}</p>
                </span>
              </div>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </article>
          )
        }
        
        
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        eyecatch
        description
      }
    }
    allMarkdownRemark(limit: 5 sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
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
`
