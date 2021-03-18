import React from "react"
import styled from "styled-components"
import { UiTypes } from "src/types"

const StyledSVG = styled.svg``

const Envelope: React.FC<UiTypes.IIconProps> = ({ strokeWidth = 4, fill = "none", className = "" }) => (
  <StyledSVG className={className} x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64">
    <g strokeWidth={strokeWidth} transform="translate(0, 0)">
      <polyline
        points="10 15 32 36 54 15"
        fill={fill}
        stroke="#444444"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth={strokeWidth}
        strokeLinejoin="miter"
      ></polyline>
      <line
        x1="10"
        y1="47"
        x2="20"
        y2="34"
        fill={fill}
        stroke="#444444"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth={strokeWidth}
        strokeLinejoin="miter"
      ></line>

      <line
        x1="44"
        y1="34"
        x2="54"
        y2="47"
        fill={fill}
        stroke="#444444"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth={strokeWidth}
        strokeLinejoin="miter"
      ></line>
      <path
        d="M3,13V51a5,5,0,0,0,5,5H56a5,5,0,0,0,5-5V13a5,5,0,0,0-5-5H8A5,5,0,0,0,3,13Z"
        fill={fill}
        stroke="#444444"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth={strokeWidth}
        strokeLinejoin="miter"
      ></path>
    </g>
  </StyledSVG>
)

export default Envelope
