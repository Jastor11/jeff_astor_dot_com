import { useStaticQuery, graphql } from "gatsby"
import { IGatsbyImageData } from "gatsby-plugin-image"

interface GatsbyImageData {
  name: string
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData
  }
}

interface QueryResult {
  fullWidth: GatsbyImageData
}

export default function useAuthorPhoto(): QueryResult {
  const data = useStaticQuery(graphql`
    query AuthorPhotoQuery {
      fullWidth: file(relativePath: { eq: "astor_teaching.jpg" }) {
        name
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
        }
      }
    }
  `)

  return data
}
