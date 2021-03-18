import React from "react"
import { ascending as d3Ascending } from "d3-array"
import { PostSeriesList } from "src/components"
import { useFastAPISeries } from "src/hooks"
import { PostTypes } from "src/types"

interface IFastAPISeriesList {
  upTo?: number
  className?: string
}
const FastAPISeriesList: React.FC<IFastAPISeriesList> = ({ upTo, className = "" }) => {
  const data = useFastAPISeries()

  const edges = data?.allMdx?.edges

  const series: PostTypes.FormattedSeriesPost[] = React.useMemo(
    () =>
      data.allMdx.edges
        .map(({ node }) => ({
          path: node.fields.slug,
          date: node.fields.date,
          title: node.frontmatter.title,
          series: node.frontmatter.series,
          excerpt: node.excerpt,
          tableOfContents: node.tableOfContents,
          timeToRead: node.timeToRead,
          wordCount: node.wordCount,
        }))
        .sort((a, b) => d3Ascending(new Date(a.date), new Date(b.date)))
        .slice(0, upTo ? upTo : data.allMdx.edges.length + 1),
    [edges]
  )

  return (
    <>
      <PostSeriesList series={series} className={className} title="Up And Running With FastAPI" />
    </>
  )
}

// function FastAPISeriesList({ upTo, ...props }) {
//   return (
//     <StaticQuery
//       query={graphql`
//         query FastAPISeries {
//           allMdx(
//             filter: {
//               frontmatter: {
//                 published: { eq: "true" }
//                 series: { eq: "up-and-running-with-fastapi" }
//                 deprecated: { ne: "true" }
//               }
//             }
//           ) {
//             edges {
//               node {
//                 excerpt
//                 fields {
//                   slug
//                   date
//                 }
//                 frontmatter {
//                   title
//                   series
//                 }
//                 tableOfContents(maxDepth: 10)
//                 timeToRead
//                 wordCount {
//                   sentences
//                   paragraphs
//                   words
//                 }
//               }
//             }
//           }
//         }
//       `}
//       render={(data) => <PureFastAPISeriesList data={data} upTo={upTo} {...props} />}
//     />
//   )
// }

// function FastAPISeriesList({ upTo, ...props }) {
//   return (
//     <StaticQuery
//       query={graphql`
//         query FastAPISeries {
//           allMdx(
//             sort: { fields: frontmatter___date, order: ASC }
//             filter: {
//               frontmatter: {
//                 published: { eq: "true" }
//                 series: { eq: "up-and-running-with-fastapi" }
//                 deprecated: { ne: "true" }
//               }
//             }
//           ) {
//             edges {
//               node {
//                 excerpt
//                 fields {
//                   slug
//                   date
//                 }
//                 frontmatter {
//                   title
//                   series
//                 }
//                 tableOfContents(maxDepth: 10)
//                 timeToRead
//                 wordCount {
//                   sentences
//                   paragraphs
//                   words
//                 }
//               }
//             }
//           }
//         }
//       `}
//       render={(data) => <PureFastAPISeriesList data={data} upTo={upTo} {...props} />}
//     />
//   )
// }

export default FastAPISeriesList
