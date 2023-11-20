import * as React from "react"
import { ShareButton, type SocialShareButtonProps } from "./ShareButton"
import { objectToGetParams } from "@/lib/links"
import * as parseUtils from "@/utils/parse-utils"
import { cn } from "@/utils/styles"

const twitterWindowOpts = {
  windowWidth: 550,
  windowHeight: 400,
}

type TwitterLinkOptions = {
  title: string
  via?: string
  hashtags?: string[]
  related?: string[]
}
function twitterLink(url: string, { title, via, hashtags, related }: TwitterLinkOptions) {
  return (
    "https://twitter.com/share" +
    objectToGetParams({
      url,
      text: title,
      via,
      hashtags: parseUtils.isDefined(hashtags) && hashtags?.length > 0 ? hashtags.join(",") : undefined,
      related: parseUtils.isDefined(related) && related.length > 0 ? related.join(",") : undefined,
    })
  )
}

const TwitterOutlineIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 64 64"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="group"
  >
    <g>
      <circle
        cx="32"
        cy="32"
        r="31"
        className={cn(
          //
          "duration-200",
          "stroke-slate-400 group-hover:stroke-slate-200",
          "fill-transparent group-hover:fill-even-less-dark"
        )}
        strokeWidth={2}
      />
    </g>
    <g
      style={{
        transform: `translate(7px, 11px)`,
      }}
    >
      {/* <path stroke="none" d="M0 0h24v24H0z" /> */}
      <path
        d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497 -3.753C20.18 7.773 21.692 5.25 22 4.009z"
        strokeWidth={1.5}
        className="duration-200 stroke-slate-400 group-hover:stroke-light"
        style={{
          transform: `scale(2)`,
        }}
      />
    </g>
  </svg>
)

export function TwitterShareButton({ url, title }: SocialShareButtonProps) {
  return (
    <ShareButton
      url={url}
      title={title}
      opts={{ title, via: undefined, hashtags: undefined, related: undefined }}
      networkName="twitter"
      networkLink={twitterLink}
      {...twitterWindowOpts}
      role="button"
      aria-label="twitter-share"
      className={cn("", "", "")}
    >
      <TwitterOutlineIcon />
    </ShareButton>
  )
}
