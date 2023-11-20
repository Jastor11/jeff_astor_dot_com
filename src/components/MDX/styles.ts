import { cn } from "@/utils/styles"

export const maxWidthStyles = cn(
  "px-1.5",
  "max-w-screen-95%",
  "mobile:max-w-screen-95%",
  "xs:max-w-screen-95%",
  "sm:max-w-screen-95%",
  "tablet:max-w-screen-tablet",
  "lg:max-w-screen-tablet"
)
export const leftRightMarginStyles = cn("mx-auto")

export const topMarginStyles = cn("mt-7")
export const botMarginStyles = cn("mb-7")

export const topBotMarginStyles = cn(topMarginStyles, botMarginStyles)
export const textStyles = cn(
  maxWidthStyles,
  "text-lg xs:text-xl",
  "leading-9 xs:leading-10",
  "text-light"
  // "text-dark"
)
export const headingStyles = cn(
  maxWidthStyles,
  "mt-10",
  leftRightMarginStyles,
  "flex items-center",
  "text-light",
  "leading-10",
  "font-semibold font-heading"
  // "lowercase"
)
export const paragraphStyles = cn(textStyles, topBotMarginStyles, leftRightMarginStyles, "font-sans")
export const strongStyles = cn(textStyles, "font-bold font-sans", "px-0")
export const listStyles = cn(maxWidthStyles, topMarginStyles, leftRightMarginStyles, "pl-10 pr-5.5")
export const listItemStyles = cn(textStyles, "font-normal font-sans")

export const styles = {
  maxWidthStyles,
  leftRightMarginStyles,
  topMarginStyles,
  botMarginStyles,
  topBotMarginStyles,
  textStyles,
  headingStyles,
  paragraphStyles,
  strongStyles,
  listStyles,
  listItemStyles,
} as const
