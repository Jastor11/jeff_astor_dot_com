import { useStaticQuery, graphql } from "gatsby"
import { PostTypes } from "src/types"

export interface QueryResult {
  allMdx: PostTypes.PostSeries
}

export default function useFastAPISeries(): QueryResult {
  const data = useStaticQuery(graphql`
    query FastAPISeries {
      allMdx(
        filter: {
          frontmatter: {
            published: { eq: "true" }
            series: { eq: "up-and-running-with-fastapi" }
            deprecated: { ne: "true" }
          }
        }
      ) {
        edges {
          node {
            excerpt
            fields {
              slug
              date
            }
            frontmatter {
              title
              series
            }
            tableOfContents(maxDepth: 10)
            timeToRead
            wordCount {
              sentences
              paragraphs
              words
            }
          }
        }
      }
    }
  `)

  return data
}
