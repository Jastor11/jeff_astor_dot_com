import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import media from "src/utils/media"

import { PostTypes } from "src/types"

const PostListLink = styled(Link)`
  padding: 1.5em;
  display: inline-block;
  border-radius: 0.3rem;
  font-size: 0.7em;
  clip-path: polygon(0 0, 100% 0%, 100% calc(100% - 10px), 0% 100%);

  &:hover {
    background: var(--color-highlight);
    color: var(--color-white);
  }

  ${media.small`
    font-size: inherit;
    clip-path: polygon(0 0, 100% 0%, 100% calc(100% - 40px), 0% 100%);           
  `}
`

const PostLinkTitle = styled.span`
  display: flex;
  align-items: center;
  font-weight: 700;
  padding-bottom: 5px;

  & h2 {
    font-weight: 600;
    margin-left: 20px;
    font-size: 1.2rem;
  }

  ${media.small`
    & h2 {
      font-size: var(--text-xl);
    }
  `}
`

interface IPostListingItem {
  post: {
    path: string
    title: string
  }
}
const PostListingItem: React.FC<IPostListingItem> = ({ post }) => (
  <PostListLink to={`/blog${post.path}`}>
    <PostLinkTitle>
      {` > `}
      <h2>{post.title.toLowerCase()}</h2>
    </PostLinkTitle>
  </PostListLink>
)

interface IPostListing {
  postEdges: PostTypes.PostEdge[]
}
const PostListing: React.FC<IPostListing> = ({ postEdges }) => {
  const postList = postEdges?.map((postEdge) => ({
    path: postEdge.node.fields.slug,
    title: postEdge.node.frontmatter.title,
  }))

  return (
    <>
      {postList?.map((post) => (
        <PostListingItem key={post.path} post={post} />
      ))}
    </>
  )
}

export default PostListing
