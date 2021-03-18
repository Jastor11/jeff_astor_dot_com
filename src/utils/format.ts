import { CommonTypes } from "src/types"

export const kebabCase = (str: string) => {
  const result = str.replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, (match: string) => "-" + match.toLowerCase())
  return str[0] === str[0].toUpperCase() ? result.substring(1) : result
}

export const formatCategoryLink = (category: CommonTypes.Category) => kebabCase(category)
export const formatTagLink = (tag: CommonTypes.Tag) => kebabCase(tag)
