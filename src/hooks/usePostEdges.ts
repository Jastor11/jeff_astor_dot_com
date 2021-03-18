import { useStaticQuery, graphql } from "gatsby"
import { PostTypes } from "src/types"

interface QueryResult {
  allMdx: {
    edges: PostTypes.PostEdge[]
  }
}

export default function usePostEdges(): QueryResult {
  const postEdges = useStaticQuery(graphql`
    query BlogQueryPosts {
      allMdx(
        limit: 100
        sort: { fields: frontmatter___date, order: DESC }
        filter: {
          frontmatter: {
            published: { eq: "true" } # only show published posts
            deprecated: { ne: "true" } # only show posts that aren't deprecated
          }
        }
      ) {
        edges {
          node {
            fields {
              slug
              date
            }
            excerpt(pruneLength: 140)
            timeToRead
            frontmatter {
              title
              tags
              date
              published
              category
            }
          }
        }
      }
    }
  `)

  return postEdges
}
