import * as parseUtils from "@/utils/parse-utils"
import { slugify } from "@/utils/slugify"

type LinkArgument = string | undefined | null

type Slug = string
type Category = string
type Tag = string

// if a valid link argument is not provided, just have it go nowhere so links don't break
export const validLinkArgumentOrNowhere = (linkArgument?: LinkArgument, callback?: (v: LinkArgument) => string) =>
  parseUtils.ifDefined(linkArgument, callback) ?? "#"

const kebabCase = (str?: string | null) => (str ? slugify(str) : null)

export function stripBeginningSlashesFromSlug(slug?: Slug | null) {
  if (!slug) return slug
  while (slug.startsWith("/")) {
    slug = slug.slice(1)
  }
  return slug
}

// format links for different locations in the app
export const formatBlogLinkFromSlug = (slug?: Slug | null) =>
  validLinkArgumentOrNowhere(slug, (slug) => `/blog/${stripBeginningSlashesFromSlug(slug)}`)
export const formatCategoryLink = (category?: Category | null) =>
  validLinkArgumentOrNowhere(category, (category) => `/blog/categories/${kebabCase(category)}`)
export const formatTagLink = (tag: Tag | null) =>
  validLinkArgumentOrNowhere(tag, (tag) => `/blog/tags/${kebabCase(tag)}`)

// format get params for any links or api calls
export function objectToGetParams(object: Record<string, string | number | undefined | null>) {
  const params = Object.entries(object)
    .filter(([, value]) => parseUtils.isDefined(value))
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)

  return params.length > 0 ? `?${params.join("&")}` : ""
}
