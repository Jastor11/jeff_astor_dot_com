import * as React from "react"
import type { BlogPostWithMeta } from "@/types/posts"
import type { CommonProps } from "@/types/react"
import { cn } from "@/utils/styles"
import { usePaginatedBlogPosts } from "../use-paginated-blog-posts"

import { BlogPostsSidebar } from "./Sidebar"
import { BlogPostsListing } from "./PostsListing"

type DataProps = {
  posts: BlogPostWithMeta[]
  tags: string[]
  categories: string[]
  serieses: string[]
}

type BlogPostsProps = CommonProps & DataProps

function BlogPosts(props: BlogPostsProps) {
  const { posts, tags, categories, serieses } = props

  // const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [filterInput, setFilterInput] = React.useState("")

  const getPostsToShow = (filterValue: string) => {
    return (posts ?? []).filter((post) => {
      if (filterValue.length === 0) return true
      const textToCheck = post.data.title
      return textToCheck.toLowerCase().includes(filterValue.toLowerCase())
    })
  }

  const postsToShow = getPostsToShow(filterInput)

  const paginatedPostsData = usePaginatedBlogPosts(postsToShow)

  const handleOnFilterInputChange = (newInput: string) => {
    setFilterInput(newInput)

    paginatedPostsData.pagination.setCurrentPage(1)
  }

  return (
    <div
      className={cn([
        "BlogPage",
        "flex",
        "gap-4",
        "pb-10",
        "",
        // ""
      ])}
    >
      <BlogPostsSidebar
        posts={paginatedPostsData.data}
        tags={tags}
        serieses={serieses}
        //
      />
      <BlogPostsListing
        pagination={paginatedPostsData}
        posts={postsToShow}
        categories={categories}
        filterInput={filterInput}
        setFilterInput={handleOnFilterInputChange}
      />
    </div>
  )
}

export default BlogPosts
