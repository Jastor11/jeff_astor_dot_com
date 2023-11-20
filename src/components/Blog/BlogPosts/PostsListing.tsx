import * as React from "react"
import type { BlogPostWithMeta } from "@/types/posts"
import type { CommonProps } from "@/types/react"
import { cn } from "@/utils/styles"

import type { PaginationProps } from "./Pagination"
import { Pagination } from "./Pagination"

import { PostPreview } from "../PostPreview/PostPreview"

type DataProps = {
  posts: BlogPostWithMeta[]
  tags: string[]
  categories: string[]
  serieses: string[]
}

const sectionClassnames = cn([
  "BlogPostsListing",
  "flex flex-col",
  "w-full tablet:max-w-[80ch] mx-auto",
  "px-4 tablet:px-0 tablet:pr-4",
  "relative",
  //
])

const afterAndBeforeClassnames = cn([
  "after:absolute after:w-full after:h-1 after:bg-less-dark after:-bottom-1 after:left-0 after:translate-y-px",
])

const stickyContainerClassnames = cn([
  "header block tablet:hidden py-4 z-30 bg-less-dark",
  "tablet:mt-4",
  "sticky sm:top-24 top-28",
  "border-b border-light",
  afterAndBeforeClassnames,
])

const filterInputWrapperClassnames = cn([
  "w-full",
  "hidden tablet:block",
  "sticky top-24",
  // "z-30 bg-dark",
  "z-30 bg-less-dark",
  "pt-2 pb-2 tablet:pt-6",
  "border-b border-light",
  afterAndBeforeClassnames,
])

const blogPostsListingStyles = {
  sectionClassnames,
  afterAndBeforeClassnames,
  stickyContainerClassnames,
  filterInputWrapperClassnames,
} as const

type BlogPostsListingProps = PaginationProps & {
  posts: DataProps["posts"]
  categories: DataProps["categories"]
  filterInput: string
  setFilterInput: (input: string) => void
}

function FilterInput(props: BlogPostsListingProps) {
  const { pagination } = props
  const posts = pagination.data
  const totalPosts = props.posts?.length ?? 0

  return (
    <React.Fragment>
      {/* hidden tablet and above */}
      <div className={blogPostsListingStyles.stickyContainerClassnames}>
        <h1 className="text-4xl font-bold text-light">Blog Posts</h1>
        <p className="text-light my-3">Writing I've produced over the years on various topics.</p>
        <BlogPostsFilterInput filterInput={props.filterInput} setFilterInput={props.setFilterInput} />
        <div className="pagination pt-2 flex items-center flex-wrap justify-between gap-2">
          <Pagination pagination={pagination} />
          <h3 className="text-lg text-slate-400">
            ({totalPosts} Total {totalPosts === 1 ? "Post" : "Posts"})
          </h3>
        </div>
      </div>
      {/* hidden tablet and below */}
      <div className={blogPostsListingStyles.filterInputWrapperClassnames}>
        <BlogPostsFilterInput filterInput={props.filterInput} setFilterInput={props.setFilterInput} />
        <div className="pagination pt-2 flex items-center flex-wrap justify-between gap-2">
          <Pagination pagination={pagination} />
          <h3 className="text-lg text-slate-400">
            ({totalPosts} Total {totalPosts === 1 ? "Post" : "Posts"})
          </h3>
        </div>
      </div>
    </React.Fragment>
  )
}

function EmptyListMessage() {
  return (
    <h3
      key={0}
      className={
        "mt-3 px-10 py-4 rounded-lg bg-even-less-dark elevate-3 text-2xl text-slate-400 border border-slate-800 flex items-center sticky top-40"
      }
    >
      No posts found for those search params. <br /> Adjust the filters.
    </h3>
  )
}

export function BlogPostsListing(props: React.PropsWithoutRef<BlogPostsListingProps>) {
  const { pagination } = props
  const posts = pagination.data

  const handleClickNext = () => {
    pagination.pagination.goToNextPage()
    // scroll to top
    window.scrollTo(0, 0)
  }

  const handleClickPrev = () => {
    pagination.pagination.goToPrevPage()
    // scroll to top
    window.scrollTo(0, 0)
  }

  return (
    <section className={blogPostsListingStyles.sectionClassnames}>
      <FilterInput {...props} />

      <div className={cn(["w-full", "flex flex-col", "gap-4", "mt-2"])}>
        {posts.length === 0 ? <EmptyListMessage /> : null}
        {posts.map((post) => {
          return <PostPreview post={post} key={post.slug} />
        })}
        <div className="mt-4 pb-2 flex items-center justify-between w-full">
          {pagination?.pagination?.hasPrev ? (
            <span role="button" className={cn(["inline-block", "text-white", "group"])} onClick={handleClickPrev}>
              <span className="group-hover:mr-1 duration-200 ease-in-out rotate-180 inline-flex">→</span> Previous Page
            </span>
          ) : null}
          {pagination.pagination?.hasNext ? (
            <span role="button" className={cn(["inline-block", "text-white", "group"])} onClick={handleClickNext}>
              Next Page <span className="group-hover:ml-1 duration-200 ease-in-out">→</span>
            </span>
          ) : null}
        </div>
      </div>
    </section>
  )
}

const blogPostFilterInputStyles = cn([
  "blog-posts-filter-input",
  "bg-even-less-dark",
  "border border-slate-800",
  "text-slate-400",
  "focus:text-slate-300 focus:placeholder-slate-300",
  "py-3 pb-4 px-3",
  "rounded-lg",
  "mr-1 mb-1 mt-1",
  "duration-100",
  "w-full",
  //
])

type BlogPostsFilterInputProps = CommonProps & {
  filterInput: string
  setFilterInput: (input: string) => void
}
function BlogPostsFilterInput(props: BlogPostsFilterInputProps) {
  return (
    <div className="BlogPostsFilterInput w-full">
      <input
        type="text"
        placeholder="Filter posts..."
        value={props.filterInput}
        onChange={(e) => props.setFilterInput(e.target.value)}
        className={blogPostFilterInputStyles}
      />
    </div>
  )
}
