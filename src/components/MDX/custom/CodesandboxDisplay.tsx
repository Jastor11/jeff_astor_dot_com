import type * as React from "react"
import { cn } from "@/utils/styles"

import { maxWidthStyles } from "@/components/MDX/styles"

const CodesandboxIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={cn("stroke-current", className)}
    width="32"
    height="32"
    viewBox="0 0 32 32"
    focusable="false"
    role="img"
    aria-hidden="true"
  >
    <path d="M14.738 28.044V16.681L3.172 10.919v6.46l5.32 2.67v4.889l6.246 3.106zm2.344.066l6.357-3.17v-5.002l5.353-2.686V10.87l-11.71 5.854V28.11zM27.306 8.993l-6.003-3.012-5.286 2.656-5.325-2.659L4.637 9.03l11.317 5.638 11.352-5.675zM.828 23.744V8.324L15.981.689l15.155 7.604V23.72L15.98 31.28.828 23.743z"></path>
  </svg>
)

type CodesandboxDisplayProps = {
  codesandboxLink: string
  codesandboxProps: React.HTMLAttributes<HTMLIFrameElement>
}
export const CodesandboxDisplay = ({ codesandboxLink, codesandboxProps }: CodesandboxDisplayProps) => {
  return (
    <div
      className={cn(
        "code-sandbox-display",
        maxWidthStyles,
        "relative",
        "duration-150",
        "flex-center flex items-center justify-center flex-col gap-2",
        "my-4 mx-auto p-8",
        "elevate-3",
        "rounded-lg",
        "group",
        "bg-even-less-dark"
      )}
    >
      <h2 className={cn("flex-center flex items-center justify-center gap-2", "font-heading lowercase", "text-3xl")}>
        <a
          href={codesandboxLink}
          target="_blank"
          rel="noopener noreferrer"
          className={cn([
            "text-accent-light hover:underline duration-200",
            "text-lg flex items-center justify-center gap-2",
            //
          ])}
        >
          <CodesandboxIcon /> <span className="text-2xl">Check it out on Code Sandbox</span>
        </a>
      </h2>
      <p className={cn("text-lg text-slate-400 group-hover:text-light")}>{codesandboxProps.title}</p>
    </div>
  )
}

export default CodesandboxDisplay
