import React from "react"
// import { useStaticQuery, graphql } from "gatsby"
import { useSiteMeta } from "src/hooks"
import Helmet from "react-helmet"

import config from "config/SiteConfig"
import { PostTypes } from "src/types"

interface ISEO {
  postNode: PostTypes.PostNode
  postPath?: string
  postSEO?: boolean
}
const SEO: React.FC<ISEO> = ({ postNode, postPath, postSEO, ...props }) => {
  const data = useSiteMeta()
  // console.log(data)
  const postMeta = postNode && postNode.frontmatter
  const postURL = `${config.siteUrl}/blog${postPath}`

  const { siteMetadata } = data.site
  const authorName = siteMetadata.info.name
  const blogURL = siteMetadata.siteUrl
  const siteSubtitle = siteMetadata.subtitle
  const siteTitle = siteMetadata.title
  const siteImage = `${config.siteUrl}/${siteMetadata.info.photo}`
  const siteLogo = `${config.siteUrl}/${siteMetadata.logo}`
  const description = postMeta && (postMeta.description ? postMeta.description : postNode.excerpt)
  const postTitle = postMeta && postMeta.title
  const title = postTitle ? postTitle : siteTitle

  const schemaOrgJSONLD = [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url: blogURL,
      image: siteLogo,
      // name: title,
      name: siteTitle,
      // name: authorName,
      alternateName: siteSubtitle,
      // alternateName: config.siteTitleAlt ? config.siteTitleAlt : ''
    },
  ]
  if (postSEO) {
    schemaOrgJSONLD.push(
      {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        // @ts-ignore
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@id": postURL,
              name: title,
              image: siteImage,
            },
          },
        ],
      },
      {
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        url: blogURL,
        name: postTitle,
        alternateName: config.siteTitle,
        // alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
        // alternateName:
        headline: postTitle,
        // description: description,
        image: {
          "@type": "ImageObject",
          url: siteImage,
        },
        author: {
          "@type": "Person",
          // name: siteMetadata.info.name,
          name: authorName,
          url: blogURL,
        },
        description,
      }
    )
  }

  // console.log('schemaOrgJSONLD', schemaOrgJSONLD)
  return (
    <Helmet htmlAttributes={{ lang: "en" }}>
      {/* General tags */}
      <meta name="description" content={description} />
      <meta name="image" content={siteImage} />

      {/* Schema.org tags */}
      <script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={postSEO ? postURL : blogURL} />
      {postSEO ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={siteImage} />
      {/* <meta
        property='fb:app_id'
        content={config.siteFBAppID ? config.siteFBAppID : ''}
      /> */}

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={config.userTwitter ? config.userTwitter : ""} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={siteImage} />
    </Helmet>
  )
}

// const SEO = ({ postNode, postPath, postSEO, ...props }) => (
//   <StaticQuery
//     query={graphql`
//       query PostSEOAuthor {
//         site {
//           siteMetadata {
//             siteUrl
//             copyright
//             title
//             logo
//             subtitle
//             info {
//               name
//               photo
//               bio
//               contacts {
//                 email
//                 twitter
//                 github
//               }
//             }
//           }
//         }
//       }
//     `}
//     render={(data) => <PureSEO postNode={postNode} postPath={postPath} postSEO={postSEO} data={data} {...props} />}
//   />
// )

// class SEO extends Component {
//   render() {
//     const { postNode, postPath, postSEO } = this.props
//     let title
//     let description
//     let image = config.siteLogo
//     let postURL

//     console.log(postNode)

//     if (postSEO) {
//       const postMeta = postNode.frontmatter
//       title = postMeta.title
//       // ({ title } = postMeta)
//       description = postMeta.description
//         ? postMeta.description
//         : postNode.excerpt
//       // image = postMeta.image
//       // postURL = urljoin(config.siteUrl, config.pathPrefix, postPath)
//       postURL = `${config.siteUrl}/blog${postPath}`
//     } else {
//       title = config.siteTitle
//       description = config.siteDescription
//       // image = config.siteLogo
//     }

//     // image = urljoin(config.siteUrl, config.pathPrefix, image);
//     // image = config.siteUrl + config.pathPrefix + (!!image ? image : config.siteLogo)
//     // image =
//     // const blogURL = urljoin(config.siteUrl, config.pathPrefix)
//     const blogURL = `${config.siteUrl}/`

//     console.log("blogURL", blogURL)
//     console.log("postURL", postURL)
//     console.log("description", description)
//     console.log("title", title)
//     const schemaOrgJSONLD = [
//       {
//         '@context': 'http://schema.org',
//         '@type': 'WebSite',
//         url: blogURL,
//         name: title,
//         alternateName: config.siteTitleAlt ? config.siteTitleAlt : ''
//       },
//       // author: {
//       //   "@type": "Person",
//       //   "name": "${author.name}",
//       //   "url": "${siteUrl}"
//       // },
//     ]
//     if (postSEO) {
//       schemaOrgJSONLD.push(
//         {
//           '@context': 'http://schema.org',
//           '@type': 'BreadcrumbList',
//           itemListElement: [
//             {
//               '@type': 'ListItem',
//               position: 1,
//               item: {
//                 '@id': postURL,
//                 name: title,
//                 image
//               }
//             }
//           ]
//         },
//         {
//           '@context': 'http://schema.org',
//           '@type': 'BlogPosting',
//           url: blogURL,
//           name: title,
//           alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
//           headline: title,
//           // description: description,
//           image: {
//             '@type': 'ImageObject',
//             url: image
//           },
//           author: {
//             "@type": "Person",
//             "name": "${author.name}",
//             url: blogURL,
//           },
//           description
//         }
//       )
//     }

//     console.log('schemaOrgJSONLD', schemaOrgJSONLD)
//     return (
//       <Helmet>
//         {/* General tags */}
//         <meta name='description' content={description} />
//         <meta name='image' content={image} />

//         {/* Schema.org tags */}
//         <script type='application/ld+json'>
//           {JSON.stringify(schemaOrgJSONLD)}
//         </script>

//         {/* OpenGraph tags */}
//         <meta property='og:url' content={postSEO ? postURL : blogURL} />
//         {postSEO ? <meta property='og:type' content='article' /> : null}
//         <meta property='og:title' content={title} />
//         <meta property='og:description' content={description} />
//         <meta property='og:image' content={image} />
//         {/* <meta
//           property='fb:app_id'
//           content={config.siteFBAppID ? config.siteFBAppID : ''}
//         /> */}

//         {/* Twitter Card tags */}
//         <meta name='twitter:card' content='summary_large_image' />
//         <meta
//           name='twitter:creator'
//           content={config.userTwitter ? config.userTwitter : ''}
//         />
//         <meta name='twitter:title' content={title} />
//         <meta name='twitter:description' content={description} />
//         <meta name='twitter:image' content={image} />
//       </Helmet>
//     )
//   }
// }

export default SEO
