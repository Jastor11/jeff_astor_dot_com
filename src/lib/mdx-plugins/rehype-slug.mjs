/**
 * @typedef Options
 *   Configuration (optional).
 * @property {string} [prefix='']
 *   Prefix to add in front of `id`s.
 */

import Slugger from "github-slugger"
import { hasProperty } from "hast-util-has-property"
import { headingRank } from "hast-util-heading-rank"
import { toString } from "mdast-util-to-string"
import { visit } from "unist-util-visit"

const slugs = new Slugger()

/**
 * Plugin to add `id`s to headings.
 *
 * @type {import('unified').Plugin<[Options?]|Array<void>, Root>}
 */
export function rehypeSlug(options = {}) {
  const opts = {
    prefix: options?.prefix ?? "",
  }

  return function plugin(tree, file) {
    slugs.reset()

    let totalHeaders = 0
    const headers = {
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
    }

    visit(tree, "element", (node, idx) => {
      const rank = headingRank(node)
      if (rank) {
        totalHeaders += 1

        if (node.properties && !hasProperty(node, "id")) {
          const nodeId = opts.prefix + slugs.slug(toString(node))
          node.properties.id = nodeId
          headers[`h${rank}`].push({ id: totalHeaders, text: getInnerText(node), nodeId })
        } else {
          headers[`h${rank}`].push({ id: totalHeaders, text: getInnerText(node), nodeId: node.properties.id })
        }
      }
    })

    // update frontmatter
    if (totalHeaders > 0) {
      file.data.astro.frontmatter.tableOfContents = file.data.astro.frontmatter.tableOfContents ?? {}
      file.data.astro.frontmatter.tableOfContents.totalHeaders = totalHeaders
      file.data.astro.frontmatter.tableOfContents.headers = headers
    }
  }
}

function getInnerText(node) {
  let text = ""

  if (node.type === "text") {
    text += node.value || ""
  }

  if (node.children) {
    let parent = node
    for (let child of parent.children) {
      text += getInnerText(child)
    }
  }

  return text
}
