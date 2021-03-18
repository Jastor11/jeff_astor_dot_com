import React from "react"
import styled from "styled-components"
import media from "src/utils/media" // '../../../utils/mediaQueryTemplates'

const BlogTopicsList = styled.ul`
  display: flex;
  justify-content: flex-start;
  height: 60px;
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  margin: 10px auto 60px auto;
  background: transparent;
  -moz-border-bottom: solid 4px white;
  border-bottom: solid 2px white;
  margin-bottom: 3em;
  white-space: nowrap;
  padding: 0 2px;

  ${media.tablet`
    /* justify-content: center;   */
  `}
`
const BlogFilterItem = styled.li<{ $isActive?: boolean }>`
  height: 60px;
  transition: all 0.15s ease-in-out;
  border-bottom: solid 4px transparent;
  border-top: solid 4px transparent;
  padding: 10px 0;
  font-weight: 500;
  color: white;
  font-size: 16px;
  margin: 0 10px;
  cursor: pointer;

  ${(props) =>
    props.$isActive &&
    `
      color: var(--color-highlight);
      border-bottom: solid 6px var(--color-highlight);  
  `}

  &:hover {
    color: var(--color-highlight);
  }
`

interface IBlogTopics {
  topics: string[]
  selectTopic: (topic: string) => void
  selectedTopic: string
}
const BlogTopics: React.FC<IBlogTopics> = ({ topics, selectTopic, selectedTopic }) => {
  return (
    <BlogTopicsList>
      {topics.map((topic) => (
        <BlogFilterItem key={topic} $isActive={selectedTopic === topic} onClick={() => selectTopic(topic)}>
          {topic}
        </BlogFilterItem>
      ))}
    </BlogTopicsList>
  )
}

export default BlogTopics

// const BlogTopics: React.FC = ({
//   allFilters,
//   changeFilter,
//   currentFilter
// }) => {
//   return (
//     <BlogFilterList>
//       {
//         allFilters.map(filtr => (
//           <BlogFilterItem
//             key={filtr}
//             active={currentFilter === filtr}
//             onClick={() => changeFilter(filtr)}
//           >
//             { filtr }
//           </BlogFilterItem>
//         ))
//       }
//     </BlogFilterList>
//   )
// }

// export default BlogFilter
