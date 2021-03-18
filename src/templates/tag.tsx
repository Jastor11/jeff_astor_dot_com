import React from "react"
import Helmet from "react-helmet"
import { graphql, PageProps } from "gatsby"
import Layout from "src/layout"
import { PostListing, Navbar } from "src/components"
import config from "config/SiteConfig"
import styled from "styled-components"
import media from "src/utils/media"
import { CommonTypes, PostTypes } from "src/types"

const TagTemplateContainer = styled.div`
  padding: 100px 40px;
  background: var(--color-white);
  min-height: calc(100vh - 100px);

  ${media.mobileOnly`
    padding: 100px 5px;
  `}
`
const TagTemplateTitle = styled.h1`
  font-size: 4rem;
  padding: 0 20px 20px 20px;
  border-bottom: solid 2px black;
  margin-bottom: 5px;
  text-transform: lowercase;

  ${media.mobileOnly`
    font-size: 2rem;
  `}
`

interface QueryResult {
  allMdx: {
    totalCount?: number
    edges: PostTypes.PostEdge[]
  }
}
interface TagPageContext {
  tag: CommonTypes.Tag
}

const TagTemplate: React.FC<PageProps<QueryResult, TagPageContext>> = ({ pageContext, data }) => {
  return (
    <Layout>
      <Helmet title={`Posts tagged as '${pageContext.tag}' | ${config.siteTitle}`} />
      <Navbar dark />
      <TagTemplateContainer>
        <TagTemplateTitle>Tag: {pageContext.tag}</TagTemplateTitle>
        <PostListing postEdges={data.allMdx.edges} />
      </TagTemplateContainer>
    </Layout>
  )
}

export default TagTemplate

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMdx(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
          published: { eq: "true" }
          tags: { in: [$tag] }
          deprecated: { ne: "true" }
          # also
        }
      }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            image
            date
          }
        }
      }
    }
  }
`
