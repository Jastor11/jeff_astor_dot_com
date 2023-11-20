import type { BlogPostWithMeta } from "@/types/posts"

type Defined<T> = T extends undefined ? never : T
type Category = BlogPostWithMeta["data"]["category"]
type Tags = BlogPostWithMeta["data"]["tags"]
type Tag = Defined<Tags>[number]
type Slug = BlogPostWithMeta["slug"]

type Post = Omit<BlogPostWithMeta, "meta"> & { slug: Slug }

export class PostsYouMightAlsoLikeFactory {
  private maxRecommendations = 3
  private tags: Tag[]
  private tagMatchScore = 1
  private category: Category | null
  private categoryMatchScore = 2.5
  private currentPost: Post
  private posts: Post[]

  public constructor(posts: Post[], currentPost: Post) {
    this.currentPost = currentPost
    this.posts = posts.filter((post) => post.slug !== currentPost.slug)

    this.category = currentPost ? this.currentPost.data.category : null
    this.tags = currentPost ? this.currentPost.data.tags ?? [] : []
  }

  public setMaxRecommendations(maxRecs: number) {
    this.maxRecommendations = maxRecs
    return this
  }

  public setCategory(currentCategory: Category) {
    this.category = currentCategory
    return this
  }

  public setCategoryMatchScore(score: number) {
    this.categoryMatchScore = score
    return this
  }

  public setTags(tagsList: Tag[]) {
    this.tags = tagsList
    return this
  }

  public setTagMatchScore(score: number) {
    this.tagMatchScore = score
    return this
  }

  public calculateSimilarityScoreForNode(post: Post) {
    let score = 0

    const category = post.data.category
    const tags = post.data.tags ?? []

    if (category === this.category) {
      score += this.categoryMatchScore
    }

    for (const tag of tags) {
      if (this.tags.includes(tag)) {
        score += this.tagMatchScore
      }
    }

    return score
  }

  public calculateSimilarityScores() {
    return Object.fromEntries(
      this.posts.map((post) => {
        const slug = post.slug
        const similarityScore = this.calculateSimilarityScoreForNode(post)
        return [slug as Slug, { post, score: similarityScore }]
      })
    ) as Record<Slug, { post: Post; score: number }>
  }

  public getArticlesYouMightLike() {
    const scoresMapping = this.calculateSimilarityScores()
    const postsWithScore = Object.values(scoresMapping)
    const postsOrderedByScore = [...postsWithScore].sort((a, b) => b.score - a.score)
    return postsOrderedByScore.slice(0, this.maxRecommendations)
  }
}
