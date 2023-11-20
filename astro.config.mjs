import * as Path from "node:path"
import * as url from "node:url"

import { defineConfig } from "astro/config"

import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import robotsTxt from "astro-robots-txt"
import prefetch from "@astrojs/prefetch"
import react from "@astrojs/react"
import { rehypeHeadingIds } from "@astrojs/markdown-remark"
import { readingTimeRemarkPlugin } from "./src/lib/mdx-plugins/reading-time.mjs"
import { remarkCodeTitlesPlugin } from "./src/lib/mdx-plugins/remark-code-titles.mjs"
import { rehypeSlug } from "./src/lib/mdx-plugins/rehype-slug.mjs"
import { rehypeAutolinkHeadings } from "./src/lib/mdx-plugins/rehype-autolink-headings.mjs"
import { modifyCodeBlocks } from "./src/lib/mdx-plugins/modify-code-blocks.mjs"
import { rehypeKatex } from "./src/lib/mdx-plugins/rehype-katex.mjs"
import rehypePrettyCode from "rehype-pretty-code"
import remarkMath from "remark-math"

import { theme as moonlightTwo } from "./src/lib/mdx-plugins/shiki/custom-moonlight-theme.mjs"

/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
  keepBackground: false,

  onVisitLine(node) {
    // if (node.children.length === 0) {
    //   node.children = [
    //     {
    //       type: "text",
    //       value: " ",
    //     },
    //   ]
    // }
  },
  onVisitHighlightedLine(node) {
    if (!node.properties.className) {
      node.properties.className = []
    }
    node.properties.className.push("highlighted")
  },
  onVisitHighlightedWord(node) {
    if (!node.properties.className) {
      node.properties.className = []
    }
    node.properties.className = ["word"]
  },
  tokensMap: {},
}

const __dirname = Path.dirname(url.fileURLToPath(import.meta.url))

// https://astro.build/config
export default defineConfig({
  site: "https://jeffastor.com",
  trailingSlash: "ignore",
  redirects: {
    "/app/about/": "/about",
    "/app/blog/": "/blog",
    "/app/contact/": "/contact",
  },
  //
  integrations: [
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: { theme: moonlightTwo },
      remarkPlugins: [
        //
        remarkMath,
        readingTimeRemarkPlugin,
        remarkCodeTitlesPlugin,
      ],
      rehypePlugins: [
        //
        rehypeHeadingIds,
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeKatex,
        modifyCodeBlocks,
        [rehypePrettyCode, prettyCodeOptions],
      ],
      remarkRehype: { footnoteLabel: "Footnotes" },
      gfm: true,
      //
    }),
    sitemap(),
    tailwind(),
    robotsTxt(),
    prefetch({
      // throttle: 3,
    }),
    react({
      experimentalReactChildren: true,
    }),
  ],
  vite: {
    resolve: {
      alias: {
        "@": Path.resolve(__dirname, "./src"),
      },
    },
  },
})
