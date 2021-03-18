import React from "react"
import styled from "styled-components"
import { UiTypes } from "src/types"

const StyledSVG = styled.svg``

const LinkGlyph: React.FC<UiTypes.IIconProps> = ({ className = "" }) => (
  <StyledSVG className={className} x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64">
    <g transform="translate(0, 0)">
      <path
        d="M28.977,27.141a9.995,9.995,0,0,1,5.145,16.88L24.051,54.092A10,10,0,0,1,9.909,39.95L19.98,29.879a9.943,9.943,0,0,1,1.11-.943,16.108,16.108,0,0,1,.119-4.691,13.92,13.92,0,0,0-4.057,2.805L7.081,37.121a14,14,0,0,0,19.8,19.8L36.951,46.849a13.983,13.983,0,0,0-7.036-23.591A7.962,7.962,0,0,0,28.977,27.141Z"
        fill="#444444"
      ></path>
      <path
        d="M37.121,7.08,27.05,17.151a13.984,13.984,0,0,0,7.033,23.591,8,8,0,0,0,.952-3.879A10,10,0,0,1,29.878,19.98L39.949,9.909A10,10,0,0,1,54.091,24.051L44.02,34.122a10.085,10.085,0,0,1-1.106.941,16.1,16.1,0,0,1-.138,4.7,13.91,13.91,0,0,0,4.072-2.813L56.919,26.879a14,14,0,0,0-19.8-19.8Z"
        fill="#444444"
      ></path>
    </g>
  </StyledSVG>
)

export default LinkGlyph
