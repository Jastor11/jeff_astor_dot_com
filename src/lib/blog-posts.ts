import type { BlogPostWithMeta } from "@/types/posts"
import { getCollection, getEntry } from "astro:content"
import { PostsYouMightAlsoLikeFactory } from "@/services/SimilarPosts"
import { slugify } from "@/utils/slugify"

type Category = BlogPostWithMeta["data"]["category"]
type Tags = BlogPostWithMeta["data"]["tags"]

type Defined<T> = T extends undefined ? never : T
type Tag = Defined<Tags>[number]

export async function getBlogPostsCollection() {
  const posts = await getCollection("posts")

  return posts
}

/**
 * Fetch all published blog posts, sorted by date and add metadata for similar posts, etc.
 *
 * TODO: Ensure that we attach deprecated posts to their active conterpart
 *
 * // returns {Promise<CollectionEntry<"posts">[]>}
 */
export async function getPublishedBlogPosts() {
  const publishedBlogEntries = await getCollection("posts", ({ data }) => {
    return !data.isDraft && data.deprecated !== "true" && data.published === "true"
  })

  const publishedBlogEntriesInOrder = [...publishedBlogEntries].sort((a, b) => {
    return b.data.date.getTime() - a.data.date.getTime()
  })

  const publishedBlogEntriesWithSimiliarPosts: BlogPostWithMeta[] = publishedBlogEntriesInOrder.map(
    (currentPost, idx) => {
      const similarPostsFactory = new PostsYouMightAlsoLikeFactory(publishedBlogEntriesInOrder, currentPost)
      const similarPosts = similarPostsFactory
        .setCategory(currentPost.data.category)
        .setCategoryMatchScore(2.5)
        .setTags(currentPost.data.tags ?? [])
        .setTagMatchScore(1)
        .getArticlesYouMightLike()

      const p = {
        ...currentPost,
        meta: {
          prevPost: idx === 0 ? null : publishedBlogEntriesInOrder[idx - 1],
          nextPost: idx === publishedBlogEntriesInOrder.length - 1 ? null : publishedBlogEntriesInOrder[idx + 1],
          articlesYouMightLike: similarPosts,
        },
      } as BlogPostWithMeta

      return p
    }
  )

  return publishedBlogEntriesWithSimiliarPosts
}

export function extractUniqueTagsFromBlogPosts(posts: BlogPostWithMeta[]): Tag[] {
  const tags = new Set<string>()

  for (const post of posts) {
    const postTags = post.data.tags ?? []
    for (const tag of postTags) {
      tags.add(tag)
    }
  }

  return [...tags]
}

export function getPostsByTag(posts: BlogPostWithMeta[], slugifiedTag: Tag) {
  return posts.filter((post) => {
    const slugifiedTags = (post.data.tags ?? [])?.map((tag) => slugify(tag))
    return slugifiedTags.includes(slugifiedTag)
  })
}

export function extractUniqueCategoriesFromBlogPosts(posts: BlogPostWithMeta[]): string[] {
  const categories = new Set<string>()

  for (const post of posts) {
    const category = post.data.category
    if (category) {
      categories.add(category)
    }
  }

  return [...categories]
}

export function getPostsByCategory(posts: BlogPostWithMeta[], slugifiedCategory: Category) {
  return posts.filter((post) => {
    if (!post.data.category) return false
    const slugifiedPostCategory = slugify(post.data.category)
    return slugifiedPostCategory === slugifiedCategory
  })
}

export function extractUniqueSeriesFromBlogPosts(posts: BlogPostWithMeta[]) {
  const series = new Set<string>()

  for (const post of posts) {
    const postSeries = post.data.series
    if (postSeries) {
      series.add(postSeries)
    }
  }

  return [...series]
}

export function getPostsForSeries(posts: BlogPostWithMeta[], seriesSlug: string) {
  return posts.filter((post) => {
    return post.data.series === seriesSlug
  })
}

export function getFastAPISeriesPosts(posts: BlogPostWithMeta[]) {
  const series = "up-and-running-with-fastapi" as const
  return getPostsForSeries(posts, series)
}
