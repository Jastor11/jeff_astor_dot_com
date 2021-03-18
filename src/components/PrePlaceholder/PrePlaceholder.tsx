import React from "react"
import { ClipboardTrigger, ExpandHorizontal } from "src/components"
import styled from "styled-components"

const StyledPrePlaceholder = styled.div<{ $expanded?: boolean }>`
  position: relative;

  /**
   * Add back the container background-color, border-radius, padding, margin
   * and overflow that we removed from <pre>.
   */
   &.gatsby-highlight {
    background: #292b3a;  
    padding: 1.2rem;
    border-radius: 0px;
    overflow: auto;
    margin: 4rem 0;
    clip-path: polygon(0 0, 100% 0%, 100% calc(100% - 30px), 0% 100%);  
    padding-bottom: 40px;
    width: unset;
  
    font-size: 1.2rem;
    font-size: 1rem;
    font-size: 1.025rem;

    margin: 4rem auto;
    transition: all 0.3s ease;

    ${(props) =>
      props.$expanded
        ? `
      max-width: 100vw;
    `
        : `
      max-width: var(--code-max-width);
    `}
  
  /**
   * Remove the default PrismJS theme background-color, border-radius, margin,
   * padding and overflow.
   * 1. Make the element just wide enough to fit its content.
   * 2. Always fill the visible space in .gatsby-highlight.
   * 3. Adjust the position of the line numbers
   */
  &.gatsby-highlight pre[class*="language-"] {
    padding-right: 15px;
    overflow: initial;
    float: left; /* 1 */
    min-width: 100%; /* 2 */
  }
  
  &.gatsby-highlight pre[class*="language-"].line-numbers {
    padding-left: 2.8em; /* 3 */
  }
  &.gatsby-highlight .line-numbers-rows {
    margin: 1rem 0;  /* move the numbers in line with the code cuz we added padding */
  }
  
  .gatsby-highlight-code-line {
    background-color: #494b5a;
    display: block;
    margin-right: calc(-1em - 18px);
    margin-left: -1em;
    margin-left: -2.57rem;
    padding-right: 1em;
    padding-left: 0.75em;
    padding-left: 1.95rem;
    border-left: 0.6em solid var(--color-highlight);
  }
  
  @media screen and (max-width: 1000px) {
    :root, body {
      --code-max-width: 800px;
    }
  }
  
  @media screen and (max-width: 900px) {  
    &.gatsby-highlight {
        font-size: 1.1rem;
        font-size: 1rem;
        font-size: 1.025rem;
    }
  }
  
  @media screen and (max-width: 550px) {
    &.gatsby-highlight {
        font-size: 0.95rem;
    }
    .gatsby-highlight-code-line {
      padding-left: 1.98rem;
    }  
  }

  code[class*="language-"],
  pre[class*="language-"] {
     color: #eff0f6;
     background: none;
     font-family: 'Dank Mono', "IBM Plex Mono", Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
     text-align: left;
     white-space: pre;
     word-spacing: normal;
     word-break: normal;
     word-wrap: normal;
     line-height: 1.5;
 
     -moz-tab-size: 4;
     -o-tab-size: 4;
     tab-size: 4;
 
     -webkit-hyphens: none;
     -moz-hyphens: none;
     -ms-hyphens: none;
     hyphens: none;
  }
  
  pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,
  code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {
     text-shadow: none;
     background: #4f5987;
  }
  
  pre[class*="language-"]::selection, pre[class*="language-"] ::selection,
  code[class*="language-"]::selection, code[class*="language-"] ::selection {
     text-shadow: none;
     background: #4f5987;
  }
  
  @media print {
     code[class*="language-"],
     pre[class*="language-"] {
         text-shadow: none;
     }
  }
  
  /* Code blocks */
  pre[class*="language-"] {
      padding: 1rem;
      margin: .5rem 0;
      overflow: auto;
  }

  /* Inline blocks */
  :not(pre) > code {
    padding: .1rem .1rem .2rem .1rem;
  }

  .token-line:not(:last-child) {
    min-height: 1rem;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
      font-style: italic;
      color: #a5abca;
  }

  .namespace {
      opacity: .7;
  }

  .token.property,
  .token.decorator,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.deleted {
      color: #ff476e;
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
      color: #39EFCA
  }

  .token.operator,
  .token.entity,
  .token.url,
  .token.boolean,
  .language-css .token.string,
  .style .token.string {
      color: #ffca7a;
  }

  .token.punctuation {
      color: #8B8BA7;
      color: #ABABB7;
  }

  .token.decorator {
      color: #ff476e;
  }

  .token.atrule,
  .token.attr-value,
  .token.keyword {
      color: #94bfff;
  }

  .token.function,
  .token.class-name {
      color: #ff476e;
  }

  .token.regex,
  .token.important,
  .token.variable {
      color: #ffee7a;
  }

  /* Extra custom stuff */
  .token.boolean {
      color: rgb(252, 174, 245);
  }

  .token.string.triple-quoted-string {
      color:  rgba(14, 211, 255, 0.9);
  }

  .token.important,
  .token.bold {
      font-weight: bold;
  }
  .token.italic {
      font-style: italic;
  }

  .token.entity {
      cursor: help;
  }
`

const Wrapper = styled.div`
  position: relative;
  margin-right: 20px;
`

const StyledIconExpandHorizontal = styled((props) => <ExpandHorizontal {...props} />)`
  position: absolute;
  top: -22.5px;
  right: 0;
  display: flex;
  align-items: center;
  background: dodgerblue;
  color: white;
  border-radius: 0.25rem;
  height: 44.5px;
  padding-right: 0.3rem;
  padding-left: 0.3rem;
  cursor: pointer;

  @media screen and (max-width: 900px) {
    display: none;
  }
`

interface IPrePlaceholder {
  className?: string
  children?: React.ReactElement[]
}
const PrePlaceholder: React.FC<IPrePlaceholder> = ({ children, className = "" }) => {
  const [text, setText] = React.useState<string>("")
  const [expanded, setExpanded] = React.useState<boolean>(false)

  const childrenWithProps = React.Children.map(children, (child) =>
    child ? React.cloneElement(child, { setText }) : null
  )

  return (
    <StyledPrePlaceholder className={`${className} gatsby-highlight`} $expanded={expanded}>
      <Wrapper>
        <ClipboardTrigger getText={() => text}></ClipboardTrigger>
      </Wrapper>
      <Wrapper>
        <StyledIconExpandHorizontal onClick={() => setExpanded(!expanded)} stroke="white" />
      </Wrapper>
      {childrenWithProps}
    </StyledPrePlaceholder>
  )
}

export default PrePlaceholder

// export default function PrePlaceholder({ children, ...props }) {
//   const [text, setText] = React.useState("")
//   const [expanded, setExpanded] = React.useState("")

//   const childrenWithProps = React.Children.map(children, (child) => React.cloneElement(child, { setText }))

//   return (
//     <>
//       <StyledPrePlaceholder className="gatsby-highlight" {...props} $expanded={expanded}>
//         <Wrapper>
//           <ClipboardTrigger getText={() => text}></ClipboardTrigger>
//         </Wrapper>
//         <Wrapper>
//           <StyledIconEnlargeHorizontal onClick={() => setExpanded(!expanded)} stroke="white" />
//         </Wrapper>
//         {childrenWithProps}
//       </StyledPrePlaceholder>
//     </>
//   )
// }
