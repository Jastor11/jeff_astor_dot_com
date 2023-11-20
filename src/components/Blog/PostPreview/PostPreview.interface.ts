import type * as React from "react"
import type { BlogPostWithMeta } from "@/types/posts"
import type { CommonProps } from "@/types/react"

import { cn } from "@/utils/styles"

const wrapperAfterClassnames = [
  "after:absolute",
  "after:bg-white",
  "after:rounded",
  "after:duration-200",
  "after:ease-linear",
  "after:z-0",
  // "",
  "after:h-0 after:w-0",
  "sm:after:h-[100%] sm:hover:after:w-full",
  // "",
  "hover:after:p-0",
  "sm:after:py-4 sm:after:px-1.5",
  // "",
  "hover:after:opacity-0",
  "sm:hover:after:opacity-100",
]
const wrapperClassnames = cn([
  "post-preview",
  "group",
  "relative",
  "block",
  "w-full max-w-[100vw] max-h-full",
  "rounded-lg",
  "bg-less-dark",
  "flex flex-shrink-0 flex-grow basis-auto",
  "no-underline",
  "hover:no-underline",
  "flex-col sm:flex-row",
  ...wrapperAfterClassnames,
])

const postPreviewImageWrapperClassnames = cn(["sm:min-h-48", "h-full", "sm:max-h-48", "relative z-20"])

const postPreviewCardMediaClassnames = cn([
  "relative z-10",
  "flex-1",
  "bg-white rounded-lg",
  "px-3 py-4",
  "h-56",
  "w-full",
])

const categoryLabelClassnames = cn([
  "post-category",
  "absolute",
  "z-20 top-1 left-2",
  "inline-block",
  "text-2xs text-light bg-less-dark",
  "uppercase font-bold tracking-wide",
  "rounded",
  "px-1.5 pt-1 pb-2.5",
  "mt-1 mb-1.5",
  "small-category-span-slant",
])

const postPreviewInfoClassnames = cn([
  "post-info",
  "relative z-20",
  "flex flex-col",
  "justify-start xs:justify-between",
  "basis-0 flex-shrink-0",
  "sm:flex-grow",
  "p-4 lg:pr-8",
  "bg-transparent",
  "duration-300 ease-linear",
])

const postPreviewTextClassnames = cn([
  "text-slate-400 group-hover:text-light",
  "sm:text-slate-400 sm:group-hover:text-slate-800",
  "duration-150",
  //
])

const postTitleClassnames = cn([
  "text-xl lg:text-2xl",
  "text-inherit",
  "font-heading",
  postPreviewTextClassnames,
  //
])

const postDateClassnames = cn([
  "mt-2",
  "text-xs",
  "text-inherit",
  "font-heading",
  postPreviewTextClassnames,
  //
])

export const postPreviewStyles = {
  wrapperClassnames,
  postPreviewImageWrapperClassnames,
  postPreviewCardMediaClassnames,
  categoryLabelClassnames,
  postPreviewInfoClassnames,
  postPreviewTextClassnames,
  postTitleClassnames,
  postDateClassnames,
} as const

export type PostPreviewProps = CommonProps & {
  post: BlogPostWithMeta
}
