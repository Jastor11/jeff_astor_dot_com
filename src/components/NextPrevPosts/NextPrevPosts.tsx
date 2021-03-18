import React from "react"
import { Link } from "gatsby"
import { BlogCategorySVG } from "src/components"
import { renderDate } from "src/utils/dates"
import styled from "styled-components"
import media from "src/utils/media"
import { FormattedPost } from "src/types/post"

const OtherPostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`
const OtherPostsTitle = styled.h3`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;

  & a:hover span {
    margin: 5px;
  }

  & a span {
    transition: all 0.2s ease;
  }

  ${media.mobileOnly`
    padding: 0 10px 0;  
    font-size: 16px;
  `}
  ${media.small`
    padding: 0 3em 0;
  `}
  ${media.tablet`
    padding: 0 6em 0;
  `}
  ${media.large`
    padding: 0 14em 0 12em;    
  `}
`
const OtherPostsLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${media.stupidSmall`
    flex-direction: column;
    align-items: center;
    text-align: center;
  `}
  ${media.mobileOnly`
    padding: 0 10px 0;  
  `}
  ${media.small`
   padding: 0 3em 0;
  `}
  ${media.tablet`
    padding: 0 10em 0;
  `}
  ${media.large`
    padding: 0 16em 0;    
  `}
`

const StyledOtherPostLink = styled(Link)`
  display: flex;
  flex-direction: column;

  ${media.stupidSmall`
    align-items: center;
    text-align: center;
  `}

  &:last-of-type {
    text-align: right;
  }
`

const OtherPostLinkContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`

const OtherPostDate = styled.p`
  font-size: 0.8em;
  font-weight: bold;
  justify-self: flex-end;
`

const OtherPostLinkWrapper = styled.div<{ $rightSpace?: boolean }>`
  margin-right: ${(props) => (props.$rightSpace ? "60px" : 0)};

  ${media.stupidSmall`
    margin-right: 0;
  `}
`

interface IOtherPostLink {
  post: FormattedPost
  rightSpace?: boolean
}
const OtherPostLink: React.FC<IOtherPostLink> = ({ post, rightSpace }) => {
  const svgStyle = {
    minHeight: "200px",
  }
  return (
    <OtherPostLinkWrapper $rightSpace={rightSpace}>
      <StyledOtherPostLink to={`/blog/${post.slug}`}>
        <BlogCategorySVG category={post.category} style={svgStyle} />
        <OtherPostLinkContent>
          <p>{post.title}</p>
          <OtherPostDate>{renderDate(post.date)}</OtherPostDate>
        </OtherPostLinkContent>
      </StyledOtherPostLink>
    </OtherPostLinkWrapper>
  )
}

interface IOtherPosts {
  prevPost?: FormattedPost
  nextPost?: FormattedPost
}
const OtherPosts: React.FC<IOtherPosts> = ({ prevPost, nextPost }) => (
  <OtherPostsContainer>
    <OtherPostsTitle>
      {nextPost && (
        <Link to={`/blog/${nextPost.slug.toLowerCase()}`}>
          <span>←</span> Previous Post
        </Link>
      )}
      {prevPost && (
        <Link to={`/blog/${prevPost.slug.toLowerCase()}`}>
          Next Post <span>→</span>
        </Link>
      )}
    </OtherPostsTitle>
    <OtherPostsLinks>
      {nextPost && <OtherPostLink post={nextPost} rightSpace />}
      {prevPost && <OtherPostLink post={prevPost} />}
    </OtherPostsLinks>
  </OtherPostsContainer>
)

export default OtherPosts
