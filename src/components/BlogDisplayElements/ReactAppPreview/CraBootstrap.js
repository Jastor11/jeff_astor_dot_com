import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

const StyledAppPreview = styled.div``

export default function CraBootstrap() {
  const reactLogo = useStaticQuery(graphql`
    query CraBootstrapQuery {
      svg: file(relativePath: { eq: "react_logo.svg" }) {
        publicURL
      }
    }
  `)

  return (
    <StyledAppPreview>
      <header className="App-header">
        <img src={reactLogo.svg.publicURL} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload
        </p>
        <a className="App-link" href="#">
          Learn React
        </a>
      </header>
    </StyledAppPreview>
  )
}
