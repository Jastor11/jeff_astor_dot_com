import React from "react"
import styled from "styled-components"
import { UiTypes } from "src/types"

const StyledSVG = styled.svg``

const Facebook: React.FC<UiTypes.IIconProps> = ({ className = "" }) => (
  <StyledSVG className={className} x="0px" y="0px" width="48px" height="48px" viewBox="0 0 48 48">
    <g transform="translate(0, 0)">
      <path
        fill="#444444"
        d="M19.32924,46V25.92955h-6.75413v-7.82187h6.75413v-5.76839C19.32924,5.64511,23.41782,2,29.38949,2
	c2.86049,0,5.31894,0.21297,6.03539,0.30816v6.99581l-4.14167,0.00188c-3.24773,0-3.87657,1.54327-3.87657,3.80792v4.99391h7.74553
	l-1.0085,7.82187h-6.73704V46H19.32924z"
      ></path>
    </g>
  </StyledSVG>
)

export default Facebook
