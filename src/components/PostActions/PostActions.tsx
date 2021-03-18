import React from "react"
import { LinkedinShareButton, TwitterShareButton, RedditShareButton } from "react-share"
import { motion, MotionValue } from "framer-motion"
import { useSiteMeta } from "src/hooks"
import styled, { CSSProperties } from "styled-components"
import { PostNode } from "src/types/post"

const PostActionsWrapper = styled.div<{ $isVisible?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  // bottom: 0.1px;
  // top: 20px;
  bottom: 0.1px;
  width: 100vw;
  height: 4rem;
  background: white;
  box-shadow: 0 -5px 5px -5px #333;
  transition: all 0.2s ease;

  & .share-buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  ${(props) =>
    props.$isVisible
      ? `
    // visibility: visbile;
    max-height: 5rem;
  `
      : `
    // display: none;
    // visibility: hidden;
    max-height: 0rem;
  `}
`
// const ShareCount = styled.div``

const UpArrowContainer = styled.div`
  margin-right: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const RemoveFooterContainer = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const TwitterOutlineIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="44"
    height="44"
    viewBox="0 0 24 24"
    stroke="#212121"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={0.5}
  >
    <g>{/* <circle cx="32" cy="32" r="31" fill="#fff" stroke="#212121" strokeWidth={1}></circle>    */}</g>
    <g>
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497 -3.753C20.18 7.773 21.692 5.25 22 4.009z" />
    </g>
  </svg>
)

const LinkedInOutlineIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 64 64"
    stroke="#212121"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1}
  >
    <g>
      <circle cx="32" cy="32" r="31" fill="#fff" stroke="#212121"></circle>
    </g>
    <g>
      <path
        d="M20.4,44h5.4V26.6h-5.4V44z M23.1,18c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1 c1.7,0,3.1-1.4,3.1-3.1C26.2,19.4,24.8,18,23.1,18z M39.5,26.2c-2.6,0-4.4,1.4-5.1,2.8h-0.1v-2.4h-5.2V44h5.4v-8.6 c0-2.3,0.4-4.5,3.2-4.5c2.8,0,2.8,2.6,2.8,4.6V44H46v-9.5C46,29.8,45,26.2,39.5,26.2z"
        fill="#212121"
      ></path>
    </g>
  </svg>
)

const RedditOutlineIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 64 64"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1}
  >
    <g>
      <circle cx="32" cy="32" r="31" fill="#fff" stroke="#212121" strokeWidth={1}></circle>
    </g>
    <g>
      <path
        d="m 52.8165,31.942362 c 0,-2.4803 -2.0264,-4.4965 -4.5169,-4.4965 -1.2155,0 -2.3171,0.4862 -3.128,1.2682 -3.077,-2.0247 -7.2403,-3.3133 -11.8507,-3.4782 l 2.5211,-7.9373 6.8272,1.5997 -0.0102,0.0986 c 0,2.0281 1.6575,3.6771 3.6958,3.6771 2.0366,0 3.6924,-1.649 3.6924,-3.6771 0,-2.0281 -1.6575,-3.6788 -3.6924,-3.6788 -1.564,0 -2.8968,0.9758 -3.4357,2.3443 l -7.3593,-1.7255 c -0.3213,-0.0782 -0.6477,0.1071 -0.748,0.4233 L 32,25.212062 c -4.8246,0.0578 -9.1953,1.3566 -12.41,3.4425 -0.8058,-0.7446 -1.8751,-1.2104 -3.0583,-1.2104 -2.4905,0 -4.5152,2.0179 -4.5152,4.4982 0,1.649 0.9061,3.0787 2.2389,3.8607 -0.0884,0.4794 -0.1462,0.9639 -0.1462,1.4569 0,6.6487 8.1736,12.0581 18.2223,12.0581 10.0487,0 18.224,-5.4094 18.224,-12.0581 0,-0.4658 -0.0493,-0.9248 -0.1275,-1.377 1.4144,-0.7599 2.3885,-2.2304 2.3885,-3.9406 z m -29.2808,3.0872 c 0,-1.4756 1.207,-2.6775 2.6894,-2.6775 1.4824,0 2.6877,1.2019 2.6877,2.6775 0,1.4756 -1.2053,2.6758 -2.6877,2.6758 -1.4824,0 -2.6894,-1.2002 -2.6894,-2.6758 z m 15.4037,7.9373 c -1.3549,1.3481 -3.4816,2.0043 -6.5008,2.0043 l -0.0221,-0.0051 -0.0221,0.0051 c -3.0209,0 -5.1476,-0.6562 -6.5008,-2.0043 -0.2465,-0.2448 -0.2465,-0.6443 0,-0.8891 0.2465,-0.2465 0.6477,-0.2465 0.8942,0 1.105,1.0999 2.9393,1.6337 5.6066,1.6337 l 0.0221,0.0051 0.0221,-0.0051 c 2.6673,0 4.5016,-0.5355 5.6066,-1.6354 0.2465,-0.2465 0.6477,-0.2448 0.8942,0 0.2465,0.2465 0.2465,0.6443 0,0.8908 z m -0.3213,-5.2615 c -1.4824,0 -2.6877,-1.2002 -2.6877,-2.6758 0,-1.4756 1.2053,-2.6775 2.6877,-2.6775 1.4824,0 2.6877,1.2019 2.6877,2.6775 0,1.4756 -1.2053,2.6758 -2.6877,2.6758 z"
        fill="#212121"
      ></path>
    </g>
  </svg>
)

interface IUpArrowCircleIcon {
  pathLength: MotionValue
  size?: number
}
const UpArrowCircleIcon: React.FC<IUpArrowCircleIcon> = ({ pathLength, size = 4 }) => (
  <svg
    width="44"
    height="44"
    viewBox={`0 0 ${size * 6} ${size * 6}`}
    stroke="#212121"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1}
  >
    <path stroke="none" d={`M0 0h${size * 6}v${size * 6}H0z`} />
    <motion.path
      fill="none"
      stroke="var(--color-highlight)"
      strokeWidth={4}
      strokeDasharray="0 1"
      d={`M-${size * 10},0a${size * 10},${size * 10} 0 1,0 ${size * 10 * 2},0a${size * 10},${size * 10} 0 1,0 -${
        size * 10 * 2
      },0`}
      style={{
        pathLength,
        rotate: 90,
        scale: 0.2,
        translateX: 12,
        translateY: 12,
        scaleX: -1, // reverse direction of animation
      }}
    />
    <line x1={size * 3} y1={size * 2} x2={size * 2} y2={size * 3} />
    <line x1={size * 3} y1={size * 2} x2={size * 3} y2={size * 4} />
    <line x1={size * 4} y1={size * 3} x2={size * 3} y2={size * 2} />
  </svg>
)

const CloseIcon = () => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 24 24"
    stroke="#212121"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1}
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M10 10l4 4m0 -4l-4 4" />
  </svg>
)

/**
 * Should be a sidenav on big screens and on screens less than 900px wide,
 * should be a bottom nav that is dismissable.
 *
 * Should allow users to scroll to top of page and to share post.
 * Should also show a progress bar of how far down they've read.
 *
 *
 */

interface IPostActions {
  pathLength: MotionValue
  postNode: PostNode
}
const PostActions: React.FC<IPostActions> = ({ pathLength, postNode, ...props }) => {
  const [isVisible, setIsVisible] = React.useState(true)
  const data = useSiteMeta()
  const siteUrl = data.site.siteMetadata.siteUrl

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      <PostActionsWrapper $isVisible={isVisible} {...props}>
        {isVisible && (
          <>
            <RemoveFooterContainer style={{ transform: `scale(0.8)` }} onClick={() => setIsVisible(false)}>
              <CloseIcon />
            </RemoveFooterContainer>
            <ShareItems postNode={postNode} siteUrl={siteUrl} />
            <UpArrowContainer style={{ transform: `scale(0.8)` }} onClick={() => scrollTop()}>
              <UpArrowCircleIcon pathLength={pathLength} />
            </UpArrowContainer>
          </>
        )}
      </PostActionsWrapper>
    </>
  )
}

const buttonStyle = {
  cursor: "pointer",
  outline: "none",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: `0 1rem`,
}

interface IShareItems {
  siteUrl: string
  postNode: PostNode
}
const ShareItems: React.FC<IShareItems> = ({ siteUrl, postNode }) => {
  const url = `${siteUrl}/blog${postNode.fields.slug}`

  return (
    <div className="share-buttons" style={{ transform: `scale(0.8)` }}>
      <RedditShareButton
        url={url}
        title={postNode.frontmatter.title}
        style={buttonStyle as CSSProperties}
        role="button"
        aria-label="reddit-share"
      >
        <RedditOutlineIcon />
      </RedditShareButton>
      <TwitterShareButton
        url={url}
        title={postNode.frontmatter.title}
        style={buttonStyle as CSSProperties}
        role="button"
        aria-label="twitter-share"
      >
        <TwitterOutlineIcon />
      </TwitterShareButton>
      <LinkedinShareButton
        url={url}
        title={postNode.frontmatter.title}
        // description={postNode.excerpt}
        style={buttonStyle as CSSProperties}
        role="button"
        aria-label="linked-in-share"
      >
        <LinkedInOutlineIcon />
      </LinkedinShareButton>
    </div>
  )
}

export default PostActions
