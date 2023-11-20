import { visit } from "unist-util-visit"
import { toString } from "mdast-util-to-string"

export function remarkCodeTitlesPlugin(options = {}) {
  const opts = {
    className: options?.className ?? "remark-code-title",
  }

  return function plugin(tree, file) {
    visit(tree, "code", (node, index) => {
      const nodeLang = node.lang ?? ""
      let language = ""
      let title = ""

      const codeContents = toString(node)

      if (nodeLang.includes(":")) {
        const idxOfColon = nodeLang.indexOf(":")
        language = nodeLang.slice(0, idxOfColon)
        title = nodeLang.slice(idxOfColon + 1, nodeLang.length)
      }

      if (!title) return

      if (title.includes("{")) {
        title = title.split("{")[0].trim()
      }

      // example
      // python:title=<span>models/cleaning.py</span>
      // remove extra stuff if need be
      const htmlTitle = title.replace("title=", "")
      const purifiedTitle = htmlTitle
        .replace("<span>", "")
        .replace("</span>", "")
        .replace("<small>", "")
        .replace("</small>", "")

      const titleNode = {
        type: "html",
        value: `<div class="${opts.className}">${htmlTitle}</div>`.trim(),
      }

      tree.children.splice(index, 0, titleNode)
      node.lang = language

      // update frontmatter
      file.data.astro.frontmatter.codeContents = file.data.astro.frontmatter.codeContents ?? {}
      file.data.astro.frontmatter.codeContents[language] = file.data.astro.frontmatter.codeContents[language] ?? {}
      file.data.astro.frontmatter.codeContents[language][purifiedTitle] =
        file.data.astro.frontmatter.codeContents[language][purifiedTitle] ?? []
      file.data.astro.frontmatter.codeContents[language][purifiedTitle].push({ contents: codeContents })

      file.data.astro.frontmatter.codeTitles = file.data.astro.frontmatter.codeTitles ?? {}
      file.data.astro.frontmatter.codeTitles[language] = file.data.astro.frontmatter.codeTitles[language] ?? []
      file.data.astro.frontmatter.codeTitles[language].push(purifiedTitle)
      // Make them unique
      file.data.astro.frontmatter.codeTitles[language] = [...new Set(file.data.astro.frontmatter.codeTitles[language])]
    })
  }
}
