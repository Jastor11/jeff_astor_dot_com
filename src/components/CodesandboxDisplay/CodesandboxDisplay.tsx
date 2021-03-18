import React from "react"
import { CodeSandbox } from "src/components"
import styled from "styled-components"

const CodesandboxWrapper = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 1rem 0;
  border: solid 1px rgb(202, 202, 202);

  & h2 {
    font-size: 1.7rem;
    margin-bottom: 1rem;
  }
  & p {
    font-size: 1.1rem;
  }

  // @media screen and (max-width: 900px) {
  //   padding: 0;
  // }
`

interface ICodesandboxDisplay {
  codesandboxLink: string
  codesandboxProps: Record<string, any>
}
const CodesandboxDisplay: React.FC<ICodesandboxDisplay> = ({ codesandboxLink, codesandboxProps }) => {
  return (
    <CodesandboxWrapper>
      <>
        <h2>
          <a href={codesandboxLink} target="_blank" rel="noopener noreferrer">
            <CodeSandbox stroke="var(--color-highlight)" fill="var(--color-highlight)" /> Check it out on Code Sandbox
          </a>
        </h2>
        <p>{codesandboxProps.title}</p>
      </>
    </CodesandboxWrapper>
  )
}

export default CodesandboxDisplay
