import type * as React from "react"
import type { CommonProps } from "@/types/react"
import { cn } from "@/utils/styles"
import * as links from "@/lib/links"
import { slugify } from "@/utils/slugify"

type PostTagProps = React.PropsWithoutRef<CommonProps> & {
  tag: string
}

export function PostTag({ tag, className, ...props }: PostTagProps) {
  const linkToTagPage = links.formatTagLink(slugify(tag))

  return (
    <a
      href={linkToTagPage}
      className={cn([
        "PostTag",
        "bg-accent",
        "py-3 pb-4 px-3",
        "rounded-lg",
        "mr-1 mb-1 mt-1",
        "cursor-pointer",
        "post-tag-slant",
        className,
        //
      ])}
      {...props}
    >
      <span className={cn(["text-white", "font-light"])}>{tag}</span>
    </a>
  )
}
