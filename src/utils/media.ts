import { css, FlattenSimpleInterpolation } from "styled-components"

export type MediaQuerySizes =
  | "mini"
  | "stupidSmall"
  | "mobileOnly"
  | "mobile"
  | "xs"
  | "small"
  | "medium"
  | "tablet"
  | "large"
  | "desktop"
  | "xl"

const sizes: Record<string, string> = {
  large: "1300px",
  tablet: "997px",
  medium: "700px",
  small: "550px",
  mobile: "250px",
}

// Iterate through the sizes and create a media template
const mediaTemplates = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (literals: TemplateStringsArray, ...placeholders: any[]) =>
    css`
      @media only screen and (min-width: ${sizes[label]}) {
        ${css(literals, ...placeholders)}
      }
    `.join("")
  return acc
}, {} as Record<keyof typeof sizes, (l: TemplateStringsArray, ...p: any[]) => FlattenSimpleInterpolation | string>)

mediaTemplates.mobileOnly = (...args) => css`
  @media only screen and (max-width: 550px) {
    ${css(...args)}
  }
`

mediaTemplates.stupidSmall = (...args) => css`
  @media only screen and (max-width: 325px) {
    ${css(...args)}
  }
`

export default mediaTemplates
