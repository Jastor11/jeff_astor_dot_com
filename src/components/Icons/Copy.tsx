import React from "react"
import styled from "styled-components"
import { UiTypes } from "src/types"

const StyledSVG = styled.svg``

const CopyIcon: React.FC<UiTypes.IIconProps> = ({ className = "", fill = "#444" }) => (
  <StyledSVG className={className} x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64">
    <g transform="translate(0, 0)">
      <rect x="5" y="15" width="42" height="46" rx="2" fill={fill}></rect>
      <path d="M57,3H19a2,2,0,0,0-2,2V7H51a4,4,0,0,1,4,4V49h2a2,2,0,0,0,2-2V5A2,2,0,0,0,57,3Z" fill={fill}></path>
      <path d="M51,9H13a2,2,0,0,0-2,2v2H45a4,4,0,0,1,4,4V55h2a2,2,0,0,0,2-2V11A2,2,0,0,0,51,9Z" fill={fill}></path>
    </g>
  </StyledSVG>
)

export default CopyIcon
