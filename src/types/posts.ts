import type { CollectionEntry } from "astro:content"

export type PostSchema = CollectionEntry<"posts">

export type IPostData = PostSchema["data"] & {
  title: PostSchema["data"]["title"]
  description: PostSchema["data"]["description"]
  category: PostSchema["data"]["category"]
  image: PostSchema["data"]["image"]
  tags: PostSchema["data"]["tags"]
  dateModified: PostSchema["data"]["dateModified"]
  isDraft: PostSchema["data"]["isDraft"]
  date: PostSchema["data"]["date"]
  // slug: PostSchema["slug"]
  series: PostSchema["data"]["date"]
  published: PostSchema["data"]["published"]
  deprecated: PostSchema["data"]["deprecated"]
  author: PostSchema["data"]["author"]
  rating: PostSchema["data"]["rating"]
  template: PostSchema["data"]["template"]
}

export type BlogPostEntryMeta = {
  prevPost: BlogPostWithMeta | null
  nextPost: BlogPostWithMeta | null
  articlesYouMightLike: { post: BlogPostWithMeta; score: number }[]
}
export type BlogPostWithMeta = PostSchema & {
  meta: BlogPostEntryMeta
  // render: PostSchema["render"]
}
