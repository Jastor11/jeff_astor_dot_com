import { Category, ID, Slug, Datetime, Tag } from "./common"

export interface WordCount {
  sentences?: number
  paragraph?: number
  words?: number
}
export interface PostFields {
  slug: Slug
  date: Datetime
}
export interface PostFrontmatter {
  image?: string
  slug: Slug
  dateModified?: Datetime
  deprecated?: boolean
  published?: boolean
  title: string
  description?: string
  tags: Tag[]
  date: Datetime
  category: Category
  series?: string
  id?: ID
}
export interface PostNode {
  fields: PostFields
  frontmatter: PostFrontmatter
  excerpt?: string
  body?: any
  timeToRead?: number | string
}
export interface PostEdge {
  node: PostNode
}
export interface FormattedPost {
  slug: Slug
  image?: string
  dateModified?: Datetime
  deprecated?: boolean
  published?: boolean
  title: string
  description?: string
  tags: Tag[]
  date: Datetime
  category: Category
  series?: string
  id?: ID
}

export interface PostSeriesNode {
  excerpt: string
  fields: PostFields
  frontmatter: {
    title: string
    series: string
  }
  timeToRead: number
  wordCount: WordCount
  tableOfContents: {
    items: Array<{ url: string; title: string }>
  }
}
export interface PostSeries {
  edges: Array<{ node: PostSeriesNode }>
}
export interface FormattedSeriesPost {
  path: Slug
  date: Datetime
  title: string
  series: string
  excerpt: string
  tableOfContents: {
    items: Array<{ url: string; title: string }>
  }
  timeToRead: number
  wordCount: WordCount
}
