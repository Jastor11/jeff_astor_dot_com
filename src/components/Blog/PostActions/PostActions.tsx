import type { BlogPostWithMeta } from "@/types/posts"
import type { MotionValue } from "framer-motion"
import * as React from "react"
import { LinkedInShareButton, RedditShareButton, TwitterShareButton } from "./ShareButtons"
import { formatBlogLinkFromSlug } from "@/lib/links"

import { cn } from "@/utils/styles"

import { motion, useTransform, useScroll, useSpring } from "framer-motion"

type Post = BlogPostWithMeta

export const ScaledDownContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div className={cn("scale-[0.8]", className)} {...props}>
      {children}
    </div>
  )
}

type SocialShareButtonsProps = {
  post: Post
  isVisible?: boolean
}
function SocialShareButtons({ post, isVisible }: SocialShareButtonsProps) {
  const { title } = post.data
  const slug = post.slug
  const url = formatBlogLinkFromSlug(slug)

  if (!isVisible) return null

  return (
    <ScaledDownContainer className={cn("flex items-center justify-center flex-row gap-10", "group")}>
      <span
        className={cn(
          "hidden sm:flex items-center justify-center text-2xl mr-[-10px] font-bold font-display",
          "duration-200 text-slate-400 group-hover:text-light",
          //
          ""
        )}
      >
        Share:
      </span>
      <RedditShareButton url={url} title={title} />
      <TwitterShareButton url={url} title={title} />
      <LinkedInShareButton url={url} title={title} />
    </ScaledDownContainer>
  )
}

type ScrollToTopButtonProps = {
  isVisible?: boolean
  pathLength: MotionValue
  size?: number
}
const ScrollToTopButton = ({ size = 4, isVisible, pathLength }: ScrollToTopButtonProps) => {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div
      className={cn(
        "mr-4",
        "text-accent",
        "hidden mobile:flex flex-row items-center justify-center",
        "cursor-pointer"
        // isVisible ? "" : "hidden"
      )}
      style={{
        transform: `scale(0.8)`,
        ...(isVisible ? {} : { display: `none` }),
      }}
      onClick={() => scrollTop()}
    >
      <svg
        width="44"
        height="44"
        viewBox={`0 0 ${size * 6} ${size * 6}`}
        stroke="#212121"
        fill="none"
        // fill="rgba(255, 255, 255, 0.1)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
      >
        <path stroke="none" d={`M0 0h${size * 6}v${size * 6}H0z`} />
        <motion.path
          // fill="none"
          fill="rgba(255, 255, 255, 0.05)"
          className="stroke-[#ababb733]"
          strokeWidth={4}
          strokeDasharray="0 1"
          d={`M-${size * 10},0a${size * 10},${size * 10} 0 1,0 ${size * 10 * 2},0a${size * 10},${size * 10} 0 1,0 -${
            size * 10 * 2
          },0`}
          style={{
            // pathLength,
            rotate: 90,
            scale: 0.2,
            translateX: 12,
            translateY: 12,
            scaleX: -1, // reverse direction of animation
          }}
        />
        <motion.path
          fill="none"
          className="stroke-current"
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
        <line x1={size * 3} y1={size * 2} x2={size * 2} y2={size * 3} className="stroke-current" />
        <line x1={size * 3} y1={size * 2} x2={size * 3} y2={size * 4} className="stroke-current" />
        <line x1={size * 4} y1={size * 3} x2={size * 3} y2={size * 2} className="stroke-current" />
      </svg>
    </div>
  )
}

type RemoveFooterButtonProps = {
  isVisible?: boolean
  setIsVisible: (isVisible: boolean) => void
}

const RemoveFooterButton = ({ setIsVisible, isVisible }: RemoveFooterButtonProps) => {
  if (!isVisible) return null

  return (
    <div
      role="button"
      className={cn("mr-4", "flex flex-row items-center justify-center", "cursor-pointer", isVisible ? "" : "hidden")}
      style={{ transform: `scale(0.8)` }}
      onClick={() => setIsVisible(false)}
    >
      <svg
        width="44"
        height="44"
        viewBox="0 0 24 24"
        className="group"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="2"
          className={cn(
            //
            "duration-200",
            "stroke-slate-400 group-hover:stroke-slate-200",
            "fill-transparent group-hover:fill-even-less-dark"
          )}
        />
        <path d="M10 10l4 4m0 -4l-4 4" className="duration-200 stroke-slate-400 group-hover:stroke-light" />
      </svg>
    </div>
  )
}

const getDocHeight = () => {
  try {
    const body = document.body
    const html = document.documentElement
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    )
    return docHeight
  } catch (e) {
    // console.log({ e })
    return 0
  }
}

const getMaxHeight = () => {
  try {
    const docHeight = getDocHeight()
    const windowHeight = window.innerHeight
    const baseHeight = docHeight - windowHeight
    return baseHeight
  } catch (e) {
    // console.log({ e })
    return 0
  }
}

type PostActionsProps = React.HTMLAttributes<HTMLDivElement> & {
  // pathLength: MotionValue
  post: Post
}
export function PostActions({
  // pathLength,
  post,
  className = "",
  ...props
}: PostActionsProps) {
  const [isVisible, setIsVisible] = React.useState(true)
  const [maxHeight, setMaxHeight] = React.useState(getMaxHeight())
  const { scrollY } = useScroll()
  const yRange = useTransform(scrollY, [0, maxHeight], [0, 1])
  const pathLength = useSpring(yRange, { stiffness: 400, damping: 90 })
  const slug = post.slug
  const maxHeights = React.useRef<Record<string, number>>({})

  React.useEffect(() => {
    // console.log({ slug, maxHeight: getMaxHeight() })
    setMaxHeight(getMaxHeight())
  }, [slug])

  return (
    <div
      className={cn(
        "PostActions",
        "flex flex-row items-stretch justify-between",
        "sticky bottom-0",
        "z-50",
        "w-screen max-w-screen-100% h-16",
        "duration-200",
        "post-footer-shadow",
        isVisible ? "max-h-20" : "max-h-0",
        className
      )}
      {...props}
    >
      <RemoveFooterButton setIsVisible={setIsVisible} isVisible={isVisible} />
      <SocialShareButtons post={post} isVisible={isVisible} />
      <ScrollToTopButton pathLength={pathLength} isVisible={isVisible} />
    </div>
  )
}

export default PostActions
