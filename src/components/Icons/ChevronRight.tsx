import React from "react"
import styled from "styled-components"
import { UiTypes } from "src/types"

const StyledSVG = styled.svg``

const ChevronRight: React.FC<UiTypes.IIconProps> = ({ className = "" }) => (
  <StyledSVG className={className} x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32">
    <g transform="translate(0, 0)">
      <path
        d="M11.775.592a.5.5,0,0,0-.7-.092L8.7,2.329a.5.5,0,0,0-.092.7L18.581,16,8.6,28.97a.5.5,0,0,0,.092.7L11.074,31.5a.5.5,0,0,0,.7-.092L23.4,16.305a.5.5,0,0,0,0-.61Z"
        fill="#444444"
      ></path>
    </g>
  </StyledSVG>
)

export default ChevronRight
