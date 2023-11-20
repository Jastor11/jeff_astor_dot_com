import * as React from "react"
import { ShareButton, type SocialShareButtonProps } from "./ShareButton"
import { objectToGetParams } from "@/lib/links"
import { cn } from "@/utils/styles"

type LinkedInOptions = {
  /** The url-encoded title value that you wish you use. */
  title?: string
  /** The url-encoded description that you wish you use. */
  summary?: string
  /** The url-encoded source of the content (e.g. your website or application name) */
  source?: string
}

function linkedInLink(url: string, { title, summary, source }: LinkedInOptions) {
  return "https://linkedin.com/shareArticle" + objectToGetParams({ url, mini: "true", title, summary, source })
}

const LinkedInOutlineIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 64 64"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1}
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
      />
    </g>
    <g>
      <path
        d="M20.4,44h5.4V26.6h-5.4V44z M23.1,18c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1 c1.7,0,3.1-1.4,3.1-3.1C26.2,19.4,24.8,18,23.1,18z M39.5,26.2c-2.6,0-4.4,1.4-5.1,2.8h-0.1v-2.4h-5.2V44h5.4v-8.6 c0-2.3,0.4-4.5,3.2-4.5c2.8,0,2.8,2.6,2.8,4.6V44H46v-9.5C46,29.8,45,26.2,39.5,26.2z"
        className="duration-200 fill-slate-400 group-hover:fill-light"
      />
    </g>
  </svg>
)

const linkedInWindowOpts = {
  windowWidth: 750,
  windowHeight: 600,
} as const

export function LinkedInShareButton({ url, title }: SocialShareButtonProps) {
  return (
    <ShareButton
      url={url}
      title={title}
      opts={{ title, summary: undefined, source: undefined }}
      networkName="linkedin"
      networkLink={linkedInLink}
      {...linkedInWindowOpts}
      role="button"
      aria-label="linkedin-share"
      className={cn("", "", "")}
    >
      <LinkedInOutlineIcon />
    </ShareButton>
  )
}
