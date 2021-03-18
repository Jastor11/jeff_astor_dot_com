import { useStaticQuery, graphql } from "gatsby"
import { CommonTypes } from "src/types"

export default function useSiteMeta(): CommonTypes.SiteMeta {
  const siteMeta = useStaticQuery(graphql`
    query SiteMetaQuery {
      site {
        siteMetadata {
          siteUrl
          copyright
          title
          subtitle
          info {
            name
            photo
            bio
            contacts {
              email
              twitter
              github
            }
          }
        }
      }
    }
  `)

  return siteMeta
}
