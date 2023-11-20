import * as React from "react"
// import type { BlogPostWithMeta } from "@/content/config"
import type { BlogPostWithMeta } from "@/types/posts"
import * as parseUtils from "@/utils/parse-utils"
import { usePaginate } from "./use-paginate"

// type Page<T = any> = {
//   /** result */
//   data: T[]
//   /** metadata */
//   /** the count of the first item on the page, starting from 0 */
//   start: number
//   /** the count of the last item on the page, starting from 0 */
//   end: number
//   /** total number of results */
//   total: number
//   /** the current page number, starting from 1 */
//   currentPage: number
//   /** number of items per page (default: 25) */
//   size: number
//   /** number of last page */
//   lastPage: number
//   url: {
//     /** url of the current page */
//     current: string
//     /** url of the previous page (if there is one) */
//     prev: string | undefined
//     /** url of the next page (if there is one) */
//     next: string | undefined
//   }
// }

export function usePaginatedBlogPosts(posts: BlogPostWithMeta[]) {
  const [currentPage, setCurrentPage] = React.useState(1)
  const pageSize = 20
  const totalPosts = posts.length

  const paginationInfo = usePaginate({
    records: totalPosts,
    page: currentPage,
    limit: pageSize,
    setRange: true,
  })

  if (!parseUtils.isDefined(paginationInfo)) {
    const output = {
      data: posts,
      start: 0,
      end: totalPosts - 1,
      totalPages: 1,
      currentPage,
      nextPage: undefined,
      prevPage: undefined,
      size: pageSize,
      // lastPage: currentPage,
      pagination: {
        range: [0],
        hasNext: false,
        hasPrev: false,
        isLast: true,
        setCurrentPage: () => {},
        goToNextPage: () => {},
        goToPrevPage: () => {},
        goToPage: () => {},
      },
    } as const
    return output
  }

  const {
    // currentPage,
    firstIndex,
    // firstPage,
    hasNext,
    hasPrevious,
    isLastPage,
    lastIndex,
    range,
    next,
    previous,
    totalPages,
  } = paginationInfo.pagination

  // console.dir({ paginationInfo })

  const output = {
    data: posts.slice(firstIndex, lastIndex + 1),
    start: firstIndex,
    end: lastIndex,
    totalPages: totalPages,
    // currentPage: Math.max(totalPages, currentPage),
    currentPage,
    nextPage: next,
    prevPage: previous,
    size: pageSize,
    // lastPage: currentPage,
    pagination: {
      range: range ?? [],
      hasNext: hasNext,
      hasPrev: hasPrevious,
      isLast: isLastPage,
      setCurrentPage,
      goToNextPage: next ? () => setCurrentPage(next) : () => {},
      goToPrevPage: previous ? () => setCurrentPage(previous) : () => {},
      goToPage: (page: number) => setCurrentPage(page),
    },
  } as const

  return output
}
