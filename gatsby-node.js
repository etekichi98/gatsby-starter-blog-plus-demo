const path = require(`path`)
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const allPostsPage = path.resolve("src/templates/all-posts.js")
  const categoryPage = path.resolve("src/templates/category.js")
  const categoriesPage = path.resolve("src/templates/categories.js")
  const archivesPage = path.resolve("src/templates/archives.js")
  const monthlyPage = path.resolve("src/templates/monthly.js")
  const tagsPage = path.resolve(`./src/templates/all-tags.js`)
  const tagPage = path.resolve(`./src/templates/tags.js`)
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
                year: date(formatString: "YYYY")
                month: date(formatString: "MM")
               }
            }
          }
        }
        tags: allMarkdownRemark(limit: 1000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const categorySet = new Set();
  const monthlySet = new Set();
  const posts = result.data.posts.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    result.data.posts.edges.forEach(edge => {
      const {frontmatter} = edge.node
      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
      categorySet.add(frontmatter.category)
      monthlySet.add(`${frontmatter.year}/${frontmatter.month}`)
    })
  })

  // create category list page
  createPage({
    path: `/categories/`,
    component: categoriesPage,
    context: {
      categorySet
    }
  })
  
  // create all posts page
  createPage({
    path: `/categories/all/`,
    component: allPostsPage,
  })
  
  // create category pages
  Array.from(categorySet).forEach(category => {
    createPage({
      path: `/categories/${category}/`,
      component: categoryPage,
      context: {
        category
      }
    })
   })

  // create tag list page
  createPage({
    path: `/tags/`,
    component: tagsPage,
  })

  // create tag pages
    const tags = result.data.tags.group
    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
        component: tagPage,
        context: {
          tag: tag.fieldValue,
        },
      })
    })

  // create archives list page
  createPage({
    path: `/archives/`,
    component: archivesPage,
    context: {
      monthlySet
    }
  })
  
  // create monthly archives pages
  Array.from(monthlySet).forEach(monthly => {
    const [year, month] = monthly.split('/')
    const startDate = `${year}-${month}-01T00:00:00.000Z`;
    const newStartDate = new Date(startDate);
    const endDate = new Date(
        new Date(newStartDate.setMonth(newStartDate.getMonth() + 1)).getTime() - 1
    ).toISOString();
    createPage({
      path: `/archives/${monthly}/`,
      component: monthlyPage,
      context: {
        displayYear: year,
        displayMonth: month,
        periodStartDate: startDate,
        periodEndDate: endDate
      }
    })
  })
  
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
