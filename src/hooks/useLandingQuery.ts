import { useStaticQuery, graphql } from "gatsby"
import { PostTypes } from "src/types"

export interface LandingQueryResult {
  allMdx: {
    edges: PostTypes.PostEdge[]
  }
}

export default function useLandingQuery(): LandingQueryResult {
  const data = useStaticQuery(graphql`
    query LandingQuery {
      allMdx(
        limit: 10
        sort: { fields: frontmatter___date, order: DESC }
        filter: {
          frontmatter: { published: { eq: "true" }, category: { ne: "Course Review" }, deprecated: { ne: "true" } }
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

  return data
}
