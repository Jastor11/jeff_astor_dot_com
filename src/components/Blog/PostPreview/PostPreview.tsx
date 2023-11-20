import type * as React from "react"
import type { UndrawSvgName } from "@/lib/undraw"

import { cn } from "@/utils/styles"
import * as links from "@/lib/links"

// import type { UndrawSvgName } from "@/lib/undraw"
import UndrawSvg from "@/components/Media/UndrawSvg"
import { prettyDate } from "@/lib/dates"

import type { PostPreviewProps } from "./PostPreview.interface"
import { postPreviewStyles } from "./PostPreview.interface"

export function PostPreview({ post, ...props }: PostPreviewProps) {
  const postUrl = links.formatBlogLinkFromSlug(post.slug)
  const postDate = prettyDate(post.data.date)

  return (
    <a href={postUrl} className={postPreviewStyles.wrapperClassnames} {...props}>
      <div
        className={cn(
          postPreviewStyles.postPreviewCardMediaClassnames,
          post.data.category === "FastAPI" ? "" : "flex justify-center"
        )}
      >
        <div className={postPreviewStyles.postPreviewImageWrapperClassnames}>
          {post.data.category ? (
            <UndrawSvg className="w-full h-full" name={post.data.category as UndrawSvgName} />
          ) : null}
        </div>
        <div className="">
          <span className={postPreviewStyles.categoryLabelClassnames}>{post.data.category}</span>
        </div>
      </div>

      <div className={postPreviewStyles.postPreviewInfoClassnames}>
        <h4 className={postPreviewStyles.postTitleClassnames}>{post.data.title}</h4>
        <div className="post-meta flex items-center justify-between">
          <h5 className={postPreviewStyles.postDateClassnames}>{postDate}</h5>
        </div>
      </div>
    </a>
  )
}
