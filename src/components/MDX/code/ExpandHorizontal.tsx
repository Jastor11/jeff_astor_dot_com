import type * as React from "react"
// import { IconProps } from "src/typing"

export function ExpandHorizontal({
  size = 32,
  stroke = "#444444",
  strokeWidth = 2,
  strokeLinecap = "square",
  strokeMiterlimit = 10,
  strokeLinejoin = "miter",
  // className = "",
  ...props
}: React.PropsWithoutRef<any>) {
  return (
    <svg
      x="0px"
      y="0px"
      width={size}
      height={size}
      viewBox={`0 0 ${32} ${32}`}
      role="button"
      aria-label="expand code horizontally"
      {...props}
    >
      <line
        fill="none"
        x1="2"
        y1="16"
        x2="30"
        y2="16"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin={strokeLinejoin}
        strokeMiterlimit={strokeMiterlimit}
        strokeLinecap="butt"
      ></line>
      <polyline
        points="23,9 30,16 23,23 "
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeMiterlimit={strokeMiterlimit}
        strokeLinejoin={strokeLinejoin}
      ></polyline>
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeMiterlimit={strokeMiterlimit}
        strokeLinejoin={strokeLinejoin}
        points="9,23 2,16 9,9 "
      ></polyline>
    </svg>
  )
}
