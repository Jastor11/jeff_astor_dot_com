import * as React from "react"
import type { CommonProps } from "@/types/react"
import type { BlogPostWithMeta } from "@/types/posts"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

import * as parseUtils from "@/utils/parse-utils"
import { formatBlogLinkFromSlug } from "@/lib/links"
import { cn } from "@/utils/styles"

const maxWidthStyles = cn(
  "w-full",
  "my-0 mx-auto",
  "max-w-screen-95%",
  "mobile:max-w-screen-95%",
  "xs:max-w-screen-95%",
  "sm:max-w-screen-95%",
  "md:max-w-screen-95%",
  "tablet:max-w-screen-90%",
  "lg:max-w-screen-85%",
  "xl:max-w-screen-80%",
  "2xl:max-w-screen-xl"
)

const ChevronRight = ({ className = "" }: { className?: string }) => (
  <svg className={className} x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32">
    <g transform="translate(0, 0)">
      <path
        d="M11.775.592a.5.5,0,0,0-.7-.092L8.7,2.329a.5.5,0,0,0-.092.7L18.581,16,8.6,28.97a.5.5,0,0,0,.092.7L11.074,31.5a.5.5,0,0,0,.7-.092L23.4,16.305a.5.5,0,0,0,0-.61Z"
        className="fill-current"
      ></path>
    </g>
  </svg>
)

const LinkGlyph = ({ className = "" }: { className?: string }) => (
  <svg className={className} x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64">
    <g transform="translate(0, 0)">
      <path
        d="M28.977,27.141a9.995,9.995,0,0,1,5.145,16.88L24.051,54.092A10,10,0,0,1,9.909,39.95L19.98,29.879a9.943,9.943,0,0,1,1.11-.943,16.108,16.108,0,0,1,.119-4.691,13.92,13.92,0,0,0-4.057,2.805L7.081,37.121a14,14,0,0,0,19.8,19.8L36.951,46.849a13.983,13.983,0,0,0-7.036-23.591A7.962,7.962,0,0,0,28.977,27.141Z"
        className="fill-current"
      ></path>
      <path
        d="M37.121,7.08,27.05,17.151a13.984,13.984,0,0,0,7.033,23.591,8,8,0,0,0,.952-3.879A10,10,0,0,1,29.878,19.98L39.949,9.909A10,10,0,0,1,54.091,24.051L44.02,34.122a10.085,10.085,0,0,1-1.106.941,16.1,16.1,0,0,1-.138,4.7,13.91,13.91,0,0,0,4.072-2.813L56.919,26.879a14,14,0,0,0-19.8-19.8Z"
        className="fill-current"
      ></path>
    </g>
  </svg>
)

const SeriesPostH1: React.FC<React.PropsWithChildren<CommonProps>> = ({ children, className = "" }) => {
  return (
    <h1
      className={cn(
        "font-semibold text-base",
        "whitespace-pre-line tablet:whitespace-nowrap",
        "font-heading",
        "cursor-pointer duration-100",
        className
      )}
    >
      {children}
    </h1>
  )
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof AccordionPrimitive.Trigger>>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <AccordionPrimitive.Header asChild>
        <AccordionPrimitive.Trigger {...props} ref={forwardedRef}>
          {children}
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    )
  }
)

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof AccordionPrimitive.Content> & { isOpen?: boolean }
>(({ children, className = "", isOpen, ...props }, forwardedRef) => {
  return (
    <AccordionPrimitive.Content ref={forwardedRef} {...props} asChild>
      <div
        className={cn(
          "accordion-content",
          "flex flex-col w-full",
          "overflow-x-scroll overflow-y-hidden",
          "",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
})

type AccordionItemProps = React.ComponentProps<typeof AccordionPrimitive.Item> & {
  idx: number
  isOpen?: boolean
  post: BlogPostWithMeta
}
const AccordionItem = ({ value, idx, isOpen, post }: AccordionItemProps) => {
  const renderTableOfContents = (post: BlogPostWithMeta) => {
    // @ts-expect-error
    const tocItems = post?.tableOfContents?.items ?? post?.tableOfContents?.headers?.h2 ?? []

    if (!tocItems.length) return null

    const formattedItems = tocItems.map((item: any) => ({
      id: item.id,
      title: item.title ?? item.text,
      url: item.url ?? `#${item.nodeId}`,
      // ...item, url: item.url.replace(post.slug, "")
    }))

    return (
      <React.Fragment>
        {formattedItems.map((item: any) => {
          return (
            <a key={`${post.slug}-${item.url}`} href={formatBlogLinkFromSlug(post.slug) + item.url}>
              <h2
                className={cn(
                  //
                  "flex flex-row items-center gap-4",
                  "group",
                  "text-base",
                  "hover:text-accent"
                )}
              >
                <LinkGlyph className={cn("w-4 h-4 flex-shrink-0", "group-hover:stroke-accent")} />
                <span className={cn("group-hover:text-accent", "font-heading", "font-semibold")}>{item.title}</span>
              </h2>
            </a>
          )
        })}
      </React.Fragment>
    )
  }

  return (
    <AccordionPrimitive.Item
      value={value}
      className={cn(
        "flex flex-col items-center",
        "overflow-y",
        "w-full",
        //
        ""
      )}
    >
      <AccordionTrigger
        className={cn(
          "accordion-trigger",
          "w-full",
          "flex items-center justify-start",
          "h-full min-h-12",
          //
          "group"
        )}
      >
        <SeriesPostH1
          className={cn(
            "w-full",
            "flex items-center justify-start",
            "h-full min-h-12",
            "max-w-full"
            //
          )}
        >
          <span
            className={cn(
              "flex items-center justify-center flex-row gap-4",
              "xs:max-w-32 xs:min-w-32 w-full",
              "h-full min-h-12",
              "xs:border-r xs:border-r-slate-800"
            )}
          >
            <span>Part {idx + 1}</span>
            <span>
              <ChevronRight
                className={cn(
                  "w-4 h-4",
                  "transition-transform duration-200",
                  "",
                  //
                  ""
                )}
              />
            </span>
          </span>
          <span
            className={cn(
              "hidden xs:flex items-center",
              "ml-4",
              "max-w-full",
              "truncate",
              //
              ""
            )}
          >
            <span className={cn("flex items-center", "whitespace-nowrap", "max-w-full")}>{post.data.title}</span>
          </span>
        </SeriesPostH1>
      </AccordionTrigger>
      <AccordionContent
        isOpen={isOpen}
        className={cn(
          //
          "w-full",
          "p-4",
          "gap-4"
        )}
      >
        <div className="pb-4 pt-0">{renderTableOfContents(post)}</div>
      </AccordionContent>
    </AccordionPrimitive.Item>
  )
}

const createPostPathToOpenMapping = (series: BlogPostWithMeta[]): Record<BlogPostWithMeta["slug"], boolean> => {
  return Object.fromEntries(series.map((post) => [post.slug, false])) as Record<BlogPostWithMeta["slug"], boolean>
}

type PostSeriesListProps = CommonProps &
  React.HTMLAttributes<HTMLDivElement> & {
    title: string
    series: BlogPostWithMeta[]
    upTo?: number
  }
export function PostSeriesList({ title, series, upTo }: PostSeriesListProps) {
  let filteredSeries = series
  try {
    const seriesUpTo = upTo ? series.slice(0, upTo) : series
    filteredSeries = seriesUpTo.filter((post) => parseUtils.isDefined(post?.slug))
  } catch (error) {
    console.log("Error filtering series", error)
    console.dir({ error }, { depth: 4 })
    filteredSeries = series
  }

  // it doesn't actually matter if this has more items than the series
  const defaultState = createPostPathToOpenMapping(series)
  const [openSections, setOpenSections] = React.useState(defaultState)

  const handleOnValueChange = (openPaths: BlogPostWithMeta["slug"][]) => {
    const defaultMapping = createPostPathToOpenMapping(filteredSeries)
    const openMapping = Object.fromEntries(openPaths.map((slug) => [slug, true]))
    const newState = { ...defaultMapping, ...openMapping }

    setOpenSections(newState)
  }

  const allOpenSections = Object.entries(openSections)
    .filter(([, isOpen]) => Boolean(isOpen))
    .map(([slug]) => slug)

  return (
    <div className={cn(maxWidthStyles, "flex flex-col", "")}>
      <h1 className="flex w-full mx-auto">
        <span
          className={cn(
            "inline-block",
            "py-2 px-4",
            "rounded-t",
            "border border-slate-800 border-b-transparent",
            "font-bold text-xl font-heading",
            "bg-even-less-dark text-slate-300",
            "elevate-3",
            //
            ""
          )}
        >
          {title}
        </span>
      </h1>

      <AccordionPrimitive.Root
        type="multiple"
        className={cn(
          "flex flex-col",
          "p-0",
          "bg-even-less-dark text-slate-300",
          "border border-slate-800",
          //
          ""
        )}
        value={allOpenSections}
        onValueChange={handleOnValueChange}
      >
        {filteredSeries.map((post, i) => (
          <AccordionItem value={post.slug} post={post} idx={i} isOpen={openSections[post.slug]} key={post.slug} />
        ))}
      </AccordionPrimitive.Root>
    </div>
  )
}

export default PostSeriesList
