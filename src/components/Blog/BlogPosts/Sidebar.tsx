import type * as React from "react"
import type { BlogPostWithMeta } from "@/types/posts"
import type { CommonProps } from "@/types/react"
import { cn } from "@/utils/styles"

import { PostTag } from "../Tags/PostTag"

const afterClassnames = cn([
  "after:absolute after:w-full after:h-1 after:bg-less-dark after:-bottom-1 after:left-0 after:translate-y-px",
])

const sidebarWrapperClassnames = cn([
  "BlogPostsSidebar",
  "bg-less-dark",
  "text-light",
  "px-4",
  "hidden tablet:flex flex-col",
  "ml-10",
  "w-full max-w-[280px]",
  "relative",
  //
])

const stickyContainerClassnames = cn([
  "header",
  "sticky top-24",
  "pt-6",
  "bg-less-dark",
  "z-30",
  "border-b border-light",
  //
  afterClassnames,
])

const blogPostsSidebarStyles = {
  afterClassnames,
  sidebarWrapperClassnames,
  stickyContainerClassnames,
} as const

type DataProps = {
  posts: BlogPostWithMeta[]
  tags: string[]
  categories: string[]
  serieses: string[]
}

type BlogPostsSidebarProps = React.PropsWithoutRef<CommonProps> & Omit<DataProps, "categories">
export function BlogPostsSidebar(props: BlogPostsSidebarProps) {
  return (
    <div className={blogPostsSidebarStyles.sidebarWrapperClassnames}>
      <div className={blogPostsSidebarStyles.stickyContainerClassnames}>
        <h1 className="text-4xl font-bold text-light">Blog Posts</h1>
        <p className="text-light mt-3">Writing I've produced over the years on various topics.</p>
        <h3 className="font-bold text-xl pt-6 pb-2">Tags</h3>
      </div>

      <nav className={cn(["BlogPostsSidebar__nav", "flex flex-col", "space-y-2", "pt-4", "max-w-[200px]"])}>
        {props.tags.map((tag) => {
          return <PostTag key={tag} tag={tag} />
        })}
      </nav>
      <h4 className="font-bold text-lg mt-4 sticky top-[290px]">{props.tags.length} total tags</h4>
    </div>
  )
}
