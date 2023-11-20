import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import * as parseUtils from "@/utils/parse-utils"
import type { CommonProps } from "@/types/react"
import { cn } from "@/utils/styles"

type ConfirmationFadeProps = CommonProps &
  React.HTMLAttributes<HTMLDivElement> & {
    /* How many ms the content is shown for */
    msAlive?: number
    isShowing?: boolean
    setIsShowing: (isShowing: boolean) => void
  }
export const ConfirmationFade: React.FC<ConfirmationFadeProps> = ({
  msAlive = 2000,
  isShowing,
  setIsShowing,
  children,
  ...props
}) => {
  const timeout = React.useRef<NodeJS.Timeout | undefined>()

  React.useEffect(() => {
    if (isShowing) {
      timeout.current = setTimeout(() => {
        setIsShowing(false)
      }, msAlive)
    }

    return () => {
      if (parseUtils.isDefined(timeout.current)) {
        clearTimeout(timeout.current)
      }
    }
  }, [isShowing])

  return (
    <div className={cn("flex items-center justify-center", "relative", "z-20")} {...props}>
      <AnimatePresence>
        {isShowing ? (
          <motion.div
            className={cn(
              "confirmation-fade-content",
              "flex-1 text-white",
              "px-1 py-2 mr-2",
              "rounded"
              //
            )}
          >
            <React.Fragment>{children}</React.Fragment>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
