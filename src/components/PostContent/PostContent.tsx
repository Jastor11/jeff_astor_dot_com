import React from "react"
import { Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { BlogCategorySVG, CodeBlockTitle, DeprecatedNotification, PostCodeBlock, PrePlaceholder } from "src/components"
import { renderDate } from "src/utils/dates"
import { formatCategoryLink } from "src/utils/format"
import styled from "styled-components"
import media from "src/utils/media"
import { Category, Datetime, Slug } from "src/types/common"

const PostContentContainer = styled.article`
  --text-padding: 2rem;
  --max-width: 900px;
  margin-top: 3rem;

  ${media.small`
    --max-width: 550px;
  `}
  ${media.medium`
    --text-padding: 4rem;
    --max-width: 700px;
  `}    
  ${media.tablet`
    --max-width: 800px;
  `}    
  ${media.large`
    --text-padding: 10rem;
    --max-width: 900px;    
  `}
`
const PostContentTitle = styled.h1`
  line-height: 1.2em;
  margin: 1rem 0 3rem;
  text-align: center;
  padding: 0 10px;
  word-break: break-word;

  text-transform: lowercase;
  font-weight: 600;

  ${media.stupidSmall`
    font-size: 2rem;
  `}
  ${media.mobileOnly`
    font-size: 2.3rem;
  `}
  ${media.small`
    font-size: 3.5rem;
    padding: 0;
  `}
  ${media.medium`
    font-size: 4.5rem; 
    margin: 1rem var(--text-padding) 3rem;

  `}
  ${media.tablet`

  `}
  ${media.large`
   
  `}
`
const PostContentSubtitle = styled.h2``
const PostContentBody = styled.div`
  overflow-wrap: break-word;

  & a {
    color: var(--color-highlight);
    overflow-wrap: break-word;
    font-weight: 400;
  }

  & a:hover {
    font-size: bold;
    text-decoration: underline;
  }

  ${media.stupidSmall`
    & table {
      max-width: 300px !important;
      width: 290px !important;
      overflow: hidden;
    }
    & td {
      padding: 0;
      overflow: hidden;
      max-width: 20px;
    }
  `}

  ${media.mobileOnly`
    & table {
      min-width: 290px;
    }
    & td {
      padding: 0;
    }     
  `}
  ${media.small`
    & table {
      margin: 0 auto;
    }
  `}
  ${media.tablet`
    & table {
      min-width: var(--max-width);
    }  
    & td {
      padding: 1em;
    }
  `}
`
const PostContentP = styled.p<{ $dark?: boolean }>`
  margin: var(--space-lg) auto;
  max-width: var(--max-width);
  color: ${(props) => (props.$dark ? "var(--color-white)" : "var(--color-dark)")};
  padding: 0 15px;
  font-weight: 400;
`
const PostContentH2 = styled.h2`
  margin: 0 auto;
  margin-top: calc(var(--space-lg) + 10px);
  max-width: var(--max-width);
  padding: 0 15px;
  font-weight: 600;
`
const PostContentH3 = styled.h3`
  margin: 0 auto;
  margin-top: calc(var(--space-lg) + 10px);
  max-width: var(--max-width);
  padding: 0 15px;
  font-weight: 600;
`
const PostContentH4 = styled.h4`
  margin: 0 auto;
  margin-top: calc(var(--space-lg) + 10px);
  max-width: var(--max-width);
  padding: 0 15px;
  font-weight: 600;
`
const PostContentH5 = styled.h5`
  margin: 0 auto;
  margin-top: calc(var(--space-lg) + 10px);
  max-width: var(--max-width);
  padding: 0 15px;
  font-weight: 600;
`
const PostContentH6 = styled.h6`
  margin: 0 auto;
  margin-top: calc(var(--space-lg) + 10px);
  max-width: var(--max-width);
  padding: 0 15px;
  font-weight: 600;
`
const PostContentUl = styled.ul`
  padding: 0 15px;
  padding-left: 45px;
  list-style: disc;
  margin: var(--space-md) auto;
  max-width: var(--max-width);
  font-weight: 400;
`
const PostContentOl = styled.ol`
  padding: 0 15px;
  padding-left: 45px;
  list-style: decimal;
  margin: var(--space-md) auto;
  max-width: var(--max-width);
  font-weight: 400;
`
const PostContentLi = styled.li`
  font-weight: 400;
`
const PostContentStrong = styled.strong`
  font-weight: 700;
`
const PostContentBlockquote = styled.blockquote`
  background: var(--color-highlight-light);
  border-left: solid 15px var(--color-highlight);
  padding: 0.2em 1em 1em;
  border-radius: 0.3em;
  clip-path: polygon(0 0, 100% 0%, 100% calc(100% - 40px), 0% 100%);
  margin: 0 auto;
  max-width: var(--max-width);

  & p {
    color: var(--color-white);
    margin-left: 0;
    margin-right: 0;
    font-weight: 400;
  }

  & a {
    color: hsl(214, 66%, 37%);
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
`
const PostContentTable = styled.table`
  margin: 0 auto;
  max-width: 100vw;
  min-width: var(--max-width);
  background: var(--color-highlight);
  color: var(--color-white);

  & td {
    padding: 0.3em;
    border: solid 1px rgb(222, 222, 222);
    text-align: center;

    & span {
      font-weight: 700;
    }
  }
`
const PostContentVideoWrapper = styled.div`
  margin: var(--space-md) auto;
  max-width: var(--max-width);
  display: flex;
  align-items: center;
  justify-content: center;
`
const PostCategory = styled(Link)`
  & span {
    color: var(--color-white);
    background: var(--color-dark);
    border-radius: 4px;
    display: inline-block;
    padding: 0.2em 0.4em 0.6em 0.4em;
    text-transform: uppercase;
    font-size: 0.5em;
    letter-spacing: 0.1em;
    font-weight: bold;
    margin: 0.2em 0 0.6em var(--text-padding);
    clip-path: polygon(0 0, 100% 0%, 100% 80%, 0% 100%);
  }
`
const PostContentMainImage = styled.div`
  margin-bottom: 5em;
  margin: 0 var(--text-padding);
  box-shadow: var(--elevation-1);
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  background: white;

  & > img {
    border-radius: 0.25rem;
  }

  ${media.small`
    padding: 1rem;
  `}
  ${media.tablet`
    padding: 2rem;
  `}
`
const PostContentDateContainer = styled.div`
  transform: translateY(-0.5em);
  font-size: 12px;
  margin-left: var(--text-padding);
`
const PostContentDate = styled.p`
  font-weight: 600;

  & span {
    font-weight: normal;
  }
`

const PostContentVideo: React.FC = ({ children, ...props }) => (
  <PostContentVideoWrapper>
    <video {...props}>{children}</video>
  </PostContentVideoWrapper>
)

const shortcodes = {
  p: PostContentP,
  h2: PostContentH2,
  h3: PostContentH3,
  h4: PostContentH4,
  h5: PostContentH5,
  h6: PostContentH6,
  ul: PostContentUl,
  ol: PostContentOl,
  li: PostContentLi,
  strong: PostContentStrong,
  blockquote: PostContentBlockquote,
  table: PostContentTable,
  video: PostContentVideo,
  // pre: PostCodeBlock,
  pre: PrePlaceholder,
  code: PostCodeBlock,
  CodeBlockTitle,
}

interface IPostContent {
  isDeprecated?: boolean
  deprecatedSlug?: Slug
  newSlug?: Slug
  slug: Slug
  title: string
  subtitle?: string
  category: Category
  date: Datetime
  dateModified?: Datetime
  body?: any
  footer?: any
}
const PostContent: React.FC<IPostContent> = ({
  isDeprecated,
  deprecatedSlug,
  newSlug,
  // slug,
  title,
  subtitle,
  category,
  date,
  dateModified,
  body,
  footer,
}) => {
  return (
    <PostContentContainer>
      <PostCategory to={`/categories/${formatCategoryLink(category)}`}>
        <span>{category}</span>
      </PostCategory>
      <PostContentTitle>{title}</PostContentTitle>
      {subtitle && <PostContentSubtitle>{subtitle}</PostContentSubtitle>}
      <PostContentDateContainer>
        <ContentDate date={date} dateModified={dateModified} />
      </PostContentDateContainer>
      <PostContentMainImage>
        <BlogCategorySVG category={category} />
      </PostContentMainImage>
      <PostContentBody>
        {deprecatedSlug && newSlug ? (
          <DeprecatedNotification
            deprecatedSlug={deprecatedSlug}
            newSlug={newSlug}
            isDeprecated={isDeprecated}
            // somethingElse={dateModified}
          />
        ) : null}
        <MDXProvider components={shortcodes}>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
      </PostContentBody>
      {footer}
    </PostContentContainer>
  )
}

interface ContentDate {
  date: Datetime
  dateModified?: Datetime
}
const ContentDate: React.FC<ContentDate> = ({ date, dateModified }) => (
  <PostContentDate>
    <DateToTime date={date} />
    {dateModified && (
      <>
        &ensp;|&ensp;
        <span>
          UPDATED <time>{renderDate(dateModified)}</time>
        </span>
      </>
    )}
  </PostContentDate>
)

const DateToTime = ({ date }: { date: Datetime }) => <time>{renderDate(date)}</time>

export default PostContent
