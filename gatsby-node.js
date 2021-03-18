const path = require("path")
const d3TimeParse = require("d3-time-format").timeParse

const kebabCase = (str) => {
  const result = str.replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, (match) => "-" + match.toLowerCase())
  return str[0] === str[0].toUpperCase() ? result.substring(1) : result
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  let slug
  if (node.internal.type === `Mdx`) {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)

    if (node?.frontmatter?.slug) {
      slug = `/${kebabCase(node.frontmatter.slug)}`
    } else {
      slug = `/${parsedFilePath.dir}`
    }
    if (node?.frontmatter?.deprecated) {
      slug += `-deprecated`
    }
    if (node?.frontmatter?.date) {
      let date
      try {
        date = d3TimeParse("%Y-%d-%m")(node.frontmatter.date).toISOString()
      } catch (err) {
        date = node.frontmatter.date
      }

      if (!date) date = node.frontmatter.date

      createNodeField({
        node,
        name: "date",
        value: date,
      })
    }

    createNodeField({ node, name: "slug", value: slug })
  }
}


exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const postPage = path.resolve("src/templates/post.tsx")
    const tagPage = path.resolve("src/templates/tag.tsx")
    const categoryPage = path.resolve("src/templates/category.tsx")

    resolve(
      graphql(
        `
          {
            deprecatedPosts: allMdx(
              sort: { fields: fields___date, order: DESC }
              filter: { frontmatter: { published: { eq: "true" }, deprecated: { eq: "true" } } }
            ) {
              totalCount
              edges {
                node {
                  frontmatter {
                    tags
                    category
                    published
                    title
                    slug
                    date
                    deprecated
                  }
                  fields {
                    slug
                  }
                }
              }
            }
            activePosts: allMdx(
              sort: { fields: fields___date, order: DESC }
              filter: { frontmatter: { published: { eq: "true" }, deprecated: { ne: "true" } } }
            ) {
              totalCount
              edges {
                node {
                  frontmatter {
                    tags
                    category
                    published
                    title
                    slug
                    date
                    deprecated
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          /* eslint no-console: "off" */
          console.log(result.errors)
          reject(result.errors)
        }
        const tagSet = new Set()
        const categorySet = new Set()
        const postNodeMapping = new Map()

        const { deprecatedPosts, activePosts } = result.data

        // first handle setting all deprecated nodes in our mapping
        deprecatedPosts.edges.forEach(({ node }) => {
          postNodeMapping.set(node.fields.slug, {
            path: `/blog${node.fields.slug}`,
            component: postPage,
            context: {
              slug: node.fields.slug,
            },
          })
        })

        // then handle setting all active nodes
        activePosts.edges.forEach(({ node }, idx) => {
          // add post tags
          if (node.frontmatter.tags) {
            node.frontmatter.tags.forEach((tag) => {
              tagSet.add(tag)
            })
          }
          // add the post's category
          if (node.frontmatter.category) {
            categorySet.add(node.frontmatter.category)
          }
          // find the deprecatedNode
          const deprecatedNodePageProps = postNodeMapping.get(node.fields.slug + "-deprecated")
          // compose the page properties using the deprecated node if needed
          const pageProperties = {
            path: `/blog${node.fields.slug}`,
            component: postPage,
            context: {
              slug: node.fields.slug,
              isDeprecated: false,
              deprecatedSlug: deprecatedNodePageProps ? deprecatedNodePageProps.context.slug : null,
              newSlug: node.fields.slug,
              prevNode: idx === 0 ? null : activePosts.edges[idx - 1].node,
              nextNode: idx === activePosts.edges.length - 1 ? null : activePosts.edges[idx + 1].node,
            },
          }
          // set page properties in our nodes mapping
          postNodeMapping.set(node.fields.slug, pageProperties)
          // create the page
          createPage(pageProperties)
        })

        // now go over all deprecated posts again and use the current version to
        // compose their page properties
        deprecatedPosts.edges.forEach(({ node }) => {
          // find the current post
          const newPostPageProps = postNodeMapping.get(node.fields.slug.split("-deprecated")[0])
          // create the page
          createPage({
            ...postNodeMapping.get(node.fields.slug),
            context: {
              slug: node.fields.slug,
              prevNode: newPostPageProps.context.prevNode,
              nextNode: newPostPageProps.context.nextNode,
              isDeprecated: true,
              deprecatedSlug: node.fields.slug,
              newSlug: newPostPageProps.context.slug,
            },
          })
        })

        const tagList = Array.from(tagSet)
        tagList.forEach((tag) => {
          createPage({
            path: `/tags/${kebabCase(tag)}/`,
            component: tagPage,
            context: {
              tag,
            },
          })
        })

        const categoryList = Array.from(categorySet)
        categoryList.forEach((category) => {
          createPage({
            path: `/categories/${kebabCase(category)}/`,
            component: categoryPage,
            context: {
              category,
            },
          })
        })
      })
    )
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        config: path.resolve(__dirname, "config"),
        src: path.resolve(__dirname, "src"),
      },
    },
  })
}
