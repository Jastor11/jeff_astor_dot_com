import React from "react"
import Helmet from "react-helmet"
import { graphql, PageProps } from "gatsby"
import Layout from "src/layout"
import { PostListing, Navbar } from "src/components"

import config from "config/SiteConfig"
import styled from "styled-components"
import media from "src/utils/media"

import { CommonTypes, PostTypes } from "src/types"

const CategoryContainer = styled.div`
  padding: 100px 40px;
  background: var(--color-white);
  min-height: calc(100vh - 100px);

  ${media.mobileOnly`
    padding: 100px 5px;
  `}
`
const CategoryTitle = styled.h1`
  font-size: 4em;
  padding: 0 20px 20px 20px;
  border-bottom: solid 2px black;
  margin-bottom: 5px;
  text-transform: lowercase;

  ${media.mobileOnly`
    font-size: 2em;
  `}
`

interface QueryResult {
  allMdx: {
    totalCount?: number
    edges: PostTypes.PostEdge[]
  }
}
interface CategoryPageContext {
  category: CommonTypes.Category
}

const CategoryTemplate: React.FC<PageProps<QueryResult, CategoryPageContext>> = ({ pageContext, data }) => {
  return (
    <Layout>
      <Helmet title={`Posts in category '${pageContext.category}' | ${config.siteTitle}`} />
      <Navbar dark />
      <CategoryContainer>
        <CategoryTitle>Category: {pageContext.category}</CategoryTitle>

        <PostListing postEdges={data.allMdx.edges} />
      </CategoryContainer>
    </Layout>
  )
}

export default CategoryTemplate

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMdx(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
          published: { eq: "true" }
          category: { eq: $category }
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
            category
          }
        }
      }
    }
  }
`
