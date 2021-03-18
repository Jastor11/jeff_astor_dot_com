import React from "react"
import { Link } from "gatsby"
import { BlogCategorySVG } from "src/components"
import { renderDate } from "src/utils/dates"
import media from "src/utils/media"
import styled from "styled-components"
import { PostNode } from "src/types/post"

const PostPreviewContainer = styled(Link)`
  display: flex;
  border-radius: 8px;
  background: white;
  font-size: 20px;
  position: relative;
  margin-bottom: 1em;
  width: 100%;
  background: var(--color-dark);
  /* safari doesn't auto assign a height to these so they look garbage */
  /* min-height: 230px; */
  /* max-height: 230px; */
  flex: 1 0 auto;
  max-width: 100vw;
  transition: all 0.4s ease;

  &::after {
    content: "";
    position: absolute;
    background: white;
    border-radius: 8px 0 0 8px;
    border-radius: 0.25rem;
    padding: 1em 0.4em;
    height: 230px;
    top: 0;
    left: 0;
    transition: all 0.3s ease;
    transform: translateX(0%) rotateZ(180deg);
    transform: translateX(0%);
    z-index: 0;
    width: 0;
  }

  &:hover::after {
    width: 100%;
  }

  ${media.mobileOnly`
    flex-direction: column;
    max-height: 100%;

    &:hover::after {
      width: 0%;
      padding: 0;
      opacity: 0;
    }
  `}
  ${media.small`
    flex-direction: row;
  `}
`
const PostPreviewCategory = styled.div`
  & span {
    color: var(--color-white);
    background: var(--color-dark);
    border-radius: 4px;
    display: inline-block;
    position: absolute;
    z-index: 1;
    top: 1.5em;
    left: 2em;
    padding: 0.2em 0.4em 0.6em 0.4em;
    text-transform: uppercase;
    font-size: 0.5em;
    letter-spacing: 0.1em;
    font-weight: bold;
    margin: 0.2em 0 0.6em 0;
    clip-path: polygon(0 0, 100% 0%, 100% 80%, 0% 100%);
  }
`

const PostInfo = styled.div`
  flex: 1;
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: transparent;
  transition: all 0.4s ease;
  position: relative;
  z-index: 1;
  color: var(--color-white);

  ${PostPreviewContainer}:hover & {
    & > * {
      color: var(--color-dark);
    }
  }
  ${media.mobileOnly`
    justify-content: flex-start;
    flex: 0.5;

    ${PostPreviewContainer}:hover & {
      & > * {
        color: var(--color-white);
      }
    }   
  `}
  ${media.small`
    justify-content: space-between;
    flex: 1;
  `}
`
const PostTitle = styled.h4`
  font-size: 20px;

  ${media.large`
    font-size: 25px;
  `}
`
// const PostExcerpt = styled.p`
//   font-size: 15px;
// `
const PostDate = styled.h5`
  margin-top: 0.4em;
  font-size: 12px;
`
const PostImageContainer = styled.div<{ $category?: string }>`
  border-radius: 8px;
  min-width: 300px;
  padding-top: 1em;
  background: white;
  padding: 1em 0.4em;
  transition: all 0.4s ease;
  position: relative;
  z-index: 1;
  height: 230px;
  flex: 1;
  overflow-y: hidden;

  & img {
    min-height: 200px;
  }

  ${(props) =>
    props.$category === "FastAPI"
      ? `

  `
      : `
    display: flex;
    justify-content: center; 
  `}
`

interface IPostPreview {
  postNode: PostNode
  highlightImg?: string
}
const PostPreview: React.FC<IPostPreview> = ({ postNode, highlightImg }) => {
  // const renderImage = (img: string) => {
  //   if (img) {
  //     return (
  //       <PostImageContainer>
  //         <img src={img} />
  //       </PostImageContainer>
  //     )
  //   }

  //   return (
  //     <PostImageContainer $category={post.category}>
  //       <BlogCategorySVG category={post.category} />
  //     </PostImageContainer>
  //   )
  // }

  const post = postNode.frontmatter

  return (
    <PostPreviewContainer to={`/blog${postNode.fields.slug}`}>
      {/* {renderImage(highlightImg)} */}
      <PostImageContainer $category={post.category}>
        <BlogCategorySVG category={post.category} />
      </PostImageContainer>

      <PostPreviewCategory>
        <span>{post.category}</span>
      </PostPreviewCategory>

      <PostInfo>
        <PostTitle>{post.title.toLowerCase()}</PostTitle>
        {/* <PostExcerpt>{post.excerpt}</PostExcerpt> */}
        <PostDate>{renderDate(post.date).toLowerCase()}</PostDate>
      </PostInfo>
    </PostPreviewContainer>
  )
}

export default PostPreview
