import React from "react"
import { usePostEdges } from "src/hooks"
import { BlogTopics, PostPreview } from "src/components"
import styled from "styled-components"
import media from "src/utils/media"
import { PostEdge } from "src/types/post"

const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--navbar-height));
  max-width: 100vw;
  width: 100%;
  background: var(--color-dark);

  ${media.large`
    padding: 0;  
  `}
`
const BlogListingWrapper = styled.div`
  width: 100%;
  padding: 0 5px;
  height: calc(100vh - var(--navbar-height) - 75px);
  overflow-y: scroll;

  ${media.mobile`
    padding: 0 10px;
  `}
`
const BlogListing = styled.div`
  margin: 0 auto;
  width: 100%;

  ${media.mobile`
    padding: 0 10px;
  `}

  ${media.large`
    width: 800px;
  `}
`

const BlogTopicSelectionContainer = styled.div`
  height: 75px;
`

const extractCategoryFromPostEdge = (edge: PostEdge): string => edge?.node?.frontmatter?.category

const Blog: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = React.useState("all")
  const data = usePostEdges()
  const postEdges = data.allMdx.edges

  const topics = React.useMemo(() => {
    if (!postEdges) return []
    const uniqueTopics = [...new Set(postEdges.map((edge) => extractCategoryFromPostEdge(edge)))]
    uniqueTopics.sort()
    return uniqueTopics
  }, [postEdges])

  const filteredPostEdges = React.useMemo(() => {
    if (selectedTopic === "all") return postEdges

    return postEdges.filter((edge) => extractCategoryFromPostEdge(edge) === selectedTopic)
  }, [selectedTopic, postEdges])

  return (
    <BlogContainer>
      <BlogTopicSelectionContainer>
        <BlogTopics selectedTopic={selectedTopic} selectTopic={(t) => setSelectedTopic(t)} topics={topics} />
      </BlogTopicSelectionContainer>

      <BlogListingWrapper>
        <BlogListing>
          {filteredPostEdges.map(({ node }) => (
            <PostPreview postNode={node} key={node.fields.slug} />
          ))}
        </BlogListing>
      </BlogListingWrapper>
    </BlogContainer>
  )
}

export default Blog
