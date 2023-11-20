import { visit } from "unist-util-visit"
import katex from "katex"
import remarkMath from "remark-math"
import unified from "unified"
import parse from "rehype-parse"

export function renderKatex(options = {}) {
  const pluginOptions = {
    ...options,
    //
  }

  return async function plugin(tree, file) {
    visit(tree, "inlineMath", (node, index) => {
      node.data.hChildren = unified()
        .use(parse, { fragment: true, position: false })
        .parse(
          katex.renderToString(node.value, {
            displayMode: false,
            ...pluginOptions,
          })
        ).children
    })

    visit(tree, "math", (node, index) => {
      node.data.hChildren = unified()
        .use(parse, { fragment: true, position: false })
        .parse(
          katex.renderToString(node.value, {
            displayMode: false,
            ...pluginOptions,
          })
        ).children
    })
  }
}

export const setParserPlugins = () => [remarkMath]
