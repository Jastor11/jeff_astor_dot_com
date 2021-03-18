import React from "react"
import Helmet from "react-helmet"
import { graphql, PageProps } from "gatsby"
import Layout from "src/layout"
import { Post, Navbar } from "src/components"
import config from "config/SiteConfig"
import styled from "styled-components"

import { CommonTypes, PostTypes } from "src/types"

const PostNavContainer = styled.div`
  background: var(--color-dark);
  height: 100px;
  width: 100vw;
`
interface QueryResult {
  mdx: PostTypes.PostNode
}
interface PostPageContext {
  slug: CommonTypes.Slug
  nextNode?: PostTypes.PostNode
  prevNode?: PostTypes.PostNode
  isDeprecated?: boolean
  deprecatedSlug?: CommonTypes.Slug
  newSlug?: CommonTypes.Slug
}

const PostTemplate: React.FC<PageProps<QueryResult, PostPageContext>> = ({ pageContext, data }) => {
  const { nextNode, prevNode, isDeprecated, deprecatedSlug, newSlug } = pageContext
  const postNode = data.mdx
  const post = postNode.frontmatter

  return (
    <Layout>
      <Helmet>
        <title>{`${post.title} | ${config.siteTitle}`}</title>
      </Helmet>
      <PostNavContainer>
        <Navbar dark />
      </PostNavContainer>
      <Post
        // other
        // deprecated={deprecated}
        isDeprecated={isDeprecated}
        deprecatedSlug={deprecatedSlug}
        newSlug={newSlug}
        postNode={postNode}
        nextNode={nextNode}
        prevNode={prevNode}
      />
    </Layout>
  )
}

export default PostTemplate

/* eslint no-undef: "off" */
export const singlePostQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      # html
      body
      timeToRead
      excerpt
      frontmatter {
        title
        date
        dateModified
        category
        tags
        deprecated
      }
      fields {
        slug
        date
      }
    }
  }
`
