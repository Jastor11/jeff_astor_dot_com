import React from "react"
import { Link } from "gatsby"
import media from "src/utils/media"
import { formatTagLink } from "src/utils/format"
import styled from "styled-components"

import { CommonTypes } from "src/types"

const PostTagsContainer = styled.div`
  ${media.mobileOnly`
    padding: 1em 10px 2em;  
  `}
  ${media.small`
    padding: 1em 3em 2em;
  `}
  ${media.tablet`
    padding: 1em 10em 2em;
  `}
  ${media.large`
    padding: 1em 16em 2em;
  `}
`

const PostTagsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding-left: 0px !important;
`

const PostTagItem = styled.li`
  background: var(--color-highlight);
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 5px;
  margin-right: 5px;
  margin-top: 5px;
  cursor: pointer;
  clip-path: polygon(0 0, 100% 0%, 100% 80%, 0% 100%);

  & a {
    color: white;
  }
`

const StyledH3 = styled.h3`
  font-weight: 600;
`

interface IPostTags {
  tags: CommonTypes.Tag[]
}
const PostTags: React.FC<IPostTags> = ({ tags }) => (
  <PostTagsContainer>
    <StyledH3>Tags:</StyledH3>
    <PostTagsList>
      {tags.map((tag) => (
        <PostTagItem key={tag}>
          <Link to={`/tags/${formatTagLink(tag)}`}>{tag}</Link>
        </PostTagItem>
      ))}
    </PostTagsList>
  </PostTagsContainer>
)

export default PostTags
