import React from "react"
import { Link } from "gatsby"
import { motion } from "framer-motion"
import media from "src/utils/media"
import styled from "styled-components"
import { ChevronRight, LinkGlyph } from "src/components"
import { PostTypes } from "src/types"
import { FormattedSeriesPost } from "src/types/post"

const PostSeriesListWrapper = styled.div`
  max-width: var(--code-max-width);
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  & > ul {
    display: flex;
    flex-direction: column;
    padding: 0 !important;
    box-shadow: var(--elevation-1);
    border-left: solid 1px #ababb7;
    border-right: solid 1px #ababb7;
    max-width: var(--code-max-width);
    width: calc(100% - 12px);
    margin: 0 0 0 2px;
  }

  & h1 {
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-dark);
    white-space: pre-line;
    transition: all 0.2s ease;
  }

  ${media.tablet`
    & h1 {
      white-space: nowrap;
    }  
    & ul {
      width: 100%;    
      margin: 0 auto;  
    }
  `}
`
const PostSeriesHeader = styled.header`
  display: flex;
  max-width: var(--max-width);
  margin: 0 auto;
  width: 100%;

  & span {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem 0.25rem 0 0;
    box-shadow: var(--elevation-1);
    border: solid 1px #ababb7;
    border-bottom-color: transparent;
    font-weight: 700;
    font-size: 1.2rem;
    font-family: var(--font-heading);
    text-transform: lowercase;
    margin-left: 2px;
    background: white;
  }
`
const PostSeriesListItem = styled.li<{ $isOpen?: boolean }>`
  display: flex;
  display: grid;
  grid-template-columns: 150px auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    "number title"
    "drawer drawer";
  overflow-y: hidden;
  align-items: center;
  background: white;
  width: 100%;

  & a {
    display: flex;
    align-items: center;
  }

  ${(props) => media.mobileOnly`
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr auto;
    grid-template-areas: 
    "number number"
    "drawer drawer";
    
    &:last-of-type h1 {
      border-bottom-color: transparent;
    }

    &:last-of-type div {
      border-bottom-color: transparent;

      ${
        props.$isOpen
          ? `
        border-top-color: #ABABB7;
      `
          : `
        border-top-color: transparent;
      `
      }   
    }
  `}
`
const PostSeriesListItemDrawer = styled(motion.div)<{ $isOpen?: boolean }>`
  grid-column: 1 / -1;
  background: white;
  overflow-x: scroll;
  overflow-y: hidden;
  grid-area: drawer;

  ${(props) => props.$isOpen && `border-bottom: solid 1px #ABABB7;`}
`
const PostSeriesItemNumber = styled.h1<{ $firstItem?: boolean }>`
  padding: 0.5rem 0;
  background: white;
  height: 100%;

  display: flex;
  justify-content: space-around;
  align-items: center;

  grid-area: number;

  margin-top: 0 !important;
  margin-bottom: 0 !important;

  border-right: solid 1px #ababb7;
  border-bottom: solid 1px #ababb7;

  ${(props) => props.$firstItem && `border-top: solid 1px #ABABB7;`}

  justify-content: flex-start;
  border-right-color: transparent;

  & span {
    margin-left: 10px;
  }

  ${media.small`
    justify-content: space-around;
    border-right-color: #ababb7;

    & span {
      margin-left: 2px;
    }
  `}
`
const RightAngle = styled.span<{ $isOpen?: boolean }>`
  transition: all 0.2s ease;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${(props) =>
    props.$isOpen
      ? `
    transform: rotate(90deg);
  `
      : `
    transform: rotate(0deg);
  `}
`
const PostSeriesItemTitle = styled.h1`
  text-transform: lowercase;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease;
  margin: 0 !important;

  &:hover {
    color: var(--color-highlight);
  }
`

const PostSeriesItemLink = styled(Link)<{ $firstItem?: boolean }>`
  background: white;
  margin: 0 !important;
  text-decoration: none !important;
  border-bottom: solid 1px #ababb7;
  border-color: #ababb7;
  grid-area: title;
  overflow-x: scroll;

  &.firstItem {
    border-top: solid 1px #ababb7;
  }

  ${media.mobileOnly`
    display: none;
    border-color: transparent;

    & h1 {
      display: none;
      border-color: transparent;
    }
  `}
`
const TableOfContentsLink = styled(Link)`
  text-decoration: none !important;
  white-space: nowrap;
`
const TableOfContentsTitle = styled(PostSeriesItemTitle)`
  display: flex;
  align-items: center;
`
const SmallIconContainer = styled.div<{ $isOpen?: boolean }>`
  --small-icon-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: var(--small-icon-size);
  width: var(--small-icon-size);
  margin-right: 20px;

  & svg {
    transition: transform 0.2s ease;
    height: var(--small-icon-size);
    width: var(--small-icon-size);
  }

  ${(props) =>
    props.$isOpen
      ? `
      & svg {
        transform: rotate(90deg);
      }
  `
      : `
      & svg {
        transform: rotate(0deg);
      }      
  `}
`
const SmallChevronRight = ({ isOpen }: { isOpen?: boolean }) => (
  <SmallIconContainer $isOpen={isOpen}>
    <ChevronRight />
  </SmallIconContainer>
)

const SmallLinkGlyph = () => (
  <SmallIconContainer>
    <LinkGlyph />
  </SmallIconContainer>
)

const drawVariants = {
  open: {
    transition: {
      type: "spring",
      delay: 0,
      stiffness: 250,
      damping: 48,
      mass: 3,
      duration: 0.5,
    },
    height: "100%",
  },
  closed: {
    transition: {
      type: "tween",
      duration: 0.3,
    },
    height: "0px",
  },
}

/**
 * Should take in an array of post data linked to a series,
 * order them by date, and display a nice little menu linking to each item in the series.
 *
 *
 */
interface IPostSeriesList {
  series: PostTypes.FormattedSeriesPost[]
  title: string
  className?: string
}
const PostSeriesList: React.FC<IPostSeriesList> = ({ series, title, className = "" }) => {
  const initialState = new Array(series.length).fill(0).reduce((acc, _, idx) => {
    acc[idx] = false
    return acc
  }, {})
  const [openDrawers, setOpenDrawers] = React.useState(initialState)

  const toggleDrawerOpen = (i: number) => {
    setOpenDrawers({
      ...openDrawers,
      [i]: !openDrawers[i],
    })
  }

  const renderTableOfContents = (post: FormattedSeriesPost) => {
    return Boolean(post?.tableOfContents?.items?.length) ? (
      <>
        {post.tableOfContents.items.map((header) => (
          <TableOfContentsLink key={`${post.path}${header.url}`} to={`/blog${post.path}${header.url}`}>
            <TableOfContentsTitle>
              <SmallLinkGlyph />
              {header.title}
            </TableOfContentsTitle>
          </TableOfContentsLink>
        ))}
      </>
    ) : null
  }

  return (
    <PostSeriesListWrapper className={className}>
      <PostSeriesHeader>
        <span>{title}</span>
      </PostSeriesHeader>
      <ul>
        {series.map((post, i) => (
          <PostSeriesListItem key={post.path} $isOpen={openDrawers[i]}>
            <PostSeriesItemNumber onClick={() => toggleDrawerOpen(i)} $firstItem={i === 0}>
              <span>part {i + 1} </span>
              <RightAngle>
                <SmallChevronRight isOpen={openDrawers[i]} />
              </RightAngle>
            </PostSeriesItemNumber>
            <PostSeriesItemLink className={`${i === 0 ? "firstItem" : ""}`} to={`/blog${post.path}`} aria-hidden="true">
              <PostSeriesItemTitle>{post.title}</PostSeriesItemTitle>
            </PostSeriesItemLink>
            <PostSeriesListItemDrawer
              key={i}
              initial={"closed"}
              animate={openDrawers[i] ? "open" : "closed"}
              variants={drawVariants}
              $isOpen={openDrawers[i]}
            >
              {renderTableOfContents(post)}
            </PostSeriesListItemDrawer>
          </PostSeriesListItem>
        ))}
      </ul>
    </PostSeriesListWrapper>
  )
}

export default PostSeriesList
