import * as React from "react"
import { ClipboardTrigger } from "./ClipboardTrigger"
import { ExpandHorizontal } from "./ExpandHorizontal"
import type { CommonProps } from "@/types/react"
import { cn } from "@/utils/styles"

// function getValidChildren(children: React.ReactNode) {
//   return React.Children.toArray(children).filter((child) => React.isValidElement(child)) as React.ReactElement[]
// }

const IconWrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <div className={cn("relative", "mr-5")}>{children}</div>
)

const maxWidthStyles = cn(
  "max-w-screen",
  "mobile:max-w-screen",
  "sm:max-w-screen",
  "md:max-w-screen",
  "tablet:max-w-screen-tablet", // 900px
  "lg:max-w-screen-tablet"
)

type PrePlaceholderProps = CommonProps & {}

export const PrePlaceholder = ({ children, className = "" }: React.PropsWithChildren<PrePlaceholderProps>) => {
  const preRef = React.useRef<HTMLPreElement>(null)
  const [expanded, setExpanded] = React.useState<boolean>(false)

  const handleOnCopy = (callback?: (text?: string, error?: string) => void) => {
    if (preRef.current) {
      const codeEl = preRef.current.querySelector("code")
      if (codeEl) {
        const text = codeEl.innerText
        const lines = text.split("\n")
        console.log("Code copied to clipboard")
        for (const l of lines) {
          console.log(l)
        }

        callback && callback(text)
      } else {
        const error = "Unable to copy code to clipboard"
        console.log("Unable to copy code to clipboard")
        callback && callback(undefined, error)
      }
    } else {
      const error = "Unable to copy code to clipboard"
      console.log("Unable to copy code to clipboard")
      callback && callback(undefined, error)
    }
  }

  return (
    <pre
      ref={preRef}
      className={cn(
        "code-block-pre-theme",
        "astro-code",
        "relative ",
        expanded ? "max-w-full" : maxWidthStyles,
        expanded ? "expanded" : "",
        "mx-auto",
        className
      )}
    >
      <div className="inner inner-background absolute" />
      <IconWrapper>
        <ClipboardTrigger
          //
          handleOnCopy={handleOnCopy}
          className="translate-y-[-3px] z-10"
        ></ClipboardTrigger>
      </IconWrapper>
      <IconWrapper>
        <ExpandHorizontal
          onClick={() => setExpanded(!expanded)}
          stroke="white"
          className={cn(
            "absolute",
            "hidden lg:flex items-center",
            "right-0",
            "bg-neon-blue text-white",
            "rounded h-[44.5px]",
            "px-1",
            "cursor-pointer",
            "translate-y-[-3px]",
            "z-10"
          )}
        />
      </IconWrapper>
      <div
        className={cn(
          //
          "code-content-wrapper",
          "w-full",
          "pt-[40px] pb-[55px]",
          "relative",
          "flex",
          "overflow-auto"
        )}
      >
        {children ?? null}
      </div>
    </pre>
  )
}
