import React from "react"
import Highlight, { defaultProps, Language } from "prism-react-renderer"
import styled from "styled-components"

const StyledPre = styled.pre``

let highlightStart = false
const highlightClassName = "gatsby-highlight-code-line"

const highlightLine = (lineArray: any[], lineProps: any) => {
  let shouldExclude = false

  lineArray.forEach((line: any, i: number) => {
    const content = line.content

    // Highlight lines with "// highlight-line" or "# highlight-line"
    if (
      content.replace(/\s/g, "").includes("//highlight-line") ||
      content.replace(/\s/g, "").includes("#highlight-line")
    ) {
      lineProps.className = `${lineProps.className} ${highlightClassName}`
      line.content = content
        .replace("// highlight-line", "")
        .replace("//highlight-line", "")
        .replace("#highlight-line", "")
        .replace("# highlight-line", "")
    }

    // Stop highlighting
    if (
      !!highlightStart &&
      (content.replace(/\s/g, "") === "//highlight-end" ||
        content.replace(/\s/g, "") === "// highlight-end" ||
        content.replace(/\s/g, "") === "#highlight-end" ||
        content.replace(/\s/g, "") === "# highlight-end")
    ) {
      highlightStart = false
      shouldExclude = true
    }

    // Start highlighting after "//highlight-start" or "# highlight-start"
    if (
      content.replace(/\s/g, "") === "//highlight-start" ||
      content.replace(/\s/g, "") === "// highlight-start" ||
      content.replace(/\s/g, "") === "#highlight-start" ||
      content.replace(/\s/g, "") === "# highlight-start"
    ) {
      highlightStart = true
      shouldExclude = true
    }
  })

  // Highlight lines between //highlight-start & //highlight-end
  if (!!highlightStart) {
    lineProps.className = `${lineProps.className} ${highlightClassName}`
  }

  return shouldExclude
}

interface ICodeBlockPre {
  setText: (str: string) => void
  className?: string
  style: Record<string, any>
  // tokens: Token[]
  tokens: any[]
  getLineProps?: any
  getTokenProps?: any
}
const CodeBlockPre: React.FC<ICodeBlockPre> = ({
  className,
  setText,
  style,
  tokens,
  getLineProps,
  getTokenProps,
  ...props
}) => {
  const [initialized, setInitialized] = React.useState(false)

  const getCodeText = (tokens: any) => {
    return tokens
      .map((line: any, i: number) => {
        let codeLine = ""
        if (!highlightLine(line, getLineProps({ line, key: i }))) {
          line.forEach((token: any, key: any) => (codeLine += getTokenProps({ token, key }).children))
        }
        return codeLine
      })
      .join("\n")
  }

  React.useEffect(() => {
    if (!initialized) {
      // set clipboard text
      setText(getCodeText(tokens))
      setInitialized(true)
    }
  })

  return (
    <StyledPre className={className} style={{ ...style }} {...props}>
      <code>
        {tokens.map((line, i) => {
          const lineProps = getLineProps({ line, key: i })
          const shouldExclude = highlightLine(line, lineProps)
          return (
            !shouldExclude && (
              <div {...lineProps} key={i}>
                {line.map((token: any, key: any) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            )
          )
        })}
      </code>
    </StyledPre>
  )
}

interface IPostCodeBlock {
  setText: (text: string) => void
  className?: string
  children: string
}
const PostCodeBlock: React.FC<IPostCodeBlock> = ({ children, setText, className = "", ...props }) => {
  const language = className.replace(/language-/, "")

  return (
    <Highlight {...defaultProps} code={children} language={language as Language} theme={undefined}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <CodeBlockPre
          className={className}
          style={style}
          tokens={tokens}
          getLineProps={getLineProps}
          getTokenProps={getTokenProps}
          setText={setText}
          {...props}
        />
      )}
    </Highlight>
  )
}

export default PostCodeBlock
