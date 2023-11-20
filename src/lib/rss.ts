// import rss, { pagesGlobToRssItems } from "@astrojs/rss"
// import { getCollection } from "astro:content"
import rss from "@astrojs/rss"
import { config } from "@/core/config"
import { formatBlogLinkFromSlug } from "./links"
import { getPublishedBlogPosts } from "./blog-posts"

export async function createRSSItems() {
  const posts = await getPublishedBlogPosts()

  return rss({
    stylesheet: "/rss/styles.xsl",
    title: config.site_title,
    description: config.site_description,
    site: config.site_url,
    items: posts
      .map((post) => {
        return {
          title: post.data.title,
          slug: post.slug,
          link: formatBlogLinkFromSlug(post.slug),
          pubDate: post.data.date,
          author: "Jeff Astor",
          categories: [post.data.category].filter((s) => Boolean(s)) as string[],
          // content
        }
      }),
  })
}
