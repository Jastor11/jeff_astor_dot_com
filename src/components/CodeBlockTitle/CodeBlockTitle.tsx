import React from "react"
import styled from "styled-components"

const StyledSpan = styled.span``

const CodeBlockTitle: React.FC = ({ children }) => {
  return (
    <>
      <StyledSpan>Title: {children}</StyledSpan>
    </>
  )
}

export default CodeBlockTitle
