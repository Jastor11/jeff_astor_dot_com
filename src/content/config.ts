import { defineCollection, z } from "astro:content"

export const BlogPostSchemaAttrs = {
  title: z.string(),
  description: z.string().optional(),
  category: z.string().optional(),
  image: z.string().optional(),
  date: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
  dateModified: z
    .string()
    .optional()
    .transform((str) => (str ? new Date(str) : undefined)),
  // slug: z.string(),
  series: z.string().optional(),
  isDraft: z.boolean().optional().default(false),
  published: z.enum(["true", "false"]).optional(),
  deprecated: z.enum(["true", "false"]).optional(),
  author: z.string().optional(),
  rating: z
    .string()
    .optional()
    .transform((str) => (str ? Number(str) : undefined)),
  template: z.string().optional(),
  tags: z.array(z.string()).optional(),
  // isHighSchoolLesson: z.boolean().optional().default(false),
}
export const BlogPostSchema = z.object(BlogPostSchemaAttrs)

const blogPostsCollection = defineCollection({
  type: "content",
  schema: BlogPostSchema,
})

export const collections = { posts: blogPostsCollection }
