import React, { useEffect, useState, useRef } from "react"
import styled from "styled-components"

const ConfirmationFadeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  z-index: 3000;
`
const ConfirmationFadeContent = styled.div`
  flex: 1;
  background: rgba(20, 200, 100, 0.7);
  color: white;
  padding: 0.2rem 0.5rem;
  margin-right: 0.5rem;
  border-radius: 0.25rem;
`

interface IConfirmationFade {
  onFaded?: () => void
}
const ConfirmationFade: React.FC<IConfirmationFade> = ({ onFaded = () => {}, children, ...props }) => {
  const [hasFaded, setHasFaded] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const timeout = useRef()

  useEffect(() => {
    init()

    if (!initialized) {
      setInitialized(true)
    }
    return () => {
      if (timeout.current) clearTimeout(timeout.current)
    }
  })

  const init = () => {
    setTimeout(() => {
      setHasFaded(true)
      onFaded()
    }, 2000)
  }

  if (hasFaded) return null

  return (
    <ConfirmationFadeWrapper {...props}>
      <ConfirmationFadeContent>
        <>{children}</>
      </ConfirmationFadeContent>
    </ConfirmationFadeWrapper>
  )
}

export default ConfirmationFade
