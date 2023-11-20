import type { CSSProperties } from "react"

// export type Primitive = number | string | boolean | Date
// export type AcceptableObjectKey = number | string | symbol

export type CommonProps = {
  className?: string
  style?: CSSProperties
  "aria-label"?: string
  "data-testid"?: string
}
