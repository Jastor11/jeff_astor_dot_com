import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

import * as parseUtils from "@/utils/parse-utils"
import { cn } from "@/utils/styles"

export function Loading({ isLoading }: { isLoading?: boolean }) {
  const [isShowing, setIsShowing] = React.useState(isLoading)
  const timeout = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    if (!isLoading) {
      timeout.current = setTimeout(() => {
        setIsShowing(false)
      }, 1000)
    }

    return () => {
      if (parseUtils.isDefined(timeout.current)) {
        clearTimeout(timeout.current)
      }
    }
  }, [isLoading])

  return (
    <div
      className={cn(
        "w-screen max-w-screen-100%",
        "h-screen max-h-screen",
        "bg-dark",
        "flex-center",
        "flex items-center justify-center",
        "absolute inset",
        "duration-1000 ease-op-ease-5",
        isLoading ? "opacity-100 z-layer-important" : "opacity-0 -z-layer-important",
        ""
      )}
    >
      <div className={cn("flex items-center justify-center text-center")}>
        <AnimatePresence>
          {isShowing ? (
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: [1, 1.25, 0.01] }}
              exit={{ opacity: 0, scale: 0.01 }}
              transition={{
                type: "spring",
                damping: 10,
                stiffness: 300,
                duration: 1000,
              }}
            >
              <h1 className="text-7xl text-light">Loading...</h1>
              <p className="text-2xl text-light">One moment please</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}
