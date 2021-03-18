import React, { useEffect, useState } from "react"
import { ConfirmationFade, Copy } from "src/components"
import styled from "styled-components"

const ClipboardTriggerWrapper = styled.div`
  position: absolute;
  top: -22px;
  right: 50px;
  display: flex;
`

const ClipboardTriggerIcon = styled.span`
  padding: 0.2rem 0.5rem;
  background: dodgerblue;
  border-radius: 0.2rem;
  color: white;
  cursor: pointer;
`
const CopyIconWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px 0;

  & svg {
    max-width: 18px;
    max-height: 24px;
  }
`

interface IClipboardTrigger {
  getText?: () => string
  className?: string
}
const ClipboardTrigger: React.FC<IClipboardTrigger> = ({ getText = () => "", className = "", children }) => {
  const [canCopy, setCanCopy] = useState(false)
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    async function checkSupport() {
      try {
        const copySupport = await navigator.permissions.query({ name: "clipboard-write" })
        // console.log(`copy code support: ${copySupport.state}`)
        setCanCopy(copySupport.state === "granted")
      } catch (e) {
        setCanCopy(false)
        console.log(`copy code support: ${"not granted"}`)
      }
    }
    checkSupport()
  })

  const onCopy = () => {
    // console.log('copy to clipboard')
    if (!navigator.clipboard || !navigator.clipboard.writeText) return
    navigator.clipboard.writeText(getText())
    setHasCopied(true)
  }

  if (!canCopy) return null

  return (
    <ClipboardTriggerWrapper className={className} onClick={onCopy}>
      {hasCopied && <ConfirmationFade onFaded={() => setHasCopied(false)}>Copied to clipboard!</ConfirmationFade>}
      {/* ICON */}
      <ClipboardTriggerIcon>
        <CopyIconWrapper>
          <Copy fill="white" />
        </CopyIconWrapper>
      </ClipboardTriggerIcon>
      {children}
    </ClipboardTriggerWrapper>
  )
}

export default ClipboardTrigger
