import * as React from "react"
import { cn } from "@/utils/styles"
import type { usePaginatedBlogPosts } from "../use-paginated-blog-posts"

export type PaginationProps = {
  pagination: ReturnType<typeof usePaginatedBlogPosts>
}
export function Pagination({ pagination }: PaginationProps) {
  const { pagination: paginationActions, currentPage, prevPage, nextPage, totalPages } = pagination
  const {
    goToPage,
    hasNext,
    hasPrev,
    // range,
  } = paginationActions

  const svgSmallStrokeWidth = 1
  const svgLargeStrokeWidth = 1.66667

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }
  const goToNextPage = () => {
    paginationActions.goToNextPage()
    scrollToTop()
  }
  const goToPrevPage = () => {
    paginationActions.goToPrevPage()
    scrollToTop()
  }
  const goToFirstPage = () => {
    goToPage(1)
    scrollToTop()
  }
  const goToLastPage = () => {
    goToPage(totalPages)
    scrollToTop()
  }

  const baseButtonClassnames = cn([
    "block",
    "border rounded-lg",
    "[&_svg]:scale-50",
    //
  ])
  const disabledButtonClassnames = cn([
    baseButtonClassnames,
    "opacity-70",
    "border-slate-600",
    "text-slate-600",
    "outline:none",
  ])
  const activeButtonClassnames = cn([
    baseButtonClassnames,
    "duration-100",
    "border-slate-500",
    "hover:border-accent-light",
    "text-slate-400",
    "hover:text-slate-200",
  ])

  const renderFirstPageButton = (isDisabled?: boolean) => {
    if (isDisabled) {
      return (
        <button
          disabled
          // class="disabled"
          className={cn([
            //
            disabledButtonClassnames,
          ])}
        >
          <svg
            aria-hidden="true"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current"
          >
            <path
              d="M24.6667 9L18 15.6667L24.6667 22.3333"
              stroke="currentColor"
              strokeWidth={svgLargeStrokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.6667 9L8 15.6667L14.6667 22.3333"
              stroke="currentColor"
              strokeWidth={svgLargeStrokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )
    }

    return (
      <button onClick={goToFirstPage} aria-label="Go to the first page" className={cn([activeButtonClassnames])}>
        <svg
          aria-hidden="true"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.6667 9L18 15.6667L24.6667 22.3333"
            stroke="currentColor"
            strokeWidth={svgLargeStrokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.6667 9L8 15.6667L14.6667 22.3333"
            stroke="currentColor"
            strokeWidth={svgLargeStrokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    )
  }

  const renderPreviousPageButton = () => {
    if (!hasPrev) {
      return (
        <button disabled className={cn([disabledButtonClassnames])}>
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={svgSmallStrokeWidth}
              d="m14 7-5 5 5 5"
            />
          </svg>
        </button>
      )
    }

    return (
      <button onClick={goToPrevPage} aria-label="Go to the previous page" className={cn([activeButtonClassnames])}>
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={svgSmallStrokeWidth}
            d="m14 7-5 5 5 5"
          />
        </svg>
      </button>
    )
  }

  const renderNextPageButton = () => {
    if (!hasNext) {
      return (
        <button disabled className={cn([disabledButtonClassnames])}>
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={svgSmallStrokeWidth}
              d="m10 7 5 5-5 5"
            />
          </svg>
        </button>
      )
    }

    return (
      <button onClick={goToNextPage} aria-label="Go to the next page" className={cn([activeButtonClassnames])}>
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={svgSmallStrokeWidth}
            d="m10 7 5 5-5 5"
          />
        </svg>
      </button>
    )
  }

  const renderLastPageButton = (isDisabled?: boolean) => {
    if (isDisabled) {
      return (
        <button disabled className={cn([disabledButtonClassnames])}>
          <svg
            aria-hidden="true"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.33333 9L14 15.6667L7.33333 22.3333"
              stroke="currentColor"
              strokeWidth={svgLargeStrokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.3333 9L24 15.6667L17.3333 22.3333"
              stroke="currentColor"
              strokeWidth={svgLargeStrokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )
    }

    return (
      <button onClick={goToLastPage} aria-label="Go to the last page" className={cn([activeButtonClassnames])}>
        <svg
          aria-hidden="true"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.33333 9L14 15.6667L7.33333 22.3333"
            stroke="currentColor"
            strokeWidth={svgLargeStrokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.3333 9L24 15.6667L17.3333 22.3333"
            stroke="currentColor"
            strokeWidth={svgLargeStrokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    )
  }

  return (
    <nav className={cn("pagination")}>
      <ul className={cn("pagination__list", "flex items-center gap-4")}>
        <li>{renderFirstPageButton(currentPage === 1 || prevPage === 1)}</li>
        <li>{renderPreviousPageButton()}</li>
        <li>
          <span className="text-light">
            Page {currentPage} of {totalPages}
          </span>
        </li>
        <li>{renderNextPageButton()}</li>
        <li>{renderLastPageButton(currentPage === totalPages || nextPage === totalPages)}</li>
      </ul>
    </nav>
  )
}
