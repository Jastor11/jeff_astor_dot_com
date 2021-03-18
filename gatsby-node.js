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
            allMdx(
              sort: { fields: frontmatter___date, order: DESC }
              filter: { frontmatter: { published: { eq: "true" } } }
            ) {
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

        const allEdges = result.data.allMdx.edges

        allEdges.forEach(({ node }) => {
          postNodeMapping.set(node?.fields?.slug, node)
        })

        const deprecatedEdges = result.data.allMdx.edges.filter(({ node }) => node?.frontmatter?.deprecated)

        // grab the edges that aren't deprecated
        allEdges.forEach(({ node }, idx) => {
          // add all of the post's tags
          if (node.frontmatter.tags) {
            node.frontmatter.tags.forEach((tag) => {
              tagSet.add(tag)
            })
          }

          // add the post's category
          if (node.frontmatter.category) {
            categorySet.add(node.frontmatter.category)
          }

          // handle finding next and prev nodes
          let prevNode = null
          let nextNode = null
          let prevPos = idx - 1
          while (!prevNode) {
            if (prevPos < 0) break

            let potentialEdge = allEdges[prevPos]
            if (!deprecatedEdges.includes(potentialEdge)) {
              if (potentialEdge.node.fields.slug !== node.fields.slug) {
                prevNode = potentialEdge.node
              }
            }

            prevPos -= 1
          }
          let nextPos = idx + 1
          while (!nextNode) {
            if (nextPos > allEdges.length - 1) break

            let potentialEdge = allEdges[nextPos]
            if (!deprecatedEdges.includes(potentialEdge)) {
              if (potentialEdge.node.fields.slug !== node.fields.slug) {
                nextNode = potentialEdge.node
              }
            }

            nextPos += 1
          }

          // handle finding deprecated nodes
          const isDeprecated = node?.frontmatter?.deprecated
          const deprecatedNode = isDeprecated ? node : postNodeMapping.get(`${node.fields.slug}-deprecated`)
          const deprecatedSlug = deprecatedNode ? deprecatedNode.fields.slug : null
          const newSlugNode = isDeprecated ? postNodeMapping.get(node.fields.slug.split("-deprecated")[0]) : node
          const newSlug = newSlugNode ? newSlugNode.fields.slug : null

          createPage({
            path: `/blog${node.fields.slug}`,
            component: postPage,
            context: {
              slug: node.fields.slug,
              prevNode,
              nextNode,
              isDeprecated,
              deprecatedSlug,
              newSlug,
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
        // assets: path.resolve(__dirname, "src/assets"),
        // components: path.resolve(__dirname, "src/components"),
        config: path.resolve(__dirname, "config"),
        // hooks: path.resolve(__dirname, "src/hooks"),
        // images: path.resolve(__dirname, "src/images"),
        // layout: path.resolve(__dirname, "src/layout"),
        // models: path.resolve(__dirname, "src/models"),
        // pages: path.resolve(__dirname, "src/pages"),
        // services: path.resolve(__dirname, "src/services"),
        // utils: path.resolve(__dirname, "src/utils"),
        src: path.resolve(__dirname, "src"),
      },
    },
  })
}
