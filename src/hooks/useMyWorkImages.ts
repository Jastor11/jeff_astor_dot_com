import { useStaticQuery, graphql } from "gatsby"
import { IGatsbyImageData } from "gatsby-plugin-image"

interface GatsbyImageData {
  name: string
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData
  }
}

interface QueryResult {
  betterlesson: GatsbyImageData
  upperline: GatsbyImageData
  techdev: GatsbyImageData
}

export default function useMyWorkImages(): QueryResult {
  const data = useStaticQuery(graphql`
    query MyWorkImagsQuery {
      betterlesson: file(relativePath: { eq: "better-lesson-blended-learning-project.png" }) {
        name
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
        }
      }
      upperline: file(relativePath: { eq: "teachers-upperline-code-platform.png" }) {
        name
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
        }
      }
      techdev: file(relativePath: { eq: "google-tech-dev-guide-machine-learning.png" }) {
        name
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
        }
      }
    }
  `)

  return data
}
