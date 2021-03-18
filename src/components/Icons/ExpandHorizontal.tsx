import React from "react"
import styled from "styled-components"
import { UiTypes } from "src/types"

const StyledSVG = styled.svg``

export default function IconEnlargeHorizontal({
  size = 32,
  stroke = "#444444",
  strokeWidth = 2,
  strokeLinecap = "square",
  strokeMiterlimit = 10,
  strokeLinejoin = "miter",
  ...props
}: UiTypes.IIconProps) {
  return (
    <StyledSVG x="0px" y="0px" width={`${size}px`} height={`${size}px`} viewBox={`0 0 ${size} ${size}`} {...props}>
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
    </StyledSVG>
  )
}
