import { visit } from "unist-util-visit"

const isDefined = (val) => typeof val !== "undefined" && val !== null

function commentTextExistsInValue(val, commentText) {
  const possibles = [
    `# ${commentText}`, // python
    `#${commentText}`, // python
    `// ${commentText}`, // javascript
    `//${commentText}`, // javascript
    `/* ${commentText} */`, // js and css
    `/*${commentText} */`, // js and css
    `/* ${commentText}*/`, // js and css
    `/*${commentText}*/`, // js and css
  ]

  return possibles.some((possible) => val.includes(possible))
}

const valIsHighlightNextLineComment = (val) => commentTextExistsInValue(val, "highlight-next-line")
const valIsHighlightStartLineComment = (val) => commentTextExistsInValue(val, "highlight-start")
const valIsHighlightEndLineComment = (val) => commentTextExistsInValue(val, "highlight-end")
const valIsHighlightLineComment = (val) => commentTextExistsInValue(val, "highlight-line")

/* Probably could improve this with recursion, but haven't needed it as of now */
function lineHasSpecificCommentText(lineNode, callback, removeNode = false) {
  const lineChildren = lineNode.children ?? []
  if (lineChildren.length === 0) return false

  for (let i = 0; i < lineChildren.length; i++) {
    const node = lineChildren[i]

    let val = undefined

    if (node.type === "text") {
      val = node.value
      if (callback(val)) {
        if (removeNode) lineNode.splice(i, 1)
        return true
      }
    } else if (node.tagName === "span") {
      if (node.children.length > 0) {
        for (let j = 0; j < node.children.length; j++) {
          const child = node.children[j]
          // for (const child of node.children) {
          if (child.type === "text") {
            val = child.value
            if (callback(val)) {
              if (removeNode) node.children.splice(j, 1)
              return true
            }
          }
        }
      }
    }
  }
}

const lineHasEndHighlightComment = (lineNode) =>
  lineHasSpecificCommentText(lineNode, valIsHighlightEndLineComment, true)
const lineHasStartHighlightComment = (lineNode) =>
  lineHasSpecificCommentText(lineNode, valIsHighlightStartLineComment, true)
const lineHasHighlightNextLineComment = (lineNode) =>
  lineHasSpecificCommentText(lineNode, valIsHighlightNextLineComment, true)
const lineHasHighlightLineComment = (lineNode) => lineHasSpecificCommentText(lineNode, valIsHighlightLineComment, true)

/** @deprecated */
function properlyFormatFirstLineOfCode(node) {
  // handle properly formatting the first line of code
  const firstChild = node.children[0]
  if (firstChild.tagName === "span" && firstChild.properties?.className?.includes?.("line")) {
    const childrenOfFirstChild = firstChild.children ?? []

    if (childrenOfFirstChild.length > 0) {
      const startingLineChildren = childrenOfFirstChild[0]?.children ?? [] // should be the children of a span element
      // the first child of this span should be a text with a value that can be modified
      const startingLineTextNode = startingLineChildren?.[0]
      if (startingLineTextNode && startingLineTextNode?.type === "text") {
        // NOTE: No longer need this after properly formatting code blocks with `rehype-pretty-code`
        // startingLineTextNode.value = "\n" + (startingLineTextNode.value ?? "")
      }
    }
  }
}

const isLineNode = (node) => node.tagName === "span" && node.properties?.className?.includes?.("line")

const addClassNameToNode = (node, className) => {
  // NOTE: Maybe don't do this?
  if (!node) return
  // This part is fine
  if (!node.properties) {
    node.properties = {}
  }
  if (!node.properties.className) {
    node.properties.className = []
  }
  node.properties.className.push(className)
}

export function modifyCodeBlocks(options = {}) {
  const opts = {
    className: options?.className ?? "code-block",
  }

  return async function plugin(tree, file) {
    visit(tree, "element", (node, idx) => {
      if (node.tagName === "code") {
        if (node?.children?.length > 0) {
          // properlyFormatFirstLineOfCode(node)

          // collect idxs of lines to remove at end to prevent index issues
          const indexesOfLinesToRemove = []

          const indexesOfLineNodes = []
          for (let i = 0; i < node.children.length; i++) {
            if (isLineNode(node.children[i])) {
              indexesOfLineNodes.push(i)
            }
          }

          for (let i = 0; i < indexesOfLineNodes.length; i++) {
            // NOTE: Only use `i` to access the `indexesOfLineNodes` array
            // NOTE: Only use idx to access node.children (if you want to get a line node)
            const idx = indexesOfLineNodes[i]
            const lineNode = node.children[idx]
            const lineChildren = lineNode.children ?? []

            // ensure there's at least an empty text node in the empty line
            if (lineChildren.length === 0) {
              lineNode.children = [
                {
                  type: "text",
                  value: " ",
                  properties: {
                    className: ["empty-line-text"],
                  },
                },
              ]
              // don't process any further
              continue
            }

            // check highlighting for this line

            // first, see if we need to highlight this line
            if (lineHasHighlightLineComment(lineNode)) {
              addClassNameToNode(lineNode, "highlighted")
            }

            // next, see if we need to highlight the next line
            if (lineHasHighlightNextLineComment(lineNode)) {
              const nextLineNodeIdx = indexesOfLineNodes[i + 1]
              const nextLineNode = node.children[nextLineNodeIdx]
              if (isDefined(nextLineNode)) {
                addClassNameToNode(nextLineNode, "highlighted")
                // remove the current line
                indexesOfLinesToRemove.push(idx)
                addClassNameToNode(lineNode, "removed")
              }
            }

            // next, see if we need to start highlighting
            // see if we need to start highlighting
            if (lineHasStartHighlightComment(lineNode)) {
              let indexesPointer = i + 1
              let endLineIdx = indexesOfLineNodes[indexesPointer]
              let foundEnd = false

              // try and find the line where the highlighting ends
              while (indexesPointer < indexesOfLineNodes.length) {
                const nextLineNode = node.children[endLineIdx]
                if (lineHasEndHighlightComment(nextLineNode)) {
                  foundEnd = true
                  break
                } else {
                  // highlight all lines in between
                  addClassNameToNode(nextLineNode, "highlighted")
                }
                indexesPointer++
                endLineIdx = indexesOfLineNodes[indexesPointer]
              }

              if (!foundEnd) {
                console.dir({ file, node }, { depth: 10 })
                throw new Error("Didn't find an end to the highlighting!")
              }

              // remove current line node and end line
              addClassNameToNode(lineNode, "removed")
              indexesOfLinesToRemove.push(idx)
              addClassNameToNode(node.children[endLineIdx], "removed")
              indexesOfLinesToRemove.push(endLineIdx)
            }
          }
        }
      }
    })
  }
}
