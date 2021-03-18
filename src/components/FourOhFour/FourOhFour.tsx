import React from "react"
import styled from "styled-components"
import { Navbar, BlogCategorySVG } from "src/components"

const FourOhFourWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
`

const FourOhFour = () => (
  <FourOhFourWrapper>
    <Navbar dark />
    <h1>oops! page not found.</h1>
    <div>
      <BlogCategorySVG category="not found" style={{ height: "70vh" }} />
    </div>
  </FourOhFourWrapper>
)

export default FourOhFour
