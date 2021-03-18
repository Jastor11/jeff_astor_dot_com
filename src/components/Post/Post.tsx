import React from "react"
import { PostComments, PostActions, PostContent, PostTags, NextPrevPosts, SEO } from "src/components"
import { useTransform, useViewportScroll, useSpring, MotionValue } from "framer-motion"
import styled from "styled-components"
import media from "src/utils/media"
import { Slug } from "src/types/common"
import { PostNode } from "src/types/post"

const PostContainer = styled.div<{ $isDark?: boolean }>`
  line-height: 2.4rem;
  width: 100%;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  position: relative;

  ${(props) => `
    background-color: ${props.$isDark ? "var(--color-dark)" : "var(--color-white)"};

    & li {
      color: ${props.$isDark ? "var(--color-white)" : "var(--color-dark)"};
    }
    & h2 {
      color: ${props.$isDark ? "var(--color-white)" : "var(--color-dark)"};
      text-transform: lowercase;
    }
    & h3 {
      color: ${props.$isDark ? "var(--color-white)" : "var(--color-dark)"};
      text-transform: lowercase;
    }
    & h4 {
      color: ${props.$isDark ? "var(--color-white)" : "var(--color-dark)"};
      text-transform: lowercase;
    }
    & h5 {
      color: ${props.$isDark ? "var(--color-white)" : "var(--color-dark)"};
      text-transform: lowercase;
    }
    & h6 {
      color: ${props.$isDark ? "var(--color-white)" : "var(--color-dark)"};
      text-transform: lowercase;
    }  
  `}
  ol, ul {
    padding-left: 35px;
  }
  & strong {
    font-weight: 700;
  }
  & figure {
    text-align: center;
    margin: var(--space-md) auto;
  }
  & iframe {
    margin: var(--space-md) 0;
  }
  & .gatsby-code-title {
    transform: translateY(3rem);
    font-family: "IBM Plex Mono", Consolas, Monaco, "Courier New", Courier, monospace;
    max-width: var(--code-max-width);
    margin: -1rem auto;
    z-index: 0;
    display: flex;
  }
  & .gatsby-code-title > span {
    background-color: var(--color-highlight);
    color: white;
    display: inline-block;
    height: 100%;
    padding: 0.5rem 1rem;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    transform: translateY(0.3rem);
  }
  p > code,
  li > code {
    display: inline-block;
    padding: 0.1rem 0.1rem 0.2rem 0.1rem;
    border-radius: 0.3em;
    clip-path: polygon(0 0, 100% 0%, 100% calc(100% - 0.2rem), 0% 100%);
    word-break: break-all !important;
    white-space: pre-wrap;
    background-color: #494b5a;
    font-weight: 400;
    color: black;
    background: #eee;
    font-family: "Dank Mono", "IBM Plex Mono", Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  }
`

const CommentsContainer = styled.div`
  padding: 1rem 10px 2rem;
  margin-bottom: 6rem;

  ${media.small`
    padding: 1rem 3em 2rem;
  `}
  ${media.tablet`
    padding: 1rem 10rem 2rem;
  `}
  ${media.large`
    padding: 1rem 16rem 2rem;    
  `}
`

const PostMeta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const getMaxHeight = () => {
  if (typeof window === "undefined") return 1000
  const body = document.body
  const html = document.documentElement

  const docHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  )
  const windowHeight = window.innerHeight
  const baseHeight = docHeight - windowHeight
  return baseHeight
}

interface IPost {
  isDeprecated?: boolean
  deprecatedSlug?: Slug
  newSlug?: Slug
  postNode: PostNode
  prevNode?: PostNode
  nextNode?: PostNode
  hideDescription?: boolean
  dark?: boolean
}
const Post: React.FC<IPost> = ({
  isDeprecated,
  deprecatedSlug,
  newSlug,
  postNode,
  prevNode,
  nextNode,
  hideDescription = false,
  dark = false,
}) => {
  const [maxHeight, setMaxHeight] = React.useState(getMaxHeight())
  const { scrollY } = useViewportScroll()
  const yRange = useTransform(scrollY, [0, maxHeight], [0, 1])
  const pathLength = useSpring(yRange, { stiffness: 400, damping: 90 })

  React.useEffect(() => {
    setMaxHeight(getMaxHeight())
  }, [postNode])

  const { title, description, date, category, tags, dateModified } = postNode.frontmatter
  const prevPost = prevNode && prevNode.frontmatter
  const nextPost = nextNode && nextNode.frontmatter

  return (
    <>
      <SEO postNode={postNode} postPath={postNode.fields.slug} postSEO />
      <PostContainer $isDark={dark}>
        <PostContent
          slug={postNode.fields.slug}
          isDeprecated={isDeprecated}
          deprecatedSlug={deprecatedSlug}
          newSlug={newSlug}
          body={postNode.body}
          title={title}
          category={category}
          subtitle={hideDescription ? undefined : description}
          date={date}
          dateModified={dateModified}
        />

        <PostMeta>
          {tags && <PostTags tags={tags} />}
          {(prevPost || nextPost) && <NextPrevPosts prevPost={prevPost} nextPost={nextPost} />}
        </PostMeta>

        <CommentsContainer>
          <PostComments />
        </CommentsContainer>

        <PostActions pathLength={pathLength as MotionValue} postNode={postNode} />
      </PostContainer>
    </>
  )
}

export default Post
